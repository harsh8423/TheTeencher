import React,{useState} from "react";
import testMarkicon from "../screens/images/test.png";
import userIcon from "../screens/images/user.png";
import TeacherStudentView from "./TeacherStudentView";



export default function TeacherDasboard(props) {
    const Students = props.Students

    const [StudentIndex, setStudentIndex] = useState(100)
    const handleStudentView = (index)=>{
      setStudentIndex(index)
    }

  return (
    <>
      {StudentIndex===100 ? (
        <>
        <h3 className="m-2 text-center">
        &nbsp;&nbsp;&nbsp;&nbsp;Tutor Guide by{" "}
        <span style={{ color: "#008fb3" }}>
          <strong>The Teencher</strong>
        </span>
      </h3>
      <div>
        <button className="button-07 m-3">English</button>
        <button className="button-07 m-3">Science</button>
        <button className="button-07 m-3">Maths</button>
        <button className="button-07 m-3">Computer</button>
      </div>
      <div>
        <button className="button-07 m-3 ">
          <img src={testMarkicon} width={50} height={40} alt="..." />
          &nbsp;&nbsp;PYQ
        </button>
        <button className="button-07 m-3">Revision Notes</button>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-12 mt-3"
            style={{
              boxShadow:
                "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
            }}
          >
            <h3
              className="mt-3"
              style={{ color: "blueviolet", textDecoration: "underline" }}
            >
              Your Students
            </h3>
            {Students.map((Student, index) => {
              return (
                <button
                  onClick={() => handleStudentView(index)}
                  className="button-6  m-3"
                  style={{
                    boxShadow:
                      "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
                  }}
                >
                  <img src={userIcon} width={40} height={40} alt="..." />
                  {Student.personalInfo[0].name}
                  <br />
                  Class: {Student.personalInfo[0].schoolStandard}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      </>
      ):(
        <div>
          <TeacherStudentView Students={Students} StudentIndex={StudentIndex}/>
        </div>
      )}
    </>
  );
}
