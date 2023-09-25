import React, { useContext, useState, useEffect, useRef } from "react";
import ContextApi from "../components/ContextApi";
import "./css/LoginCss.css";
import { io } from "socket.io-client";

export default function ChatRoom() {
  const a = useContext(ContextApi);

  const [socket, setsocket] = useState(null);
  const [conversations, setconversations] = useState([]);
  const [inputMessage, setinputMessage] = useState("");
  const [messages, setmessages] = useState([]);
  const [chatID, setchatID] = useState("");
  const [OnlineUsers, setOnlineUsers] = useState([]);
  const messageRef = useRef(null);
  console.log("OnlineUsers", OnlineUsers);
  console.log("messeges after online users", messages);

  useEffect(() => {
    setsocket(io("http://localhost:8080"));
  }, []);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", a.user?._id);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;

    socket?.on("getMessage", (data) => {
      console.log("getMessage", data);
      setmessages((prev) => [...prev, data]);
    });
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;

    socket?.on("getNotification", (data) => {
    });
  }, [socket]);

  const scrollToBottom = () => {
    messageRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (messageRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  const getmessages = async () => {
    const response = await fetch("http://localhost:5000/api/getmessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: a.user._id,
      }),
    });
    const json = await response.json();
    console.log("json", json);
    const conversation = json.conversations;

    if (json.success) {
      console.log("conversations", conversation);
      const message = conversation.messages;
    const chtid = conversation._id;

    console.log("message ", message);
    console.log(" ChitID.........................", chtid);

    setchatID(chtid);
    setmessages(message);
    }
    if (!json.success) {
      console.log("Something went wrong");
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    socket?.emit("sendMessage", {
      senderID: a.user._id,
      message: inputMessage,
    });

    console.log(" .........................", chatID);

    const response = await fetch("http://localhost:5000/api/XsendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatID: chatID,
        senderID: a.user._id,
        message: inputMessage,
      }),
    });
    const json = await response.json();
    const conversation = json.conversations;

    if (json.success) {
      console.log("msg sent");
      const message = conversation.messages;
      const chtid = conversation._id;

      console.log("message ", message);
      console.log(" ChitID.........................", chtid);

      setchatID(chtid);
      setmessages(message);
    }

    if (!json.success) {
      console.log("msg not sent Something went wrong");
    }
  };

  useEffect(() => {
    getmessages();
  }, []);

  const onChangeHander = (event) => {
    setinputMessage(event.target.value);
  };

  return (
    <div>
      <div className="container mt-5">
        <h2>Teencher Instant Assistant [TIA]</h2>
        <div className="row">
          <div className="col-2"></div>
          <div
            className="col-8 p-3 mt-5 normal-box"
            style={{ borderRadius: "0px", height: "80vh" }}
          >
            <>
              <h3
                style={{
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                  color: "green",
                }}
              >
                Ask Doubt <hr style={{ borderWidth: "3px" }} />
              </h3>
              <div style={{ height: "47vh", overflow: "auto" }}>
                {messages &&
                  messages.map((message, index) => {
                    if (message.senderID === a.user._id) {
                      var Mystyle = {
                        float: "right",
                        padding: "5px 10px",
                        backgroundColor: "rgba(130, 230, 113, 0.844)",
                        fontWeight: "bold",
                      };
                    } else {
                      var Mystyle = { float: "left", padding: "5px 10px" };
                    }

                    if (message?.dateStamp) {
                      const currentDate = new Date();
                      const messageDate = new Date(message?.dateStamp);

                      if (
                        currentDate.toDateString() ===
                        messageDate.toDateString()
                      ) {
                        // Message sent today
                        var formattedDate = messageDate.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                      } else if (
                        currentDate.getDate() - messageDate.getDate() ===
                        1
                      ) {
                        // Message sent yesterday
                        var formattedDate = "Yesterday";
                      } else if (
                        currentDate.getDate() - messageDate.getDate() ===
                        2
                      ) {
                        // Message sent day before yesterday
                        var formattedDate = messageDate.toLocaleDateString([], {
                          month: "numeric",
                          day: "numeric",
                          year: "2-digit",
                        });
                      } else {
                        // Message sent on a specific date
                        var formattedDate = messageDate.toLocaleDateString([], {
                          month: "numeric",
                          day: "numeric",
                          year: "2-digit",
                        });
                      }
                    }
                    return (
                      <>
                        <div
                          className="m-5"
                          ref={
                            messages.length - 1 === index ? messageRef : null
                          }
                        >
                          <div className="button-6" style={Mystyle}>
                            {message.senderID === a.user._id? "You":"Tia"} <br />
                            {message.message} <br />
                            <span
                              style={{
                                color: "grey",
                                padding: "0px 5px",
                                float: "right",
                              }}
                            >
                              <small style={{ fontWeight: "bold" }}>
                                {formattedDate}
                              </small>
                            </span>
                          </div>
                        </div>
                        <br />
                      </>
                    );
                  })}
              </div>
              <div style={{ float: "bottom" }}>
                <form className="p-4" onSubmit={sendMessage}>
                  <label htmlFor="password"></label>
                  <input
                    className="text-center m-1 button-6"
                    style={{ width: "40vw" }}
                    type="text"
                    name="password"
                    placeholder="Write a message..."
                    value={inputMessage}
                    onChange={onChangeHander}
                    required
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      fontWeight: "bold",
                    }}
                    className="button-6"
                  >
                    Send
                  </button>
                </form>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
