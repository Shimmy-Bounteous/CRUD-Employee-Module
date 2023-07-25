const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserCredentials = require('../models/userCredentials');
const mongoose = require('mongoose');

// Sign-Up a new employee
async function signUp(req, res) {
    try {
        const { email, password } = req.body;

        // regex to validate email
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (!emailRegex.test(email)) throw Error("Invalid email");

        // check if existing user
        const existingUser = await UserCredentials.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Email already exists' });
        }
        else {
            // encrpyt the password
            bcrypt.hash(password, 10, async (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                else {
                    // creating user
                    const newUser = await UserCredentials.create({
                        _id: new mongoose.Types.ObjectId(),
                        email,
                        password: hashedPassword
                    });
                    console.log(newUser);
                    res.status(201).json({ success: true, message: 'User created' });
                }
            });

        }

    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }

}

// Get all users credentials
async function getAllUsers(req, res) {
    try {
        const users = await UserCredentials.find();
        res.json({ success: true, data: users });
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({ success: false, error: error.message });
    }
}

// login user
async function login(req, res) {
    try {
        const { email, password } = req.body;

        // regex to validate email
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (!emailRegex.test(email)) throw Error("Invalid email");

        // Check if user exits
        const user = await UserCredentials.findOne({ "email": email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid User Credentials' });
        }
        else {
            // validate password
            bcrypt.compare(password, user.password, (err, hash) => {
                if (err) {
                    return res.status(401).json({ success: false, message: 'Invalid User Credentials' });
                }
                else {
                    // Generating access token
                    const accessToken = jwt.sign(
                        {
                            email: email
                        },
                        process.env.JWT_KEY,
                        { expiresIn: '1hr' }
                    );

                    // Generating refresh token
                    const refreshToken = jwt.sign(
                        {
                            email: email
                        },
                        process.env.JWT_KEY,
                        { expiresIn: '2h' }
                    );

                    // Setting refresh token in response cookie
                    res.cookie('jwt', refreshToken,
                        {
                            httpOnly: true,
                            secure: true
                        });

                    // console.log();
                    res.status(201).json({ success: true, message: 'Login Successfull', accessToken });
                }
            });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// delete user credentials
async function deleteUser(req, res) {
    try {
        const user = await UserCredentials.findOneAndDelete({ "_id": req.params.userId });
        if (user !== null) {
            console.log(user);
            res.status(202).json({ success: true, message: 'User deleted successfully' });
        }
        else {
            console.log('User not found');
            res.status(400).json({ success: false, message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Generate new access token upon refresh token's expiry
async function refresh(req, res) {
    try {
        // If cookies and refresh token doesn't exist
        if (!req.cookies?.jwt) {
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }
        const refreshToken = req.cookies.jwt;

        jwt.verify(refreshToken, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Invalid Refresh Token' });
            }

            // Generating access token
            const accessToken = jwt.sign(
                {
                    email: decoded.email
                },
                process.env.JWT_KEY,
                { expiresIn: '1hr' }
            );;

            return res.status(201).json({ success: true, accessToken });
        })

    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


module.exports = {
    signUp,
    login,
    getAllUsers,
    deleteUser,
    refresh
};