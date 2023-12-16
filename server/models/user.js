const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const Joi=require('joi');
const passwordComplexity=require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
});


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this.id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
    return token;
};

const User=mongoose.model('user',userSchema);
const validate=(data)=>{
    console.log(data);
    const schema=Joi.object({
        username:Joi.string().required().label("Username"),
        password:Joi.passwordComplexity.required().label("Password"),
    });
    console.log(schema)
    return schema.validate(data);
};

module.exports={User, validate};

