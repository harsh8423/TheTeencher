const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionBankSchema = new mongoose.Schema({
  cbse: [
    {
      class10: [
        {
          science: [
            {
              electricity: [
                {
                  practiceQuestions: [
                    {
                      questionNumber: { type: Number},
                      marksCategory: {
                        type: Number,
                        enum: [1, 2, 3],
                        default: 1,
                      },
                      question: { type: String, required: true },
                      options: [{ type: String, required: true }],
                      correctOption: { type: String, required: true },
                      explanation: { type: String },
                    },
                  ],
                  testQuestions: [
                    {
                      questionNumber: { type: Number},
                      marksCategory: {
                        type: Number,
                        enum: [1, 2, 3],
                        default: 1,
                      },
                      question: { type: String, required: true },
                      options: [{ type: String, required: true }],
                      correctOption: { type: String, required: true },
                      explanation: { type: String },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
const QuestionBank = mongoose.model("QuestionBank", questionBankSchema);
module.exports = QuestionBank;
