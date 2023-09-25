const express = require("express");
const router = express.Router();
const studentRegistration = require("../../models/studentschema");
const studentDetail = require("../../models/studentschema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "f23gfc434cg3fc4g23c24g2fcg3fc4egrbjyx34qpzxv";

router.post(
  "/CreateUser",
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
            schoolStandard: req.body.schoolStandard,
            schoolBoard: req.body.schoolBoard,
            mobileNumber: req.body.mobileNumber,
            subjectTaken: ["Science","Mathematics"],
            address: [
              {
                city: req.body.city,
                state: req.body.state,
              },
            ],

            // Add other properties as needed
          },
        ],
        registrationStatus: [
          {
            halfRegistered: "false",
            fullyRegistered: "false",
          },
        ],
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

router.post("/LoginUser", async (req, res) => {
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
module.exports = router;
