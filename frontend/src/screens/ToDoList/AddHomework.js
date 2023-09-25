import React, { useState } from "react";

export default function AddHomework(props) {
  const { id } = props;
  const [credentials, setcredentials] = useState({
    title: "",
    taskCategory: "",
    detail: "",
    taskDeadline: "",
  });
  const [Added, setAdded] = useState("no");
  const onChangeHander = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const submitAddTask = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/addTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        title: credentials.title,
        taskCategory: credentials.taskCategory,
        detail: credentials.detail,
        taskDeadline: credentials.taskDeadline,
      }),
    });
    const json = await response.json();

    if (json.success) {
      setAdded("yes");
    }

    if (!json.success) {
      alert("error in adding the task");
    }
    // setaddTask(null);
    // gettask()
  };
  return (
    <>
    {Added==="no"? (
      <div>
      <form
        onSubmit={submitAddTask}
        className="p-2"
        style={{ border: "1px solid grey" }}
      >
        <>
          <div>
            <label htmlFor="title">title</label>
            <input
              type="text"
              name="title"
              value={credentials.title}
              onChange={onChangeHander}
              required
            />
          </div>
          <div>
            <label htmlFor="taskCategory">taskCategory</label>
            <select
              onChange={onChangeHander}
              value={credentials.taskCategory}
              name="taskCategory"
            >
              <option selected value="Urgent & Important">
                None
              </option>
              <option value="Urgent & Important">Urgent & Important</option>
              <option value="Not Urgent but Important">
                Not Urgent but Important
              </option>
              <option value="Just complete">Just complete</option>
            </select>
          </div>
          <div>
            <label htmlFor="detail">detail</label>
            <input
              type="text"
              name="detail"
              placeholder="Enter Detail of the task"
              value={credentials.detail}
              onChange={onChangeHander}
              required
            />
          </div>
          <div>
            <label htmlFor="taskDeadline">Task Deadline</label>
            <input
              type="datetime-local"
              name="taskDeadline"
              value={credentials.taskDeadline}
              onChange={onChangeHander}
              min={new Date().toISOString().split("T")[0]}
              max="2024-07-07"
            ></input>
          </div>
        </>
        <button type="submit" className="btn">
          Add
        </button>
      </form>
    </div>
    ):(
      <div>
        <h4 style={{color:"green"}}>Task Added Successfully</h4>
      </div>
    )}
    </>
  );
}
