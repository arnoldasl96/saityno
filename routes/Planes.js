const express = require('express');
const router = express.Router();
const Plane = require('../models/Plane');
const { isAdmin, isLoggedIn } = require('./verifyToken');


//GET ALL
router.get('/', async (req,res) => {
    try{
        const posts = await Plane.find();
        res.json(posts);
    }catch(err){
        res.json({message: err})
    }
});

//SUBMIT THE POST
router.post('/',isAdmin, async (req,res) => {
    const post = new Plane({
        name: req.body.name,
        type: req.body.type,
        age: req.body.age,
        space: req.body.space,
        ownerID: req.body.ownerID

    })
try{
    const savedPost = await post.save()
    res.status(201).json(savedPost);
}catch(err){
    res.json({message: err})
}
 
})

//SPECIFIC get
router.get('/:PlaneID',isAdmin, async (req,res) => {
    if(req.params.PlaneID.length ==24){
        try{
            const post = await Plane.findById(req.params.PlaneID);
            if(post == null)res.status(400).json("not found");
            else res.json(post);
        
        }catch(err){
            res.json({message:err});
        }
    }
    else res.status(400).json("not found");
   
    
})

//SPECIFIC get
router.get('/:PlaneID',isLoggedIn, async (req,res) => {
    if(req.params.PlaneID.length ==24){
    try{
        const post = await Plane.findById(req.params.PlaneID);
        post.

        res.json(post);
    
    }catch(err){
        res.json({message:err});
    }
}
else res.status(400).json("not found");

})

// DELETE

router.delete('/:PlaneID',isAdmin, async (req,res) => {
    
    try{
        const post = await Plane.remove({_id:req.params.PlaneID});
        res.json(post);
    
    }catch(err){
        res.json({message:err});
    }
    
})

//UPDATE

router.patch('/:PlaneID',isAdmin, async (req,res) => {
    try{
        const post = await Plane.updateOne(
        {_id:req.params.PlaneID} ,
        {$set: {name: req.body.name,
            type: req.body.type,
            age: req.body.age,
            space: req.body.space,
            ownerID: req.body.ownerID}}
        );
        res.json(savedPost);
    
    }catch(err){
        res.json({message:err});
    }
    
})

router.get('*', async (req,res)=>{
    res.status(404).send("page not found");
    });
module.exports = router;