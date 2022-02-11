const router=require('express').Router();
const User=require('../model/user');
const {registerValidation,loginValidation}=require("../validation")
const bcrypt=require('bcryptjs');

router.post('/register',async (req,res)=>{
    //validate data
   const validation= registerValidation(req.body)
   if(error=validation.error){
       return res.status(400).send(error.details[0].message)
       console.log("ERROR")
   }
    
   //checking if user is already in database
    const emailExist=await User.findOne({
        email:req.body.email,
    })
    if(emailExist) return res.status(400).send("Email already exists")
    // hash password
    const salt=bcrypt.genSaltSync(5);
    const hashPassword=bcrypt.hashSync(req.body.password,salt)
    res.status(200).send({"Salt":salt,"password":hashPassword})
    //create user if data is valid
//        const user=new User({
//            name:req.body.name,
//            email:req.body.email,
//            password:req.body.password
//        });
//        try{
//            const savedUser=await user.save()
//            res.send(savedUser)
//        }   
//        catch(e){
//            res.status(400).send(e)
//        }
   }
)


module.exports=router;