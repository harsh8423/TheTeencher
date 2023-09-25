const express = require("express");
const router = express.Router();
const studentDetail = require('../../models/studentschema');

router.post("/ActivateTest", async (req, res) => {
    
        const id = req.body.id;  
        const timeline = req.body.timeline;
      
        try {
          const userData = await studentDetail.findById(id);
    
          const test =userData.weeklyTest
        
            test.active =true
            test.timeline= timeline
          
            await userData.save();
          res.json({ success: true });
        }catch (error) {
          console.error("Error deleting test:", error);
          res.status(500).json({ success: false, error: "Failed to delete test" });
        }
})

router.post("/VerifyTest", async (req, res) => {
    
  const id = req.body.id; 
  const testId = req.body.testId 

  try {
    const userData = await studentDetail.findById(id);
    const tests =userData.tests

      const testIndex = tests.findIndex((test) => test._id.toString() === testId);

      if(tests[testIndex].testGiven[0].testName ==="Test"){
        tests[testIndex].tutorVerified = true
      }else{
        console.log("no test found")
      }

      await userData.save();
    res.json({ success: true });
  }catch (error) {
    console.error("Error deleting test:", error);
    res.status(500).json({ success: false, error: "Failed to delete test" });
  }
})

module.exports = router;
