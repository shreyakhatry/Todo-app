const router=   require('express').Router()
const Todo=require("../models/Todos");


//router
router.post("/add/todo",(req,res)=>{
    const {todo}=req.body;
    const newTodo=new Todo({todo})

        //save the todo
        newTodo.save()
        .then(()=>{
            console.log("Successfully added todo!");
            res.redirect("/");
        })
        .catch((err)=>console.log(err));
})

.get("/delete/todo/:_id",(req,res)=>{
    const {_id}=req.params;
    Todo.deleteOne({_id})
    .then(()=>{
        console.log("Successfully deleted todo!");
        res.redirect("/");
    })
    .catch((err)=>console.log(err));
});
// 
router.get("/api/todos",(req,res)=>{
    var todoList = []
    Todo.find({},"todo").exec()
    .then(results => {
        res.send(results)
    })
    .catch(error => {
      console.error(error);
    });
})

module.exports=router;