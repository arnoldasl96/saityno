const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const { isLoggedIn } = require('./verifyToken');


//GET ALL
router.get('/', async (req,res) => {
    try{
        const posts = await Place.find();
        res.json(posts);
    }catch(err){
        res.json({message: err})
    }
});
//SUBMIT THE POST
router.post('/',isLoggedIn, async (req,res) => {
    const post = new Place({
        name: req.body.name,
        localCode: req.body.localCode,
        type: req.body.type,
        city: req.body.city,
        country: req.body.country
    })
try{
    const savedPost = await post.save()
    res.status(201).json(savedPost);
}catch(err){
    res.json({message: err})
}
 
})

//SPECIFIC POST
router.get('/:placeID',isLoggedIn, async (req,res) => {
    if(req.params.placeID.length ==24){
        try{
            const post = await Place.findById(req.params.placeID);
            if(post == null)res.status(400).json("not found");
            else res.json(post);
        
        }catch(err){
            res.json({message:err});
        }
    }else res.status(400).json("not found");
   
    
})

// DELETE 1

router.delete('/:placeID',isLoggedIn, async (req,res) => {
 
    try{
        const post = await Place.remove({_id:req.params.placeID});
        res.json(post);
    
    }catch(err){
        res.json({message:err});
    }
    
})

//UPDATE

router.patch('/:placeID',isLoggedIn, async (req,res) => {
    try{
        const post = await Place.updateOne(
        {_id:req.params.movieId} ,
        {$set: {name: req.body.name,
                localCode: req.body.localCode,
                type: req.body.type,
                city: req.body.city,
                country: req.body.country}}
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