import React, { useContext, useEffect } from "react";
import ContextApi from "../components/ContextApi";
import { useNavigate } from "react-router-dom";

export default function ResultPage(props) {
  let navigate = useNavigate();

  const answers = props.answers;
  console.log(props.answers);
  const a = useContext(ContextApi);
  const id = a.user._id;
  const handlePracticeTest = () => {
    navigate("../StudentHome ");
  };
  let count = 0;
  let remark = null;
  answers.forEach((answer) => {
    if (answer === "true") {
      count++;
    }
    if (count === 5) {
      remark = "Excellent";
    } else if (count === 4) {
      remark = "Good";
    } else if (count > 2) {
      remark = "Average score";
    } else {
      remark = "Poor score";
    }
  });
  async function saveResult(){
    const response = await fetch("http://localhost:5000/api/SaveResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        remark: remark,
        totalMarks: 5,
        markObtained: count,
        subjectName: props.detail.subjectName,
        chapterName: props.detail.chapterName,
        testName: props.testType,
      }),
    });
    const json = await response.json();

    if (!json.success) {
      alert("Cannot save result server issue");
    }
    if (json.success) {
      console.log("success");
    }
  };

  useEffect(() => {
    saveResult();
  }, []);

  return (
    <div className="container-fluid d-flex text-center justify-content-center align-items-center">
      <div className="row">
        <div className="boxContainer text-center p-5">
          <h1>Student Name: {a.user.personalInfo[0].name}</h1>
          {props.testType==="PracticeTest"? (
            <h1 className="boxContainer m-5">Marks: {count} / 5</h1>
          ):(<>
            <h1 style={{color:"green"}}>Test Submmited Succcessfully </h1>
            <h2 style={{color:"red"}}>Tutor Verification is pending</h2>
            <p>Once the tutor will check your marks you would be able to see your result</p>
           </>
          )}
          <button className="button-6" onClick={handlePracticeTest}>
            Go To Home
          </button>
        </div>
      </div>
    </div>
  );
}
