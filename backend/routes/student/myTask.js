const express = require("express");
const router = express.Router();
const studentDetail = require('../../models/studentschema');

router.post("/addTask", async (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const taskCategory = req.body.taskCategory;
    const detail = req.body.detail;
    const taskDeadline = req.body.taskDeadline;
  
    try {
      const userData = await studentDetail.findById(id);
      if (userData) {
        const task = {
            title: title,
            taskCategory: taskCategory,
            detail: detail,
            taskDeadline: taskDeadline,
          };
          userData.myTask.push(task);
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
  
  router.post("/myTask", async (req, res) => {
    const id = req.body.id;  
    try {
      const userData = await studentDetail.findById(id);
      if (userData) {
        const task = userData.myTask
        return res.json({ success: true, task });
      } else {
        return res.json({ success: false });
      }
    } catch (error) {
      console.error("Error updating student:", error);
      // Handle error
    }
  });

  router.delete("/tasks/delete/:id", async (req, res) => {
    
    const id = req.body.id;  
    const taskId = req.params.id;
  
    try {
      const userData = await studentDetail.findById(id);

      const tasks =userData.myTask

      const taskIndex = tasks.findIndex((task) => task._id.toString() === taskId);

      console.log("object")
      console.log(tasks[taskIndex])
      console.log("object")

      if (taskIndex !== -1) {
        // Remove the task from the array
        tasks.splice(taskIndex, 1);
  
        // Save the updated document
        await userData.save();
      res.json({ success: true });
    } }catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ success: false, error: "Failed to delete task" });
    }
  });
  
  router.post("/tasks/complete/:id", async (req, res) => {
    
    const id = req.body.id;  
    const taskId = req.params.id;
  
    try {
      const userData = await studentDetail.findById(id);

      const tasks =userData.myTask

      const taskIndex = tasks.findIndex((task) => task._id.toString() === taskId);

      if(tasks[taskIndex].completed ===false){
        tasks[taskIndex].completed =true
      }else{
        tasks[taskIndex].completed =false
      }
      
        await userData.save();
      res.json({ success: true });
    }catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ success: false, error: "Failed to delete task" });
    }
  });
  
module.exports = router;
