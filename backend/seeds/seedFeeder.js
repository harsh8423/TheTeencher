const mongoose = require("mongoose");
const QuestionBank = require("../models/questionBankSchema");
const { testQuestion, practiceQuestion } = require("./questionBankSeed");

mongoose
  .connect(
    "mongodb+srv://harsh8423:8423047004@cluster0.1xbklyu.mongodb.net/questionBank",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connection open !!");
  })
  .catch((err) => {
    console.log("error in catch");
    console.log(err);
  });

const questionBank = new QuestionBank();
// Initialize the nested objects and arrays
questionBank.cbse = [];
questionBank.cbse.push({
  class10: [
    {
      physics: [
        {
          electricity: [
            {
              testQuestions: [],
              practiceQuestions:[]
            },
          ],
        },
      ],
    },
  ],
});

const seedDB = async () => {
  // await Campground.deleteMany({});
  for (let i = 0; i < 25; i++) {
    questionBank.cbse[0].class10[0].physics[0].electricity[0].testQuestions.push(
      testQuestion[i]
    );
    questionBank.cbse[0].class10[0].physics[0].electricity[0].practiceQuestions.push(
      practiceQuestion[i])

    await questionBank.save();
  }
};
seedDB().then(() => {
  // Campground.find()
  mongoose.connection.close().then(() => {
    console.log("connection closed");
  });
});
