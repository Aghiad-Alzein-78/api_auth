const router=require('express').Router();
const User=require('../model/user');
const {registerValidation,loginValidation}=require("../validation")


router.post('/register',async (req,res)=>{
    //validate data
   const validation= registerValidation(req.body)
   if(error=validation.error){
       res.status(400).send(error.details[0].message)
       console.log("ERROR")
   }else{
       //create user if data is valid
       const user=new User({
           name:req.body.name,
           email:req.body.email,
           password:req.body.password
       });
       try{
           const savedUser=await user.save()
           res.send(savedUser)
       }   
       catch(e){
           res.status(400).send(e)
       }
   }
})


module.exports=router;