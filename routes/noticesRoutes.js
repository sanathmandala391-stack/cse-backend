 const noticeController=require("../controllers/noticesController");
 const verifyToken=require("../middlewares/verifyToken")
 const express=require("express");


 const router=express.Router();
 router.post('/notice',verifyToken,noticeController.addNotice);
 router.get('/getnotice',noticeController.getNotices);

 module.exports=router;