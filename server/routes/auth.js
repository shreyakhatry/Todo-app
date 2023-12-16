const router=require("express").Router();
const {User}=require("../models/user");
const Joi=require("joi");
const bycrypt=require("bcrypt");
router.post("/",async (req,res)=>{
    try {
        // const {error}=validate(req.body);
        // if(error){
        //     return res.status(400).send({message:error.details[0].message});
        // }
        const user=await User.findOne({username:req.body.username});
        if(!user){
            return res.status(404).send({message:"Invalid username or password"});
        }
        const validPassword=await bycrypt.compare(req.body.password,user.password);

        if(!validPassword){
            return res.status(404).send({message:"Invalid username or password"});
        }
        const token=user.generateAuthToken();
        res.status(200).send({data:token,message:"Logged in successfully"});
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"});
    }
})




const validate=(data)=>{
    const schema=Joi.object({
        username:Joi.string().required().label("Username"),
        password:Joi.passwordComplexity.required().label("Password"),
    });
    return schema.validate(data);
}

module.exports=router;
