const express = require('express');
const router = express.Router();

const {
    signUp,
    login,
    getAllUsers,
    deleteUser,
    refresh
} = require('../controllers/authController');

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/get", getAllUsers);
router.delete("/delete/:userId", deleteUser);
router.post("/refresh", refresh);

module.exports = router;