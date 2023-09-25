import React, { useContext, useEffect, useState } from "react";
import ContextApi from "../components/ContextApi";

export default function ImportantMessage() {
  const a = useContext(ContextApi);

  const [PendingTask, setPendingTask] = useState([]);
  const [SentMessage, setSentMessage] = useState([]);
  const [ActiveTest, setActiveTest] = useState("no");

  const updateRemainingTime = () => {
    const currentTime = new Date().getTime();

    const deadline = a.user.weeklyTest.timeline;
    const deadlineTime = new Date(deadline).getTime();
    const timeLeftWeeklyTest = deadlineTime - currentTime;
    if (timeLeftWeeklyTest > 0) {
      setActiveTest("yes");
    }

    const messages = a.user.messages;
    messages.map((message) => {
      const messageDeadline = new Date(message.dateStamp).getTime();
      const timeLeftMessages = messageDeadline - currentTime;
      if (timeLeftMessages < 172800000) {
        setSentMessage([...SentMessage, message]);
      }
    });

    const tasks = a.user.myTask;
    tasks.map((task) => {
      const taskDeadline = new Date(task.taskDeadline).getTime();
      const timeLeftTask = taskDeadline - currentTime;
      if (timeLeftTask < 0 && task.completed === false) {
        setPendingTask([...PendingTask, task]);
      }
    });
  };
  useEffect(() => {
    updateRemainingTime();
  }, []);

  console.log(a.user._id);
  return (
    <>
      <h4>Important Messages</h4>
      <div className="container-fluid">
        <div className="row">
          {ActiveTest === "yes" && (
            <div className="col-12">
              <span style={{ color: "orange", fontWeight: "bold" }}>
                Weelky Test:{" "}
              </span>
              Test is ACTIVE
            </div>
          )}
          {SentMessage.map((message) => {
            return (
              <div className="col-12">
                <span style={{ color: "blue", fontWeight: "bold" }}>
                  {message.sender}:{" "}
                </span>
                <span> {message.message}</span>
              </div>
            );
          })}
          {PendingTask.map((task) => {
            return (
              <div className="col-12">
                <span style={{ color: "red", fontWeight: "bold" }}>
                  My Task:{" "}
                </span>
                <span> {task.title} </span>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {" "}
                  <small> Pending</small>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
