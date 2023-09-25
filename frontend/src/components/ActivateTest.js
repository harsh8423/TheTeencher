import React, { useState } from "react";

export default function ActivateTest(props) {
  const { studentId } = props;
  const [Timeline, setTimeline] = useState(null);
  const [Activated, setActivated] = useState("false");
  const activateTask = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/ActivateTest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: studentId,
          timeline: Timeline,
        }),
      });
      const json = await response.json();

      if (!json.success) {
        alert("error");
      }
      if (json.success) {
        console.log(json);
        setActivated("true");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const onChangeHander = (event) => {
    setTimeline(event.target.value);
  };

  return (
    <>
      {Activated === "false" ? (
        <div>
          <h5>Enter the deadline of the Test</h5>
          <div>
            <label htmlFor="taskDeadline"></label>
            <input
              type="datetime-local"
              required
              name="taskDeadline"
              value={Timeline}
              onChange={onChangeHander}
              min={new Date().toISOString().split("T")[0]}
              max="2024-07-07"
            ></input>
          </div>
          <button className="button-6" onClick={activateTask}>
            Activate
          </button>
        </div>
      ) : (
        <div>
          <h1 style={{ color: "green" }}>Test Activated</h1>
        </div>
      )}
    </>
  );
}
