const express = require("express");
const router = express.Router();
const studentRegistration = require("../../models/teacherScehma");
const studentDetail = require("../../models/teacherScehma");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "f23gfc434cg3fc4g23c24g2fcg3fc4egrbjyx34qpzxv";

router.post(
  "/CreateTeacher",
  [
    body("email", "invalid email").isEmail(),
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("password", "password should have minimum 5 charachters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const secpassword = await bcrypt.hash(req.body.password, salt);
    try {
      const newStudent = new studentRegistration({
        personalInfo: [
          {
            name: req.body.name,
            email: req.body.email,
            password: secpassword,
            mobileNumber: req.body.mobileNumber,
            address: 
              {
                city: req.body.city,
                state: req.body.state,
              },
          },
        ],
        kycStatus:
          {
            halfKyc: "false",
            fullyKyc: "false",
          },
      });

      // Save the new student document
      await newStudent
        .save()
        .then((result) => {
          console.log("Student created:", result);
          // Handle success
        })
        .catch((error) => {
          console.error("Error creating student:", error);
          // Handle error
        });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

router.post("/LoginTeacher", async (req, res) => {
  try {
    let email = req.body.email;
    const userData = await studentDetail.findOne({
      "personalInfo.email": email,
    })

      console.log(userData)
    if (!userData) {
      return res.status(400).json({ errors: "email or password wrong" });
    }
    pwdCompare = await bcrypt.compare(
      req.body.password,
      userData.personalInfo[0].password
    );
    if (!pwdCompare) {
      return res.status(400).json({ errors: "email or password wrong" });
    }
    const data = {
      user: {
        id: userData._id,
      },
    };
    const authToken = jwt.sign(data, secret);
    return res.json({ success: true, authToken,userData });
  } catch (error) {
    console.error("Error creating student:", error);
    // Handle error
  }
});

router.post("/CreateTeacherDetail", async(req, res) => {
  const id = req.body.id;
  const teachingExp = req.body.teachingExp;
  const about = req.body.about;
  const travellingDistance = req.body.travellingDistance;
  const teachingSubject = req.body.teachingSubject;
  const qualification = req.body.qualification;
  const preferredTime = req.body.preferredTime;
    try {
      const userData = await studentDetail.findById(id);
      if(userData){
        const newTestEntry = {
          qualification: qualification,
          preferredTime: preferredTime,
          about: about,
          teachingExp:teachingExp,
          travellingDistance:travellingDistance,
          teachingSubject:teachingSubject,
          
        };
        userData.detail =newTestEntry;
        await userData.save();
        res.json({ success: true });
      }
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);


router.post("/getStudents", async(req, res) => {
  const id = req.body.id;
    try {
      const tutor = await studentDetail.findById(id).populate('students');
    
    if (!tutor) {
      console.log('Tutor not found');
      return;
    }  
    const students = tutor.students;
    res.json({success: true, students})
        } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);


module.exports = router;
