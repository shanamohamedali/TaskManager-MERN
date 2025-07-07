const mongoose=require("mongoose");

const todoSchema=mongoose.Schema({
    title:{
      type: String,
      required:true,
    },
    completed:Boolean,
});

module.exports=mongoose.model("Todo",todoSchema);