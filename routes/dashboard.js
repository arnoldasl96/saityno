const router = require('express').Router();
const verify = require('./verifyToken');
const Carrier = require('../models/Carrier');
const User = require('../models/users');
const Place = require('../models/Place');
const Plane = require('../models/Plane');

router.get('/',verify,(req,res)=>{
    res.send("Welcome to dashboard");
});
router.get('/Carriers',verify,async (req,res)=>{
    try{
        const posts = await Carrier.find().populate('Planes');
        res.json(posts);
    }catch(err){
        res.json({message: err})
    }
});

router.get('/users',verify,async (req,res)=>{
    try{
        const posts = await User.find();
        res.json(posts);
    }catch(err){
        res.json({message: err})
    }
});
router.get('/Places',verify,async (req,res)=>{
    try{
        const posts = await Place.find();
        res.json(posts);
    }catch(err){
        res.json({message: err})
    }
});
router.get('/Planes',verify,async (req,res)=>{
    try{
        const posts = await Plane.find();
        res.json(posts);
    }catch(err){
        res.json({message: err})
    }
});

router.get('*', async (req,res)=>{
    res.status(404).send("page not found");
    });
module.exports= router;