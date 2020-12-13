const express = require('express');
const router = express.Router();
const Carrier = require('../models/Carrier');
const Plane = require('../models/Plane');
const {isLoggedIn, isAdmin} = require("../routes/verifyToken")


//GET ALL
router.get('/', async (req,res) => {
    try{
        const posts = await Carrier.find().populate('Planes');
        if (!posts.length) {
            res.status(404);
            res.json({Message:"there is no companies"});
          } else {
            res.json(posts);
          }
    }catch(err){
        res.status(400);
        res.json({message: err})
    }
});
//SUBMIT THE POST
router.post('/', isAdmin, async (req,res) => {
    if(!req.body.name && !req.body.age){
        return res.status(400).json({message:"wrong structure"})
    }
    const post = new Carrier({
        name: req.body.name,
        age: req.body.age,
    })
try{
    const savedPost = await post.save()
    res.status(201).json(savedPost);
}catch(err){
    res.status(400).json({message: err})
}
 
})

//SPECIFIC get
router.get('/:carrierID',isLoggedIn, async (req,res) => {
    if(req.params.carrierID.length ==24){
        try{
            const post = await Carrier.findById(req.params.carrierID).populate('Planes');
         if(post == null)res.status(400).json("not found");
            else res.json(post);
        
        }catch(err){
            res.json({message:err});
    
        }

    }
    else{
        res.status(400).json("not found");
    }
})

// DELETE

router.delete('/:carrierID',isAdmin, async (req,res) => {
    
    try{
        const post = await Carrier.remove({_id:req.params.carrierID});
        res.json(post);
    
    }catch(err){
        res.json({message:err});
    }
    
})

//UPDATE

router.patch('/:carrierID',isAdmin, async (req,res) => {
    try{
        const post = await Carrier.updateOne(
        {_id:req.params.carrierID} ,
        {$set: {name: req.body.name, age: req.body.age}}
        );
      
        res.json(post);
       
    }catch(err){
        res.json({message:err});
    }
    
})


module.exports = router;