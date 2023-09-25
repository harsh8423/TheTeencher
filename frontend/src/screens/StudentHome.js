import React, { useContext, useState, useEffect } from "react";
import ContextApi from "../components/ContextApi";
import "./StudentHomeCss.css";
import Calendar from "../components/Calendar";
import { useNavigate } from "react-router-dom";
import Todo from "./ToDoList/Todo";
import RandomFact from "../components/RandomFact";
import ImportantMessage from "../components/ImportantMessage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faListCheck } from "@fortawesome/free-solid-svg-icons";
import progressReporticon from "./images/clipboard.png";
import testMarkicon from "./images/score.png";
import dykicon from "./images/idea.png";
import da from "./images/technical-support.png";
import aq from "./images/faq.png";
import exam from "./images/test.png";
import offericon from "./images/discount.png";
import feesStatus from "./images/icons8-wallet-64.png";
import userIcon from "./images/user.png";
import logoutIcon from "./images/switch.png";

export default function StudentHome() {
  let navigate = useNavigate();
  const a = useContext(ContextApi);
  console.log(a.user._id);
  // const preview = document.getElementsByClassName("preview");
  // console.log(preview.value)

  const getstudent = async () => {
    const response = await fetch("https://the-teencher-api.vercel.app/api/getstudent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: a.user._id,
      }),
    });
    const json = await response.json();
    const userData = json.studentData
    if (!json.success) {
      console.log("not success");
    }
    if (json.success) {
      localStorage.setItem("userData", JSON.stringify(userData));

    }
  };

  useEffect(() => {
    getstudent();
  }, []);



  const [timeLeft, settimeLeft] = useState("over");

  const updateRemainingTime = () => {
    const deadline = a.user.weeklyTest.timeline;
    const currentTime = new Date().getTime();
    function update() {
      const deadlineTime = new Date(deadline).getTime();
      const timeDifference = deadlineTime - currentTime;
      if (timeDifference > 0) {
        settimeLeft("active");
      }
    }
    update();
    // settasks(updatedTasks);
  };
  useEffect(() => {
    updateRemainingTime();
  }, []);

  const handlePracticeTest = () => {
    const id = "PracticeTest";
    navigate(`../PracticeTestPage/${id} `);
  };
  const handleTest = () => {
    const id = "Test";
    navigate(`../PracticeTestPage/${id}`);
  };
  const handleTestMarks = () => {
    navigate("../TestMarks");
  };

  const handleComingSoon = () => {
    navigate("../ComingSoon");
  };
  const handleHomework = () => {
    navigate("../Homework");
  };

  const handleLogout = ()=>{
    localStorage.removeItem("userData")
      navigate("../Login")
  }

  console.log(a.user.personalInfo[0].subjectTaken);
  const yourSubjects = a.user.personalInfo[0].subjectTaken;

  return (
    <>
      <div>
        <div
          className="container-fluid bodyContainer m-0 "
          style={{ zIndex: -1 }}
        >
          <div className="row ">
            <div className="col-3 p-3 mainContainer">
              <div className="container-fluid m-3 p-3 text-center  ">
                <div className="row">
                <div
                      className="container p-4"
                      style={{
                        height: "auto",
                        width: "auto",
                        backgroundColor: "white",
                        boxShadow:
                          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                        
                      }}
                    >
                      <div className="row">
                        <div className="col-3">
                          <img
                            src={userIcon}
                            width={40}
                            height={40}
                            alt="..."
                          />
                        </div>
                        <div className="col-6">
                          <strong style={{ fontSize: "20px" }}>
                            {a.user.personalInfo[0].name}
                          </strong>
                          <br />
                          {"  "}
                          <small
                            style={{ position: "absolute", right: "50px" }}
                          >
                            <strong>
                              {a.user.personalInfo[0].schoolBoard}
                              &nbsp;&nbsp;&nbsp; Class{" "}
                              {a.user.personalInfo[0].schoolStandard}
                            </strong>
                          </small>
                        </div>
                        <br />
                        <div className="mt-4" style={{ color: "darkgreen" }}>
                          <span className="col-3">
                            <strong>Contact No. </strong>{" "}
                            {a.user.personalInfo[0].mobileNumber}
                          </span>
                          <span className="col-3">
                            <strong>SID:</strong> {a.user.personalInfo[0].sid}
                          </span>
                        </div>
                        <div className="mt-1" style={{ color: "green" }}>
                          <span className="col-6">
                            <strong>Your Subjects: </strong>{" "}
                            {a.user.personalInfo[0].subjectTaken}
                          </span>
                        </div>
                        <div className="mt-1" style={{ color: "green" }}>
                          <span className="col-3">
                            <strong>Address </strong>{"  "}&nbsp;&nbsp;
                            {a.user.personalInfo[0].address[0].city},
                            {"  "} {a.user.personalInfo[0].address[0].state}
                          </span>
                        </div>
                      </div>
                    </div>
                  <div className="col-12-fluid todo mt-3 w3-leftbar w3-rightbar w3-border-green">
                    <div>
                      <Todo />
                    </div>
                  </div>
                  <div className="col-12 mt-3 boxContainer">
                    <div className="container w3-panel w3-pale-red">
                      <div className="row">
                        <div className="col-3 text-center">
                          <img
                            className="d-flex"
                            src={offericon}
                            width={50}
                            height={40}
                            alt="..."
                          />
                        </div>
                        <div className="col-2 dyk">
                          <span
                            style={{ fontWeight: "bold", fontSize: "30px" }}
                          >
                            {" "}
                            Offer
                          </span>
                        </div>
                        <div className="col-12 p-2 text-center">
                          Refer a student and get 100% tuition fees discount on
                          your next month fees when your reffered student joins
                          the teencher.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 p-3 mainContainer ">
              <div className="container m-3 p-3 ">
                <div className="row">
                  <div className="col-12 boxContainer ">
                    <div className="w3-panel w3-pale-white w3-leftbar w3-rightbar w3-border-red ">
                      <ImportantMessage />
                    </div>
                  </div>
                  <div className="col-3 mt-3 p-3">
                    <button className="button-30" onClick={handleHomework}>
                      <FontAwesomeIcon icon={faListCheck} /> &nbsp; Homework
                    </button>
                  </div>
                  <div className="col-3 mt-3 m-2 p-3">
                    <button className="button-30" onClick={handleTestMarks}>
                      <img
                        src={testMarkicon}
                        width={50}
                        height={40}
                        alt="..."
                      />
                      Test Marks
                    </button>
                  </div>
                  <div className="col-4 mt-3 m-2 p-3 text-center">
                    <button className="button-30" onClick={handleComingSoon}>
                      <img
                        src={progressReporticon}
                        width={50}
                        height={40}
                        alt="..."
                      />
                      &nbsp;Progress Report
                    </button>
                  </div>
                  <div className="col-12 mt-3 boxContainer m-2 p-3">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-12">
                          <h3 className="py">Prepare Yourself</h3>
                          <br />
                          <h5>Your subject</h5>
                          {yourSubjects.map((subject) => {
                            return (
                              <button className="button-30 m-3" key={subject}>
                                {subject}
                              </button>
                            );
                          })}
                        </div>
                        <div></div>
                        <div className="col-4">
                          <button className="button-30">
                            <img
                              src={testMarkicon}
                              width={50}
                              height={40}
                              alt="..."
                            />
                            Solved Question
                          </button>
                        </div>
                        <div className="col-4">
                          <button className="button-30">
                            <FontAwesomeIcon icon={faListCheck} /> Revision
                            Notes
                          </button>
                        </div>
                        <div className="col-4">
                          <button
                            className="button-30"
                            onClick={handlePracticeTest}
                          >
                            <img
                              src={progressReporticon}
                              width={50}
                              height={40}
                              alt="..."
                            />
                            Practice Test
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 mt-3">
                    <button className="button-6" onClick={()=>{navigate("../ChatRoom")}}>
                      <img src={da} width={70} height={60} alt="..." />
                      <h5>
                        <strong>&nbsp;Doubt Assistant</strong>
                        <br />
                        <small>
                          <small>Get Instant Solution</small>
                        </small>
                      </h5>
                    </button>
                  </div>
                  <button
                    className="col-2 boxContainer text-center button-55"
                    onClick={timeLeft === "over" ? null : handleTest}
                  >
                    <img src={exam} width={70} height={60} alt="..." />{" "}
                    <strong>Weekly Test</strong>
                  </button>
                  <div className="col-5 mt-3">
                    <button className="button-6">
                      <img src={aq} width={70} height={60} alt="..." />
                      <h4>
                        <strong>&nbsp;Any Query </strong>
                        <br />
                        <small>
                          <small>Talk to us</small>
                        </small>
                      </h4>
                    </button>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 p-3 mainContainer">
              <div className="container p-3">
                <div className="row">
                  <div className="col-12 text-center p-3">
                    <button className="button-30" onClick={()=>{navigate("../FeesStructure")}}>
                      <img src={feesStatus} width={50} height={40} alt="..." />
                      Fees Status
                    </button>
                    <button className="button-30 m-3" style={{borderRadius:"100%"}} onClick={handleLogout}>
                      <img src={logoutIcon} width={50} height={40} alt="..." />
                      
                    </button>
                  </div>
                  <div className="col-12 text-center p-auto boxContainer">
                    <Calendar />
                  </div>
                  <div className="col-12 mt-3 boxContainer">
                    <div className="container w3-panel w3-pale-green">
                      <div className="row">
                        <div className="col-3 text-center">
                          <img
                            className="d-flex"
                            src={dykicon}
                            width={50}
                            height={40}
                            alt="..."
                          />
                        </div>
                        <div className="col-9 p-2 dyk">
                          <strong> DID YOU KNOW</strong>
                        </div>
                        <div className="col-12 p-2 text-center">
                          <RandomFact />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
