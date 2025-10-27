 /*const User=require("../models/User");
 const jwt=require("jsonwebtoken");
 const bcrypt=require("bcryptjs");
 const dotEnv=require("dotenv");

 dotEnv.config();

 const secretKey=process.env.WhatIsYourName


 const userRegister=async(req,res)=>{
    const {name,pinNumber,email,password}=req.body;

    try{
const userEmail=await User.findOne({email});
if(userEmail){
    return res.status(400).json("Email Was Already Taken");
}
const hashedPassword=await bcrypt.hash(password,10);
const newUser= new User({
    name,
    pinNumber,
    email,
    password:hashedPassword
})
await newUser.save();
res.status(201).json({message:"User Registration Sucessfull"});
console.log("Registered");
    }catch(error){
  console.error(error);
  res.status(500).json({error:"Internal Server error"});
    }
 }

 const userLogin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user|| !(await bcrypt.compare(password,user.password))){
            return res.status(500).json({error:"Internal Server Error"});
        }
        const token=jwt.sign({userId:user._id},secretKey,{expiresIn:"24h"})
        const userId=user._id;
        res.status(200).json({sucess:"Login Sucess",token,userId})
        console.log(email,"this is token",token)
    }catch(err){
     console.log(error);
     res.status(500).json({error:"Internal Server Error"});
    }
 }

 module.exports={userRegister,userLogin}

 */

 const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");

dotEnv.config();
const secretKey = process.env.WhatIsYourName;

// 🟢 REGISTER
const userRegister = async (req, res) => {
  const { name, pinNumber, email, password } = req.body;

  try {
    // Check for existing email
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      pinNumber,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate token after registration
    const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: "24h" });

    res.status(201).json({
      message: "User registration successful",
      token,
      userId: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });

    console.log("Registered:", newUser.email);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 🟢 LOGIN
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "24h" });

    res.status(200).json({
      success: "Login successful",
      token,
      userId: user._id,
      name: user.name,
      email: user.email,
    });

    console.log(`${email} logged in — token: ${token}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { userRegister, userLogin };
