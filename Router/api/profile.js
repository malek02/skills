const express = require('express');
const router = express.Router();
const auth = require('../../middelware/auth');
const Profile=require('../../modules/profile')
const {check, validationResult}=require('express-validator');

const user = require('../../modules/user');

router.get('/me', auth,async (req,res)=> {

    try{
const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
if (!profile){
    return res.status(400).json({msg:'there is no profile for this user'})
}
res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server errrror')
    }

});
router.post('/',
auth,
[
    check('status', "status is required")
 .not()
    .isEmpty(),
    check('skills', 'skills is empty').not().isEmpty(),
    
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
const {
    company,website,location,bio,status,githubusername,skills,facebook,
    twitter,instagram,linkedin} = req.body;
    const profileFields ={};
    profileFields.user=req.user.id;
    if (company) profileFields.company=company;
    if (website) profileFields.website=website;
    if (location) profileFields.location=location;
    if (bio) profileFields.bio=bio;
    if (status) profileFields.status=status;
    if (githubusername) profileFields.githubusername=githubusername;
   
    
    if (skills) {profileFields.skills=skills.split(',').map(skill=>skill.trim())};
    profileFields.social ={}
    if (linkedin) profileFields.social.linkedin=linkedin;
    if (twitter) profileFields.social.twitter=twitter;
    if (twitter) profileFields.social.facebook=facebook;
    if (instagram) profileFields.social.instagram=instagram;

    try{
        let profile = await Profile.findOne({user: req.user.id});
        if(profile){
            profile= await Profile.findOneAndUpdate({user:req.user.id},
                {$set:profileFields},
                {new:true});
                return res.json(profile)
        }
        profile= new Profile(profileFields);
        await profile.save();
        res.json(profile)

    }catch(err){
        console.error(err.message)
        res.status(500).send('server error')
    }



})

router.get('/', async (req, res)=>{
    try{
        const profiles =await Profile.find().populate('user',['name','avatar']);
        res.json(profiles)
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error')
    }
});

router.get('/user/:user_id', async (req, res)=>{
    try{
        const profile =await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
        if(!profile) return res.status(400).json({msg :'profile not found'})
        res.json(profile)
    }catch(err){
        console.error(err.message)
        if(err.kind === 'ObjectId'){return res.status(400).json({msg:'profile not found'})}
        res.status(500).send('server error')
    }
});

router.delete('/', auth,async (req, res)=>{
    try{
        // remove users posts

        //remove profile
        await profile.findOneAndRemove({user:req.user.id})

        //remove user
        await user.findOneAndRemove({_id:req.user.id})
        
        res.json({msg:'user deleted '})
    }catch(err){
        console.error(err.message)
        
        res.status(500).send('server error')
    }
});


router.put('/experience',
[auth,
[
    check('title', "Title is required")
 .not()
    .isEmpty(),
    check('company', 'company is empty').not().isEmpty(),
    check('from', 'sfrom is empty').not().isEmpty()
    
]],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
try {
    const profile = await Profile.findOne({user:req.user.id});
     // Add to exp array
     profile.experience.unshift(newExp);
     await profile.save();
     res.json(profile)
} catch (err) {
    console.error(err.message)
        
    res.status(500).send('server error')
}
});
router.delete('/experience/:exp_id', auth,async (req, res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id})

        //remove experience
        
        const removeIndex = profile.experience.map(item=>item._id)
        .indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex,1)
        
        await profile.save();
        res.json(profile);
        
        
    }catch(err){
        console.error(err.message)
        
        res.status(500).send('server error')
    }
});
router.put('/education',
[auth,
[
    check('school', "school is required")
 .not()
    .isEmpty(),
    check('dgree', 'Dgree  is empty').not().isEmpty(),
    check('fieldofstudy', 'fieldofstudy is require').not().isEmpty(),
    check('from', 'sfrom is empty').not().isEmpty()
    
]],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const newEdu = {
        school: req.body.school,
        dgree: req.body.dgree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
try {
    const profile = await Profile.findOne({user:req.user.id});
   
     profile.education.unshift(newEdu);
     await profile.save();
     res.json(profile)
} catch (err) {
    console.error(err.message)
        
    res.status(500).send('server error')
}
});
router.delete('/education/:exp_id', auth,async (req, res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id})

        //remove experience
        
        const removeIndex = profile.education.map(item=>item._id)
        .indexOf(req.params.exp_id);
        profile.education.splice(removeIndex,1)
        
        await profile.save();
        res.json(profile);
        
        
    }catch(err){
        console.error(err.message)
        
        res.status(500).send('server error')
    }
});
module.exports = router;