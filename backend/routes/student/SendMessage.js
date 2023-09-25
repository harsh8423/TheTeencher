const express = require("express");
const router = express.Router();
const studentDetail = require("../../models/studentschema");

router.post("/SendMessage", async (req, res) => {
  const id = req.body.id;
  const message = req.body.message;
  const dateStamp = new Date().getTime();
  const sender = req.body.sender;
  try {
    const userData = await studentDetail.findById(id);
    if (userData) {
      const newMessage = {
        message: message,
        dateStamp: dateStamp,
        sender: sender,
      };
      console.log("object")
      console.log(newMessage)
      userData.messages.push(newMessage);

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
