 const { error } = require("console");
const Complaint=require("../models/Complaint");
 const path=require("path");


 const addComplaint=async(req,res)=>{
    try{
         const {name,pinNumber,message}=req.body;
  if(!name || !pinNumber ||!message){
    return res.status(401).json({message:"Fields Are Required"});
  }
  const newComplaint= new Complaint({
    name,
    pinNumber,
    message
  })
  await newComplaint.save();
  res.status(201).json({message:"Complaint Submited Sucessfully"});
    }
    catch(err){
 console.log(err);
 res.status(500).json({error:"Internal Server Error"});
    }
 }

 const getcomplaint=async(req,res)=>{
  try{
const complaint=await Complaint.find();
res.status(200).json(complaint)
  }
  catch(err){
console.log(err);
res.status(500).json({error:"Failed to fetch the Complaints"})
  }
 }



 module.exports={addComplaint,getcomplaint}