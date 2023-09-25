import React, { useState } from "react";
import backIcon from "../screens/images/icons8-back-50.png";
import TeacherDashboard from "./TeacherDasboard";
import Calendar from "./Calendar";
import AddHomework from "../screens/ToDoList/AddHomework";
import VerifyHomework from "./VerifyHomework";
import ActivateTest from "./ActivateTest";
import VerifyTestMarks from "./VerifyTestMarks";
import SendMessage from "./SendMessage";
import { useNavigate } from "react-router-dom";


import feesStatus from "../screens/images/icons8-wallet-64.png";
import progressReporticon from "../screens/images/clipboard.png";
import testMarkicon from "../screens/images/score.png";
import addicon from "../screens/images/add.png";
import aq from "../screens/images/faq.png";
import disciplineIcon from "../screens/images/discipline.png";

export default function TeacherStudentView(props) {
  let navigate = useNavigate();

  const { Students, StudentIndex } = props;
  const id = Students[StudentIndex]._id;

  const [page, setpage] = useState("no");
  const [StudentView, setStudentView] = useState("Student Detail");

  console.log(Students[StudentIndex].personalInfo[0].name);

  const handlePageView = (xyz) => {
    setpage(xyz);
    setStudentView("Student Detail");
  };

  const handleStudentView = (xyz) => {
    setStudentView(xyz);
  };

  const handleTestMarks = () => {
    navigate("../TestMarks");
  };

  const handleComingSoon = () => {
    navigate("../ComingSoon");
  };

  return (
    <>
      {page === "no" ? (
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-2">
                <img
                  onClick={
                    StudentView === "Student Detail"
                      ? () => handlePageView("yes")
                      : () => handlePageView("no")
                  }
                  src={backIcon}
                  width={50}
                  height={50}
                  alt="..."
                />
              </div>
              <div className="text-center m-3 col-7">
                <h2 style={{ color: "blueviolet" }}>{StudentView}</h2>
              </div>
            </div>
          </div>

          <div className="container">
            {StudentView === "Student Detail" && (
              <div className="row">
                <div className="col-4">
                  <strong
                    style={{ fontSize: "20px", textTransform: "uppercase" }}
                  >
                    {Students[StudentIndex].personalInfo[0].name}
                  </strong>
                  <br />
                  <small>
                    <strong>
                      Class:{" "}
                      {Students[StudentIndex].personalInfo[0].schoolStandard}
                    </strong>
                  </small>
                  <br />
                </div>
                <div className="col-3">
                  <small>
                    <strong>
                      Contact No.{" "}
                      {Students[StudentIndex].personalInfo[0].mobileNumber}
                    </strong>
                  </small>
                  <br />
                  <small>
                    <strong>
                      Board:{" "}
                      {Students[StudentIndex].personalInfo[0].schoolBoard}
                    </strong>
                  </small>
                </div>
                <div className="col-5 ">
                  <button className="button-6" style={{ float: "right" }}>
                    <img src={feesStatus} width={50} height={40} alt="..." />
                    Fees Status
                  </button>
                </div>
                <div className="col-12 m-3">
                  <button
                    className="button-07 m-1"
                    onClick={() => handleStudentView("Add Homework")}
                  >
                    <img src={addicon} width={50} height={40} alt="..." />
                    Add Homework
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <button 
                  onClick={handleTestMarks}
                  className="button-07 m-1">
                    <img src={testMarkicon} width={50} height={40} alt="..." />
                    Test Marks
                  </button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button 
                  onClick={handleComingSoon}
                  className="button-07 m-1">
                    <img
                      src={progressReporticon}
                      width={50}
                      height={40}
                      alt="..."
                    />
                    &nbsp;Progress Report
                  </button>
                </div>
                <div className="col-6 mt-4" style={{ position: "relative" }}>
                  <button className="button-07" onClick={() => handleStudentView("Send Message")}>Send Message</button>
                  <button
                    className="button-07"
                    onClick={() => handleStudentView("verify Homework")}
                  >
                    Verify Homework
                  </button>
                  <button className="button-07"
                  onClick={()=>handleStudentView("Verify Test Marks")}>
                    <span
                      style={{
                        backgroundColor: "red",
                        border: "5px solid red",
                        float: "left",
                        borderRadius: "50%",
                      }}
                    ></span>
                    <span>Verify Test Marks</span>
                  </button>
                  <button
                    className="button-07"
                    onClick={() => handleStudentView("Activate Test")}
                  >
                    Activate Test
                  </button>

                  <div>
                    <button
                      className="button-07 m-1 mt-5"
                      style={{
                        position: "absolute",
                        bottom: "30px",
                        left: "0px",
                      }}
                    >
                      <img src={aq} width={40} height={40} alt="..." />
                      &nbsp;Any Query
                      <br />
                      <small>
                        <small>Regarding Student</small>
                      </small>
                    </button>
                    <button
                      className="button-07 m-1 mt-5"
                      style={{
                        position: "absolute",
                        bottom: "30px",
                        right: "10px",
                      }}
                    >
                      <img
                        src={disciplineIcon}
                        width={40}
                        height={40}
                        alt="..."
                      />
                      &nbsp;Report Student
                    </button>
                  </div>
                </div>
                <div className="col-6 text-center">
                  <Calendar />
                </div>
              </div>
            )}
            {StudentView === "Add Homework" && <AddHomework id={id} />}
            {StudentView === "verify Homework" && (
              <VerifyHomework studentId={id} />
            )}
            {StudentView === "Activate Test" && <ActivateTest studentId={id} />}
            {StudentView === "Verify Test Marks" && <VerifyTestMarks studentId={id} />}
            {StudentView === "Send Message" && <SendMessage studentId={id} sender="Tutor"/>}
          </div>
        </div>
      ) : (
        <div>
          <TeacherDashboard Students={Students} />
        </div>
      )}
    </>
  );
}
