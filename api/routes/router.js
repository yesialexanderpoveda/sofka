const {register, dashboard, login, user} = require('./../controllers/controllers')
const express = require('express');
const router = express.Router();


router.post('/login', login);
router.post('/register', register)
router.get('/dashboard', dashboard)
router.get('/user', user)
router.get('dashboard/:id')

module.exports = router;