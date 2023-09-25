import React, { useContext, useState } from "react";
import Syllabus from "../components/SyllabusDetail";
import ContextApi from "../components/ContextApi";
import PracticeTest from "./PracticeTest";
import Test from "./Test"
import backIcon from "../screens/images/back.png";
import { useNavigate, useParams } from "react-router-dom";

import back from "../screens/images/backGroundTest.png";

export default function PracticeTastPage() {
  let navigate = useNavigate();
  const { id } = useParams();
  console.log(id)

  const a = useContext(ContextApi);
  const [subject, setsubject] = useState("not selected");
  const [chapter, setchapter] = useState("not selected");
  const [start, setstart] = useState("not selected");
  const [nextpage, setnextpage] = useState("not selected");

  const [chapterName, setchapterName] = useState(null);
  const [subjectName, setsubjectName] = useState(null);

  const subjectNam = Syllabus[0].classes[0].subjects;
  const chapterNam = Syllabus[0].classes[0].subjects[0].chapters;

  const handleSubject = (event) => {
    setsubject("selected");
    setchapter("not selected");
    setsubjectName(event.target.value);
    console.log(subjectName);
  };

  const handlechapter = (event) => {
    setsubject("selected");
    setchapter("selected");
    setchapterName(event.target.value);
    console.log(chapterName);
  };

  const navigateToOtherPage = () => {
    setstart("selected");
    setnextpage("selected");
  };

  const detail = {
    subjectName: subjectName,
    chapterName: chapterName,
  };

  const handleSubjectBack = () => {
    navigate("../StudentHome");
  };

  const handleChapterBack = () =>{
    setsubject("not selected")
  }

  const handleStartBack =()=>{
    setchapter("not selected")
  }

  return (
    <>
      {nextpage === "not selected" && (
        <div
          className="container-fluid d-flex justify-content-center align-items-center"
          style={{
            backgroundImage: `url(${back})`,
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            position: "absolute",
            height: "100vh",
            overflow: "auto",
          }}
        >
          <div className="row">
            <div>
              {subject === "not selected" && (
                <div
                  className="container p-4 col-12"
                  style={{
                    boxShadow: " rgb(38, 57, 77) 0px 20px 30px -10px",
                    backgroundColor: "white",
                  }}
                >
                  <div onClick={handleSubjectBack}>
                    <img src={backIcon} width={40} height={20} alt="..." />
                    <strong>Back</strong>
                  </div>
                  <h1 style={{ color: "blueviolet" }}>Select The Subject</h1>
                  <p className="mt-2 text-center" style={{ fontSize: "15px", fontWeight: "bold" }}>
                    Board: {a.user.personalInfo[0].schoolBoard}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Class: {a.user.personalInfo[0].schoolStandard}
                  </p>
                  {subjectNam.map((subjects, index) => {
                    return (
                      <button
                        className="button-30 m-3"
                        onClick={handleSubject}
                        value={subjects.subjectName}
                      >
                        {subjects.subjectName}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              {chapter === "not selected" && subject === "selected" ? (
                <div
                  className="container p-4 col-12"
                  style={{
                    boxShadow: " rgb(38, 57, 77) 0px 20px 30px -10px",
                    backgroundColor: "white",
                  }}
                >
                  <div onClick={handleChapterBack}>
                    <img src={backIcon} width={40} height={20} alt="..." />
                    <strong>Back</strong>
                  </div>
                  <h1 className="mt-2 " style={{ color: "blueviolet" }}>Select The Chapter</h1>
                  <p className="mt-2 text-center" style={{ fontSize: "15px", fontWeight: "bold" }}>
                    Board: {a.user.personalInfo[0].schoolBoard}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Class: {a.user.personalInfo[0].schoolStandard}
                    <br />
                    Subject: {subjectName}
                  </p>
                  {chapterNam.map((chapters) => {
                    return (
                      <button
                        className="button-30 m-3"
                        onClick={handlechapter}
                        value={chapters.chapterName}
                      >
                        {chapters.chapterName}
                      </button>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              {nextpage === "not selected" &&
              chapter === "selected" &&
              subject === "selected" ? (
                <div
                  className="container p-4 col-12"
                  style={{
                    boxShadow: " rgb(38, 57, 77) 0px 20px 30px -10px",
                    backgroundColor: "white",
                  }}
                >
                  <div onClick={handleStartBack}>
                    <img src={backIcon} width={40} height={20} alt="..." />
                    <strong>Back</strong>
                  </div>
                  <div className="mt-2 text-center" style={{ fontSize: "15px", fontWeight: "bold" }}>
                  <h1 className="mt-2 " style={{ color: "blueviolet" }}>Confirm To Start The Test</h1>
                    Board: {a.user.personalInfo[0].schoolBoard}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Class: {a.user.personalInfo[0].schoolStandard}
                    <br />
                    Subject: {subjectName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Chapter: {chapterName}<br/><br/>
                  </div>
                    <h4>INSTRUCTIONS: </h4>
                    <p style={{backgroundColor: "lightyellow"}}>
                    1. Once the option is submitted you cannot change the option.<br/>
                    2. Practice test is not time bound.<br/>
                    3. The Teencher will keep the record of the Practice tests to check the progress of the Student<br/>
                    </p>
                    <div className="text-center">

                  <button className="button-07" onClick={navigateToOtherPage}><strong>Start</strong></button>
                    </div>

                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
      <div>
        {nextpage === "selected" &&
        start === "selected" &&
        chapter === "selected" &&
        subject === "selected" ? (
          <>
          {id==="PracticeTest" ? (<PracticeTest detail={detail} />):(<Test detail={detail}/>)}
          
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
