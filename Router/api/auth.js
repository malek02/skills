const express = require('express');
const router = express.Router();
const auth = require('../../middelware/auth');
const User= require('../../modules/user')
const bcrypt= require ('bcryptjs');
const jwt = require('jsonwebtoken');
const config =require('config');
const {check, validationResult}=require('express-validator');

router.get('/', auth, async (req,res)=> {

 
    try{
        const user =await User.findById(req.user.id).select('-password');
        console.log(11,user)
        res.json(user);
        
    }
        catch(err){
            console.error(err.message);
            res.status(500).send('server errror')
        }
    }
);
router.post('/',

[
  
    check('email', 'Please include a valid email').isEmail(),
    check('password' , 'password is require').exists()
],

async (req,res)=> {
   console.log(req.body);
const errors= validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
};

const {email,password}= req.body;

try {
let user= await User.findOne({email})
if(!user){
res.status(400).json({errors: [{message: 'user didt exist'}]});
}


const isMatch= await bcrypt.compare(password,user.password);
if(!isMatch){
    res.status(400).json({errors: [{message: 'password not match'}]});   
}
const payload={
    user:{
        id:user.id
    }
};

jwt.sign(payload,
    config.get('jwtSecret'),{expiresIn:360000},
    (err,token)=>{
        if(err) throw err;
        res.json({token})
    })
await user.save();
res.send('User registreted');
}
catch(err){
    console.error(err.message);
    res.status(500).send('server errrorr')
}




});

module.exports = router;