const express = require("express");
const router = express.Router();
const studentDetail = require('../../models/studentschema');

router.post("/SaveResult", async (req, res) => {
  
  const id = req.body.id;
  const markObtained = req.body.markObtained;
  const remark = req.body.remark;
  const testName = req.body.testName;
  const totalMarks = req.body.totalMarks;
  const subjectName = req.body.subjectName;
  const chapterName = req.body.chapterName;

  try {
    const userData = await studentDetail.findById(id);
    if (userData) {
      const testGiven = {
        testName: testName,
        marksObtained: markObtained,
        totalMarks: totalMarks,
        remark: remark,
      };
      
        const newTestEntry = {
          subjectName: subjectName,
          chapterName: chapterName,
          testGiven: [testGiven],
        };
        userData.tests.push(newTestEntry);

      // const subjectIndex = userData.tests.findIndex(
      //   (test) => test.subjectName === subjectName && test.chapterName === chapterName
      // );

      // if (subjectIndex !== -1) {
      //   // Subject and chapter already exists, add test details
      //   userData.tests[subjectIndex].testGiven.push(testGiven);
      // } else {
      //   // Subject and chapter does not exist, create a new entry
      //   const newTestEntry = {
      //     subjectName: subjectName,
      //     chapterName: chapterName,
      //     testGiven: [testGiven],
      //   };
      //   userData.tests.push(newTestEntry);
      // }

      await userData.save();
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  } catch (error) {
    console.error("Error updating student:", error);
    // Handle error
  }
});

module.exports = router;
