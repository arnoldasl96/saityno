const express = require('express');
const router = express.Router();
const Plane = require('../models/Plane');
const { isLoggedIn, isAdmin } = require('./verifyToken');

//GET ALL
router.get('/:ownerID/Planes',isLoggedIn, async (req,res) => {
    if(req.params.ownerID.length ==24){
        try{
            const posts = await Plane.find( {ownerID: req.params.ownerID});
            if(posts == null)
                res.status(400).json("not found");
            else 
                res.json(posts);
    
        }catch(err){
            res.json({message: err})
        }
    }else{
        res.status(400).json("not found");
    }
   
});
//SUBMIT THE POST
router.post('/:ownerID/Planes',isAdmin, async (req,res) => {
    const post = new Plane({
        name: req.body.name,
        type: req.body.type,
        age: req.body.age,
        space: req.body.space,
        ownerID: req.body.ownerID

    })
try{
    const savedPost = await post.save()
    res.json(savedPost);
}catch(err){
    res.json({message: err})
}
 
})

//SPECIFIC get
router.get('/:ownerID/Planes/:planeID',isLoggedIn, async (req,res) => {
    if(req.params.planeID.length== 24 && req.params.ownerID.length==24){
        try{
            const post = await Plane.findById(req.params.planeID);
            if(post == null)res.status(400).json("not found");
            else res.json(post);
            
        }catch(err){
            res.json({message:err});
        }
    }
    else res.status(400).json("not found");
    
})

router.get('*', async (req,res)=>{
    res.status(404).send("page not found");
    });

module.exports = router;
