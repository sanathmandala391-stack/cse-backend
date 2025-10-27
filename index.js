 

const express=require("express");
const cors=require("cors");
const path=require("path");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const userRoutes=require("./routes/userRoutes")
const timetableRoutes=require("./routes/timetableRoutes");
const notesRoutes=require("./routes/notesRoutes");
const noticeRoutes=require("./routes/noticesRoutes");
const complaintRoutes=require("./routes/complaintRoutes");
 const app=express();
 dotenv.config();

 const PORT=process.env.PORT || 4000;
app.use(cors());

app.options("*", cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
 mongoose.connect(process.env.MONGO_URI

 ).then(()=>{
   console.log("Mongo DB connected Sucessfully.")
 }).catch((err)=>{
console.log("Failed to connect",err)
 })
 
app.use(express.json());
app.use("/api", userRoutes); 
app.use("/api",timetableRoutes);
app.use("/api",notesRoutes);
app.use("/api",noticeRoutes);
app.use("/api",complaintRoutes);


 app.get('/',(req,res)=>{
  res.send("Hello welcome to my world sana..");
 })
 app.listen(PORT,()=>{
    console.log(`Server Running Started..${PORT}`)
 })