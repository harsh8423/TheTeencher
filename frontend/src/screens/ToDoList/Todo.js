import React, { useState, useContext, useEffect } from "react";

import ContextApi from "../../components/ContextApi";
import AddHomework from "./AddHomework";
import CompleteTask from "./CompleteTask";
import viewPic from "../images/arrow-down-sign-to-navigate.png";
import deletePic from "../images/bin.png";
import backIcon from "../images/icons8-back-50.png";

export default function Todo() {
  const a = useContext(ContextApi);
  const id = a.user._id;

  const [detail, setdetail] = useState(null);
  const [Checkbox, setCheckbox] = useState(null)
 
  const [timeLeft, settimeLeft] = useState([5, 4, 3, 2]);
  const [tasks, settasks] = useState([]);
  const [addTask, setaddTask] = useState(null);

  const handleAddTask = () => {
    if(addTask==="clicked"|| Checkbox!==null){
      setaddTask("no")
      setCheckbox(null)
      getTask()
    }else{
      setaddTask("clicked");

    }
    console.log(tasks);
  };

  const getTask = async () => {
    const response = await fetch("http://localhost:5000/api/myTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const json = await response.json();

    if (!json.success) {
      alert("error");
    }
    if (json.success) {
      const dtasks = json.task;
      settasks(dtasks);
    }
  };

  var newtimeleft = [...timeLeft];
  const updateRemainingTime = () => {
    // Update the remaining time for each task
    const currentTime = new Date().getTime();
    function update() {
      tasks.map((task, index) => {
        const deadlineTime = new Date(task.taskDeadline).getTime();
        const timeDifference = deadlineTime - currentTime;
        newtimeleft[index] = timeDifference;
        settimeLeft(newtimeleft);
      });
    }
    update();
    // settasks(updatedTasks);
  };

  setInterval(() => {
    updateRemainingTime();
  }, 10000);
  
  useEffect(() => {
    getTask();
  }, []);

  return (
    <div>
      <div className="container-fluid ">
        {(addTask==="clicked" || Checkbox!==null) && <img onClick={handleAddTask} style={{float:"left"}} src={backIcon} width={40} height={30} alt="..." />}
        <span className="pt-2 m-3" style={{ fontSize: "20px", fontWeight: "bold", color:"blue" }}>
          My Task
        </span>
        {addTask === "clicked" ? (
          <AddHomework id={id} />
        ) : (
          <>
            <div className="container-fluid m-0 p-0">
              {tasks.map((task, index) => {

                var days = Math.floor(timeLeft[index] / (1000 * 60 * 60 * 24));
                var hours = Math.floor(
                  (timeLeft[index] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                var minutes = Math.floor(
                  (timeLeft[index] % (1000 * 60 * 60)) / (1000 * 60)
                );

                var timeRemaining = `${days}d ${hours}h ${minutes}m Left`;
                if(task.completed===true){
                  timeRemaining= `Completed`
                }else if (minutes < 1) {
                  timeRemaining = `Pending`;
                } else if (hours < 1) {
                  timeRemaining = `${minutes}m Left`;
                } else if (days < 1) {
                  timeRemaining = `${hours}h ${minutes}m Left`;
                } else {
                  timeRemaining = `${days}d ${hours}h Left`;
                }

                const handleDelete = async (taskId) => {
                  try {
                    const response = await fetch(
                      `http://localhost:5000/api/tasks/delete/${taskId}`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          id: a.user._id,
                        }),
                      }
                    );
                    const json = await response.json();

                    if (!json.success) {
                      alert("error");
                    }
                    if (json.success) {
                      console.log(json);
                      getTask();
                    }
                  } catch (error) {
                    console.error("Error deleting task:", error);
                  }
                };

                const handleDetail = (car) => {
                  if (!detail) {
                    setdetail(car);
                  } else {
                    setdetail(null);
                  }
                };

                const handleCheckbox = (task) => {
                  
                  setCheckbox(task)
                  // settitleStyle({
                  //   textDecoration: "line-through",
                  //   float: "left",
                  // });
                };
                return (
                  <>
                    {Checkbox===null ? (
                      <div className="container-fluid">
                      <div className="row">
                        <div
                          className="col-12"
                          style={{
                            border: "2px solid grey",
                            borderRadius: "5px",
                          }}
                        >
                          {task.title!=="homework" && 
                          <input
                          onClick={() => handleCheckbox(task)}
                          style={{ float: "left", margin: "4px" }}
                            type="checkbox"
                            id="completed"
                            checked = {task.completed}
                            name="completed"
                            value="completed"
                          />}
                          <u>
                            <strong style={task.completed ? {textDecoration:"line-through", color:"green"}:{textDecoration:"none", color:"black"}}> {task.title}</strong>
                            <img
                              key={task._id}
                              onClick={() => handleDetail(task)}
                              style={{ padding: "3px" }}
                              src={viewPic}
                              width={20}
                              height={20}
                              alt="..."
                            />
                          </u>
                          {(task.title!=="homework" || task.completed===true) && <>
                          <img
                            onClick={() => handleDelete(task._id)}
                            style={{ float: "right", padding: "3px" }}
                            src={deletePic}
                            width={25}
                            height={25}
                            alt="..."
                          />
                          </>}
                          <small>
                            <strong
                              style={task.completed ? {float: "right", padding: "3px", color:"green"}:{float: "right", padding: "3px", color:"red"}}                    
                            >
                              {timeRemaining}
                            </strong>
                          </small>
                          {detail && detail._id === task._id && (
                            <div>{detail.detail}</div>
                          )}
                        </div>
                      </div>

                    </div>
                    ):(
                      <>
                      {Checkbox && Checkbox._id === task._id && (
                        <CompleteTask studentId={a.user._id} taskId ={Checkbox._id}/>
                          )}
                      </>
                    )
                    }
                  </>
                );
              })}
            <div>
              <button className="button-6" onClick={handleAddTask}>
                Add task
              </button>
            </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
