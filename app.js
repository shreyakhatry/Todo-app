const express=require("express");
const mongoose=require("mongoose");

const app=express();
// app.set('view engine', 'ejs');

//connect mongoDB
mongoose.connect("mongodb://localhost/todo_express",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

//middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");


//routes
app.use(require("./routes/index"));
app.use(require("./routes/todo"));

//server configuration
app.listen(3000,()=>{
    console.log("Server started listening on port: 3000")}
);