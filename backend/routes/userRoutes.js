const express = require('express');
const protect = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/adminOnly');

const { createUser, loginUser, getProfile, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);

module.exports = router;