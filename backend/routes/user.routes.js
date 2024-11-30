const express = require('express')
const router = express.Router();
const {body} = require("express-validator")
const userController = require('../controllers/user.controllers')


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be atleat 3 char long'),
    body('password').isLength({min:6}).withMessage("Password must be atlaest 6 characters long")
],
 userController.registerUser
)


module.exports = router