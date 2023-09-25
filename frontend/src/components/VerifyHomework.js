import React, { useState, useEffect } from "react";
import CompleteTask from "../screens/ToDoList/CompleteTask";

export default function VerifyHomework(props) {
  const { studentId } = props;
  const [Checkbox, setCheckbox] = useState(null);

  const [timeLeft, settimeLeft] = useState([5, 4, 3, 2]);
  const [tasks, settasks] = useState([]);
  const getTask = async () => {
    const response = await fetch("http://localhost:5000/api/myTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: studentId,
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
          if (task.completed === true) {
            timeRemaining = `Completed`;
          } else if (minutes < 1) {
            timeRemaining = `Pending`;
          } else if (hours < 1) {
            timeRemaining = `${minutes}m Left`;
          } else if (days < 1) {
            timeRemaining = `${hours}h ${minutes}m Left`;
          } else {
            timeRemaining = `${days}d ${hours}h Left`;
          }
          const handleCheckbox = (task) => {
            setCheckbox(task);
          };
          return (
            <>
              {Checkbox === null ? (
                <div className="container-fluid">
                  <div className="row">
                    <div
                      className="col-12"
                      style={{
                        border: "2px solid grey",
                        borderRadius: "5px",
                      }}
                    >
                      {task.title === "homework" && (
                        <>
                        {props.yes ? "":(
                          <input
                          onClick={() => handleCheckbox(task)}
                          style={{ float: "left", margin: "4px" }}
                          type="checkbox"
                          id="completed"
                          checked={task.completed}
                          name="completed"
                          value="completed"
                        />
                        )}
                      <u>
                        <strong
                          style={
                            task.completed
                            ? {
                              textDecoration: "line-through",
                              color: "green",
                            }
                            : { textDecoration: "none", color: "black" }
                          }
                          >
                          {" "}
                          {task.title}
                        </strong>
                      </u>
                      <small>
                        <strong
                          style={
                            task.completed
                            ? {
                              float: "right",
                              padding: "3px",
                              color: "green",
                            }
                            : {
                              float: "right",
                              padding: "3px",
                              color: "red",
                            }
                          }
                          >
                          {timeRemaining}
                        </strong>
                      </small>
                      <p>Detail: {task.detail}</p>
                      </>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {Checkbox && Checkbox._id === task._id && (
                    <CompleteTask studentId={studentId} taskId={Checkbox._id} />
                  )}
                </>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
