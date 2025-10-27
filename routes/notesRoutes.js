 const notesController=require("../controllers/notesController");
 const express=require("express");

 const router=express.Router();

 router.post('/notes',notesController.addNotes);
 router.get('/getnotes',notesController.getNotes)

 module.exports=router;