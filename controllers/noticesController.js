const Notice=require("../models/Notice");
const multer=require("multer");
const path=require("path");


const addNotice=async(req,res)=>{
try{ 
const { title, message} = req.body || {};
if (!title || !message) {
  return res.status(400).json({ error: 'Title and message are required.' });
}

const newNotice=new Notice({
    title,
    message
})
await newNotice.save();
res.status(201).json({message:"Notice Added Sucessfull"});
}
catch(err){
console.log(err);
res.status(500).json({error:"Internal Server Error"});
}

}

const getNotices=async(req,res)=>{
try{
const notices=await Notice.find();
res.status(200).json(notices)
}
catch(error){
console.log(error);
res.status(500).json({error:"Failed to fetch the notices"});
}
}

module.exports={addNotice,getNotices}