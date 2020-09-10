const express = require('express');
const router = express.Router();
const {check, validationResult}=require('express-validator');
const User = require('../../modules/user')
const Post = require('../../modules/Post')
const auth = require('../../middelware/auth');
const Profile=require('../../modules/profile')


router.post('/',
[auth,
[
    check('text', "text is required")
 .not()
    .isEmpty(),
  
    
]],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
    const user= await User.findById(req.user.id).select('-password');

    const newPost = new Post ({
        text: req.body.text,
        name: user.name,
      avatar: user.avatar,
        user: req.user.id,
        
      });

   
     const post= await newPost.save();
     res.json(post)
} catch (err) {
    console.error(err.message)
        
    res.status(500).send('server error')
}
});
router.get('/', auth, async (req, res)=>{
    try{
        const posts =await Post.find().sort({date:-1});
        res.json(posts)
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error')
    }
});
router.get('/:id',auth, async (req, res)=>{
    try{
        const post =await Post.findById(req.params.id);
        if(!post) return res.status(400).json({msg :'profile not found'})
        res.json(post)
    }catch(err){
        console.error(err.message)
        if(err.kind === 'ObjectId'){return res.status(400).json({msg:'profile not found'})}
        res.status(500).send('server error')
    }
});
router.delete('/:id', auth,async (req, res)=>{
    try{
           
        const post = await Post.findById(req.params.id)
if(!post){
    return res.status(404).json({msg:'post not found'});
    
}
       
       await post.remove()
        res.json({msg:'post deleted '})
    }catch(err){
        console.error(err.message)
        
        res.status(500).send('server error')
    }
});
router.put('/like/:id',auth,async (req,res)=>{
    try {
        const post= await Post.findById(req.params.id);
        console.log(999,post.likes);

        if(post.likes.filter(like=>like.user.toString()=== req.user.id).length > 0){
            return res.status(400).json({msg:'Post already liked'})
        }
        post.likes.unshift({user:req.user.id});
        await post.save();
        res.json(post.likes)
    } catch (err) {
        console.error(err.message)
        
        res.status(500).send('server error')
    }
})
router.put('/unlike/:id',auth,async (req,res)=>{
    try {
        const post= await Post.findById(req.params.id);
        console.log(999,post.likes);

        if(post.likes.filter(like=>like.user.toString()=== req.user.id).length === 0){
            return res.status(400).json({msg:'Post has been not liked'})
        }
        const removeIndex = post.likes.map(item=>item._id)
        .indexOf(req.params.id);
        post.likes.splice(removeIndex,1)
        
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message)
        
        res.status(500).send('server error')
    }
});
router.post('/comment/:id',
[auth,
[
    check('text', "text is required")
 .not()
    .isEmpty(),
  
    
]],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
    const user= await User.findById(req.user.id).select('-password');
    const post=await Post.findById(req.params.id)

    const newComment = {
        text: req.body.text,
        name: user.name,
      avatar: user.avatar,
        user: req.user.id,
        
      };

   post.comments.unshift(newComment);
     await post.save();
     res.json(post)
} catch (err) {
    console.error(err.message)
        
    res.status(500).send('server error')
}
});
router.delete('/comment/:id/:comment_id', auth,async (req, res)=>{
    try{
           
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(comment=>comment.id=== req.params.comment_id)
if(!comment){
    return res.status(404).json({msg:'comment does not exist '});
    
}
if(comment.user.toString() !== req.user.id){
    return res.status(401).json({msg:'user not authorized '});
    
}
const removeIndex = post.comments.map(item=>item.user.id)
.indexOf(req.user.id);
post.comments.splice(removeIndex,1)

await post.save();
res.json(post);
       
       
    }catch(err){
        console.error(err.message)
        
        res.status(500).send('server error')
    }
});
module.exports = router;