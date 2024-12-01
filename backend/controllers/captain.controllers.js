const captainModel = require('../models/captain.model')
const captainService = require('../services/captain.service')
const blackListTokenModel = require('../models/blackListToken.model')
const { validationResult } = require('express-validator');

 module.exports.registerCaptain = async (req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }
    const {fullname,email,password,vehicle,} = req.body

    const isCaptainAlready = await captainModel.findOne({ email });

    if (isCaptainAlready) {
        return res.status(400).json({ message: 'Captain already exist' });
    }

    const hashedPassword = await captainModel.hashedPassword(password);

    const createdCaptain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType,
    });

    const token = createdCaptain.generateAuthToken();
    res.status(201).json({ token, createdCaptain });
 }


 module.exports.loginCaptain = async(req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(401).json({erros:erros.array()})
    }
    const {email,password} = req.body

    const loginCaptain = await captainModel.findOne({email}).select('+password')

    if(!loginCaptain){
        res.status(401).json({message: 'Invalid email or password'})
    }

    const isMatch = await loginCaptain.comparePassword(password);

    if(!isMatch){
        res.status(401).json({message: 'Incorrect password'})
    }

    
    const token = loginCaptain.generateAuthToken();
    
    res.cookie('token', token);

    res.status(200).json({ token, loginCaptain });
 }

 module.exports.getCaptainProfile = async(req,res,next) =>{
    res.status(200).json({captain: req.captain});
 }

 module.exports.logoutCaptain = async(req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out' });

 }