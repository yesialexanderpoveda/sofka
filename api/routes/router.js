const {register, dashboard, login, user, game, updateCategory} = require('./../controllers/controllers')
const express = require('express');
const router = express.Router();


router.post('/login', login);
router.post('/register', register)
router.get('/dashboard', dashboard);
router.get('/user', user);
router.get('/game', game);
router.post('/update', updateCategory)

module.exports = router;  