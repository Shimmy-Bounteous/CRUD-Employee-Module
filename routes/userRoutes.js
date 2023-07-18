const express = require('express');
const router = express.Router();

const {
    signUp,
    getAllUsers,
    deleteUser
} = require('../controllers/authController');

router.post("/signUp", signUp);
router.get("/get", getAllUsers);
router.delete("/delete/:userId", deleteUser);

module.exports = router;