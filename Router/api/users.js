const express = require('express');
const router = express.Router();
const User = require('../../modules/user')
const {check, validationResult}=require('express-validator');
const gravatar = require('gravatar');
const bcrypt= require ('bcryptjs');
const jwt = require('jsonwebtoken');

console.log(User)
router.get('/',

[
    check('name', "name is required")
 .not()
    .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password' , 'Please enter a password with 6 or more characters').isLength({min:6})
],

async (req,res)=> {
   console.log(req.body);
const errors= validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
};

const {email,name,password}= req.body;

try {
let user= await User.findOne({email})
if(user){
res.status(400).json({errors: [{message: 'user already used'}]});
}
const avatar = gravatar.url(email,{
    s:'200',
    r:'pg',
    d:'mm'
});
user=new User({
    name,email,avatar,password
});
const salt = await bcrypt.genSalt(10);
user.password=await bcrypt.hash(password, salt);
await user.save();
res.send('User registreted');
}
catch(err){
    console.error(err.message);
    res.status(500).send('server errrorr')
}




});

module.exports = router;