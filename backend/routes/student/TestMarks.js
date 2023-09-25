const express = require("express");
const router = express.Router();
const studentDetail = require('../../models/studentschema');

router.post("/TestMarks", async (req, res) => {
  
  const id = req.body.id;
  
  try {
    const studentData = await studentDetail.findById(id);
    if (studentData) {
        const marks = studentData.tests     
        return res.json({ success: true,marks });
      }else {
      return res.json({ success: false });
    }
  } catch (error) {
    console.error("Error updating student:", error);
  }
});

router.post("/getstudent", async (req, res) => {
  
  const id = req.body.id;
  
  try {
    const studentData = await studentDetail.findById(id);
    if (studentData) {
        return res.json({ success: true, studentData });
      }else {
      return res.json({ success: false });
    }
  } catch (error) {
    console.error("Error updating student:", error);
  }
});

module.exports = router;
