const express = require('express');
const router = express.Router();

//Middleware to validate password 
const { validatePassword } = require('../middleware/passwordValidator');

const {
    signUp,
    login,
    getAllUsers,
    deleteUser,
    refresh
} = require('../controllers/authController');

router.post("/signUp", validatePassword, signUp);
router.post("/login", login);
router.get("/get", getAllUsers);
router.delete("/delete/:userId", deleteUser);
router.post("/refresh", refresh);

module.exports = router;