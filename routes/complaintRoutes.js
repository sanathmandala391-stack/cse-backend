const complaintController=require("../controllers/complaintController");
const verifyToken=require("../middlewares/verifyToken")
const express=require("express");

const router=express.Router();
router.post('/complaint',verifyToken,complaintController.addComplaint);
router.get('/getcomplaint',complaintController.getcomplaint);

module.exports=router;