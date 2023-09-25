const mongoose= require('mongoose')
const express = require("express");
const router = express.Router();
const QuestionBank = require("../../models/questionBankSchema");

router.post("/Test", async (req, res) => {
  
  // async function getPracticeQuestions() {
    schoolBoard=req.body.schoolBoard;
    className=req.body.className;
    subjectName=req.body.subjectName;
    chapterName=req.body.chapterName;
    console.log(schoolBoard)
      try {
        const questionBank = await QuestionBank.findOne({});
        const practiceQuestions = questionBank.cbse[0].class10[0].science[0].electricity[0].testQuestions;
    
        // Shuffle the practiceQuestions array
        const shuffledQuestions = practiceQuestions.sort(() => Math.random() - 0.5);
        // Retrieve the first five questions
        const selectedQuestions = shuffledQuestions.slice(0, 10);
    
        const questions = selectedQuestions.map((questio) => {
          const { correctOption,explanation, marksCategory, question, options } = questio;
          return { correctOption,explanation, marksCategory, question, options };
        });
    
        console.log(questions);
        return res.json({ success: true, questions });
        // return questions;
      } catch (err) {
        console.error(err);
        throw err;
      }
    // }
    
    // getPracticeQuestions()
    // .then(() => {
    //   console.log(questions)

      // mongoose.connection.close();
          // Do something with the retrieved practiceQuestions
    // });
    
})
module.exports = router;
