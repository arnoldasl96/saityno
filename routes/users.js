const express = require('express');
const router = express.Router();
const User = require('../models/users');
const { isAdmin } = require('./verifyToken');


//GET ALL
router.get('/', async (req,res) => {
    try{
        const posts = await User.find();
        res.json(posts);
    }catch(err){
        res.json({message: err})
    }
});

//SPECIFIC POST
router.get('/:userId', async (req,res) => {
    try{
        const post = await User.findById(req.params.userId);
        if(post == null)res.status(400).json("not found");
        else res.json(post);
    }catch(err){
        res.json({message:err});
    }
    
})

// DELETE 1

router.delete('/:userId',isAdmin, async (req,res) => {
    try{
        const post = await User.remove({_id:req.params.userId});
        res.json(post);
    
    }catch(err){
        res.json({message:err});
    }
    
})

//UPDATE

router.patch('/:userId',isAdmin, async (req,res) => {
    try{
        const post = await User.updateOne(
        {_id:req.params.userId} ,
        {$set: {name: req.body.name, email: req.body.email, password: req.body.password}}
        );
        res.json(post);
    
    }catch(err){
        res.json({message:err});
    }
    
})
router.get('/*', async (req,res)=>{
    res.status(404).send("page not found");
    });


module.exports = router;