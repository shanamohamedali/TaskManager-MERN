const express = require("express");
const router = express.Router();
const Todo = require("../model/todoModel");


router.get("/", async(req, res) => {
    try{
        const todoList=await Todo.find();
        console.log("===todolist", todoList);
        res.json(todoList);
    }
    catch(error)
    {
        console.log(error);
    }
});

router.post("/", async (req, res) => {
  try{
    console.log("==body", req.body);
//   const { title } = req.body;
//   const todo = {
//     title: title,
//     completed: false,
//   };
const todoList=await Todo.create(req.body);
if(todoList)
 res.json(todoList);
}catch(error)
{
    console.log(error);
}
});

router.put("/", async(req, res) => {
    try{
const { _id, title } = req.body;

  if (!("title" in req.body)) {
    return res.status(404).json({
      message: `${JSON.stringify(
        req.body
      )} :This attribute is not accepted, Required attributes is title`,
    });
  }
  const updatedTodo=await Todo.findByIdAndUpdate(_id,{...req.body},{new:true});
  console.log("updated data",updatedTodo);
  res.json(updatedTodo);
    }catch(error)
    {
        console.log(error);
    }
  

});

router.delete("/", async(req, res) => {
  try{
  console.log("deleteid==", req.body);
  const { _id } = req.body;
  const response=await Todo.findByIdAndDelete(_id);
  if(response){
    res.json(response);
  }
   res.status(404).json({
    message: `This item with id- ${_id}  doesn't not exist`,
  });
}catch(error){
  console.log(error);
}

  // let filteredtask = todoList.filter((task) => task.id !== id);
  // console.log("deleted task==", filteredtask);
  // todoList = filteredtask;
  // res.json(todoList);
});

router.put("/toggle", async(req, res) => {
  try
  {console.log("===body toggle", req.body);
  const { _id,completed } = req.body;
  const response=await Todo.findByIdAndUpdate(_id,{completed:!completed},{new:true})
  if(response){
    return res.json(response);
  }
  res.status(404).json({
    message: `item with ${id} dosen't exist`,
  });}catch(error){
    console.log(error);
  }
});

module.exports = router;
