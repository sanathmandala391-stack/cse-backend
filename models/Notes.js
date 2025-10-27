  const mongoose=require("mongoose");

 const notesSchema=new mongoose.Schema({
 subject:{
    type:String,
    required:true
 },
 file:{
    type:String,
 },
 semester:{
    type:String
 }

 })

 const Notes= mongoose.model("Notes",notesSchema);
 module.exports=Notes