const router=require("express").Router();
const {User,validate}=require("../models/user");
const bycrypt=require("bcrypt");


router.post("/",async(req,res)=>{
    try {
        console.log(req.body)
        // const {error}=validate(req.body);
        // console.log(error)
        // if(error){
        //     return res.status(400).send({message:error.details[0].message});
        // }
        const user=await User.findOne({username:req.body.username});

        if(user)
            return res.status(409).send({message:"User with given username already exists"});
        const salt=await bycrypt.genSalt(Number(process.env.SALT));
        const hashedPassword=await bycrypt.hash(req.body.password,salt);

        await new User({...req.body, password:hashedPassword}).save();
        res.status(201).send({message:"User created successfully"});
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"});
    }
})
module.exports=router;