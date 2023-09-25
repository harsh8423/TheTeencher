const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new mongoose.Schema({
  personalInfo: [
    {
      name: { type: String },
      mobileNumber: { type: Number }, //required: [true, 'mobile number required']},
      schoolStandard: { type: String },
      email: { type: String },
      password: { type: String },
      schoolBoard: { type: String, enum: ["icse", "cbse","ICSE","CBSE", "STATE BOARD"] },
      gender: { type: String, enum: ["Male", "Female", "Other"] },
      address: [
        {
          state: { type: String },
          city: { type: String },
          landmark: { type: String },
          houseNo: { type: String },
          pincode: { type: Number },
        },
      ],
      fatherName: { type: String },
      fatherContact: { type: Number },
      dob: { type: Date },
      sid: { type: String },
      subjectTaken: [{ type: String }],
      //subjectWantToStudy:[]
    },
  ],
  transactions:{
    fees:{type: Number},
    receipt:[{
      type:{ type: String },
      status:{ type: String },
      amount:{type: Number},
      dateStamp:{ type: Date },
    }]
  },
  chatID:{type: Schema.Types.ObjectId, ref: 'chats'},
  tutor:{type: Schema.Types.ObjectId, ref: 'teacher'},
  weeklyTest:{
    active:{type:Boolean, default:false},
    timeline: { type: Date },
  },
  tests: [
    {
      subjectName: { type: String },
      chapterName: { type: String },
      tutorVerified:{type: Boolean, default:false},
      // syllabusStatus: { type: String, enum: ["Completed", "Not completed"], default: "Not completed"},
      testGiven: [
        {
          testName: {
            type: String,
            // enum: ["practiceTest", "weeklyTest", "monthlyTest", "unknown"],
            default: "unknown",
          },
          marksObtained: { type: Number },
          totalMarks: { type: Number },
          remark: { type: String },
        },
      ],
    },
  ],
  myTask: [
    {
      title: { type: String },
      taskCategory: { type: String },
      detail: { type: String },
      taskDeadline: { type: Date },
      completed:{type: Boolean, default:false}
    },
  ],
  registrationStatus: [
    {
      halfRegistered: { type: String },
      fullyRegistered: { type: String },
    },
  ],
  messages:[
    {
      sender:{type:String},
      message:{type:String},
      dateStamp: { type: Date },
  }
  ],

  attendance: [
    {
      dateStamp: { type: Date },
      remark: { type: String },
    },
  ],
});
const studentDetail = mongoose.model("student", studentSchema);
module.exports = studentDetail;
