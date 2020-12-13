const router = require('express').Router();
const Users = require('../models/users');
const {RegisterValidation,LoginValidation}= require('../routes/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshToken');
const { ref } = require('@hapi/joi');

router.get('/', async (req,res)=>{
res.status(200).send("login page");
});

router.post('/register', async (req,res)=>{
    if(req.body.type == "admin" || req.body.type == "user"){
        const{error} =RegisterValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
        //checking is the user is in DB
        const emailExists = await Users.findOne({email: req.body.email});
        if(emailExists) return res.status(400).send("Email already exists");
    
        //password hashing
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.password, salt);
        
        //user creation
        const user = new Users({
            name: req.body.name,
            email : req.body.email,
            type : req.body.type,
            password : hashedpassword,
        });
        try {
            const savedUser = await user.save();
    
            res.send({user:user.id});
        } catch (error) {
            res.status(400).send(error);
        }
    }
    else{
        res.status(400).send({Message: "user type must be admin or user"});
    }
    
});


router.post('/login', async (req,res)=>{
    //validation
    const{error} =LoginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    //check if email exists    
    const user = await Users.findOne({email: req.body.email});
    if(!user) return res.status(400).send({Message: "Email or password is wrong"});


    // if password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send({Message: "Email or password is wrong"});


    //adding tokens
    const access_token = generateAccessToken(user);
    const refresh_token = jwt.sign({_id: user.id, _type: user.type},process.env.REFRESH_TOKEN_SECRET);
    res.status(200).json({Message:"Logged in" ,accessToken : access_token, refreshToken: refresh_token});
});

router.post('/token', async (req,res) => {
    const refreshToken = req.body.token
    const checkToken = await RefreshToken.findOne({},{token: refreshToken})
     if(refreshToken == null) return res.sendStatus(401)
     if(!checkToken) return res.sendStatus(403)
     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
    if(err) return res.sendStatus(403)
     const accessToken = generateAccessToken(user);
     res.json({accessToken:accessToken});
})
})

function generateAccessToken(user) {
    return jwt.sign({_id: user.id,_type: user.type},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
}
module.exports=router;
