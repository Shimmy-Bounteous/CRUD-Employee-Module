const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserCredentials = require('../models/userCredentials');
const mongoose = require('mongoose');

// Sign-Up a new employee
async function signUp(req, res){
    try{
        const {email, password} = req.body;

        // check if existing user
        const existingUser = await UserCredentials.findOne({email});
        if(existingUser){
            return res.status(409).json({ success: false, message: 'Email already exists'});
        }
        else{
            // encrpyt the password
            bcrypt.hash(password, 10, async (err, hashedPassword) => {
                if(err){
                    return res.status(500).json({ error: err.message });
                }
                else{
                    // creating user
                    const newUser = await UserCredentials.create({
                        _id: new mongoose.Types.ObjectId(),
                        email,
                        password: hashedPassword
                    });
                    console.log(newUser);
                    res.status(201).json({success: true, message: 'User created'});
                }
            });
    
        }

    }
    catch(error){
        res.status(500).json({success: false, error: error.message});
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
async function login(req, res){
    try{
        const {email, password} = req.body;
        
        // Check if user exits
        const user = await UserCredentials.findOne({"email": email});
        if(!user){
            return res.status(401).json({success: false, message: 'Invalid User Credentials'});
        }
        else{
            // validate password
            bcrypt.compare(password, user.password, (err, hash) => {
                if(err){
                    return res.status(401).json({success: false, message: 'Invalid User Credentials'});
                }
                else{
                    // generate JWT
                    const token = jwt.sign(
                        {
                            id: user.userId,
                            email: email
                        }, 
                        process.env.JWT_KEY, 
                        {expiresIn: '1h'}
                    );
                    res.json({success: true, message: 'Login Successfull', token});
                }
            });
        }
    }
    catch(error){
        res.status(500).json({success: false, error: error.message});
    }
}

// delete user credentials
async function deleteUser(req, res) {
    try{
        const user = await UserCredentials.findOneAndDelete({"_id": req.params.userId});
        if(user !== null){
            console.log(user);
            res.status(202).json({ success: true, message: 'User deleted successfully' });
        }
        else{
            console.log('User not found');
            res.status(400).json({success:false, message: "User not found"});
        }
    }
    catch(error){
        res.status(500).json({success: false, error: error.message});
    }
}

module.exports = {
    signUp,
    login,
    getAllUsers,
    deleteUser
};