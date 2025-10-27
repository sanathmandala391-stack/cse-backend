 const Timetable=require("../models/Timetable");
 const multer=require("multer");
 const path=require("path");


 const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads/');//manam ichina files stores//
  },
  filename:function(req,file,cb){
   const uniquename=Date.now()+"-"+file.originalname;
   cb(null,uniquename);
  }

 });

 const upload=multer({storage:storage});

 const addTimetable=async(req,res)=>{
    try{  
  const {semester}=req.body;
  const image=req.file ? req.file.filename :undefined;

  if(!semester || !image){
    return res.status(404).json({message:"Files are Required"});
  }
  const newTimetable=new Timetable({
semester,
image

  });
  await newTimetable.save();
  res.status(201).json({message:"Time Table Uploaded Sucessfully"});
    }
    catch(err){
        console.log(err);
  res.status(500).json({error:"Internal Server Error"})
    }
 }

 const getTimetable = async (req, res) => {
  try {
    const timetables = await Timetable.find(); 
    res.status(200).json(timetables);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch timetable" });
  }
};

 module.exports={addTimetable:[upload.single("image"),addTimetable],getTimetable}