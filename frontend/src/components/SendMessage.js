import React, { useState } from "react";

export default function SendMessage(props) {
  const { studentId, sender } = props;
  const [Sent, setSent] = useState("no")
  const [Messages, setMessages] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/SendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: studentId,
        sender: sender,
        message: Messages,
      }),
    });
    const json = await response.json();

    if (!json.success) {
      alert("Cannot save result server issue");
    }
    if (json.success) {
      console.log("success");
      setSent("yes")
    }
  }

  const onChangeHander = (event) => {
    setMessages(event.target.value);
  };

  return (
    <div>
      {Sent==="no"? (
        <form onSubmit={sendMessage}>
        <div className="text-center">
        <input
          className="text-center m-1 "
          type="text"
          name="name"
          width="200px"
          height="200px"
          placeholder="Write a message ...."
          value={Messages}
          onChange={onChangeHander}
          required
        />
        <div>
            <button type="submit" className="button-30">Send</button>
        </div>
        </div>
      </form>
      ):(
        <div>
            <h1 style={{color:"green"}}>Message Sent Successfully</h1>
        </div>
      )}
    </div>
  );
}
