const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeacherSchema = new mongoose.Schema({
  personalInfo: [
    {
      name: { type: String },
      mobileNumber: { type: Number }, //required: [true, 'mobile number required']},
      email: { type: String },
      password: { type: String },
      gender: { type: String, enum: ["Male", "Female", "Other"] },
      age:{type: Number},
      address: 
        {
          state: { type: String },
          city: { type: String },
          landmark: { type: String },
          houseNo: { type: String },
          pincode: { type: Number },
        },
    },
  ],
  detail:
    {
      about:{type: String },
      teachingSubject:[{type:String}],
      preferredTime:{type: String },
      qualification:{type: String },
      teachingExp:{type: String },
      travellingDistance:{type: String },  
    },
  kycStatus:
    {
      halfKyc: { type: String },
      fullyKyc: { type: String },
    },
  students: [{ type: Schema.Types.ObjectId, ref: "student" }],
});

const teacherRegistration = mongoose.model("teacher", TeacherSchema);
module.exports = teacherRegistration;
