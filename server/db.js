const mongoose = require("mongoose");
module.exports =()=>{
    const connetionParams={
        useNewUrlParser: true,
        useUnifiedTopology:true,
    };

    try {
        mongoose.connect(process.env.DB, connetionParams);
        
        console.log('DB Connected');
    } catch (error) {
        console.log(error);
        console.log('Could not connect');
    }
};
