import React, { useState, useContext, useEffect } from "react";
import back from "./images/xnwxh3v4.png";
import ContextApi from "../components/ContextApi";
import TeacherStudentView from "../components/TeacherStudentView";
import TeacherDashboard from "../components/TeacherDasboard";


import userIcon from "./images/user.png";


export default function TeacherHome() {
  const a = useContext(ContextApi);
  console.log(a.user._id);
  console.log(a.user);
  const [page, setpage] = useState(null);
  const [StudentIndex, setStudentIndex] = useState(100)
  const [stu, setstu] = useState([])
  const [Students, setStudents] = useState([]);
  const [credentials, setcredentials] = useState({
    about: "",
    teachingSubject: "",
    preferredTime: "",
    qualification: "",
    teachingExp: "",
    travellingDistance: "",
  });

  const getStudents = async () => {
    const response = await fetch("http://localhost:5000/api/getStudents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: a.user._id,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("enter valid credential");
    }

    const students = json.students;
    setStudents(students);
    console.log(students);
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setpage("detail");
    const response = await fetch(
      "http://localhost:5000/api/CreateTeacherDetail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: a.user._id,
          teachingSubject: credentials.teachingSubject,
          qualification: credentials.qualification,
          about: credentials.about,
          teachingExp: credentials.teachingExp,
          travellingDistance: credentials.travellingDistance,
          preferredTime: credentials.preferredTime,
        }),
      }
    );
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("enter valid credential");
    }
  };

  const onChangeHander = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    setpage("half");
  };



  const detail = a.user.detail[0];
  return (
    <>
      {detail || page === null ? (
        <div>
          <div
            style={{ height: "100vh", overflow: "hidden" }}
          >
            <div style={{ zIndex: -1 }}>
              <img src={back} height="750px" width="1500px" alt="" />

              <div
                className="container p-2"
                style={{
                  height: "auto",
                  width: "auto",
                  zIndex: 3,
                  backgroundColor: "white",
                  borderRadius: "30px",
                  color: "blue",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                  position: "absolute",
                  left: "90px",
                  top: "22px",
                }}
              >
                <h1>
                  <strong>Tutor Dashboard</strong>
                </h1>
              </div>
              <div
                className="container p-4"
                style={{
                  height: "auto",
                  width: "450px",
                  zIndex: 3,
                  backgroundColor: "white",
                  borderRadius: "30px",
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                  position: "absolute",
                  left: "70px",
                  top: "120px",
                }}
              >
                <div className="row">
                  <div className="col-3">
                    <img src={userIcon} width={70} height={70} alt="..." />
                  </div>
                  <div className="col-6">
                    <strong style={{ fontSize: "30px" }}>
                      {a.user.personalInfo[0].name}
                    </strong>
                    <br />
                    {"  "}
                    <small style={{ position: "absolute", right: "50px" }}>
                      <strong>
                        {a.user.personalInfo[0]?.age}yrs&nbsp;&nbsp;&nbsp;
                        {a.user.personalInfo[0]?.gender}
                      </strong>
                    </small>
                  </div>
                  <br />
                  <div className="mt-4" style={{ color: "darkgreen" }}>
                    <span className="col-3">
                      <strong>Qualification:</strong>{" "}
                      {a.user.detail?.qualification}
                    </span>
                    <span className="col-3">
                      <strong>Experience:</strong>{" "}
                      {a.user.detail?.teachingExp}
                    </span>
                  </div>
                  <div className="mt-1" style={{ color: "green" }}>
                    <span className="col-6">
                      <strong>Preferred Time:</strong>{" "}
                      {a.user.detail?.preferredTime}
                    </span>
                    <span className="col-6">
                      <strong>Can Go:</strong>{" "}
                      {a.user.detail?.travellingDistance}
                    </span>
                  </div>
                  <div className="mt-1" style={{ color: "green" }}>
                    <span className="col-3">
                      <strong>Subject You Teach:</strong>{" "}
                      {a.user.detail?.teachingSubject}
                    </span>
                  </div>
                  <div className="mt-4" style={{ color: "red" }}>
                    <span className="col-3">
                      <strong>Description:</strong>
                      <span
                        className="mt-4 m-2 p-1"
                        style={{ border: "2px solid red" }}
                      >
                        {a.user.detail?.about}
                      </span>{" "}
                    </span>
                  </div>
                  <div>
                    <button className="" style={{
                      color: 'white',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontSize: '14px',
                      textAlign: 'center',
                      padding: '0 20px',
                      lineHeight: '30px',
                      borderRadius: '20px',
                      backgroundImage: 'linear-gradient(#335b71 45%, #03324c 55%)',
                      boxShadow: '0 2px 2px #888888',
                    }}>edit</button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className="col-7 pt-4 m-4"
                  style={{
                    minHeight:"80vh",
                    height: "auto",
                    overflow: "hidden",
                    zIndex: 1,
                    backgroundColor: "white",
                    borderRadius: "30px",
                    position: "absolute",
                    left: "420px",
                    top: "0px",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                  }}
                >
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-1"></div>
                      {StudentIndex===100 ? (
                        <div
                        className="col-11"
                        
                      >
                        <TeacherDashboard Students={Students} />
                      </div>
                      ):(
                        <div className="col-11"
                        style={{
                          boxShadow:
                            "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
                        }}>
                          <TeacherStudentView Students={stu}/>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="container-fluid text-center d-flex justify-content-center align-items-center"
          style={{
            height: "100vh",
            overflow: "auto",
            backgroundColor: "occeanblue",
          }}
        >
          <div className="row">
            <div>
              {page === "ddd" && (
                <div
                  className="container p-5 col-12"
                  style={{
                    boxShadow: " rgb(38, 57, 77) 0px 20px 30px -10px",
                    backgroundColor: "white",
                  }}
                >
                  <h3>Please provide the details to find Students </h3>
                  <div className="input-group">
                    <label htmlFor="teachingSubject">
                      enter subjects you want to teach
                    </label>
                    <input
                      type="text"
                      name="teachingSubject"
                      value={credentials.teachingSubject}
                      onChange={onChangeHander}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="preferredTime">Preferred Time</label>
                    <input
                      type="text"
                      name="preferredTime"
                      value={credentials.preferredTime}
                      onChange={onChangeHander}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="travellingDistance">
                      Travelling Distance
                    </label>
                    <input
                      type="text"
                      name="travellingDistance"
                      value={credentials.travellingDistance}
                      onChange={onChangeHander}
                      required
                    />
                  </div>
                  <button className="button-30" onClick={handleSave}>
                    Next
                  </button>
                </div>
              )}
            </div>
            <div>
              {page === "hal" && (
                <div
                  className="container p-5 col-12"
                  style={{
                    boxShadow: " rgb(38, 57, 77) 0px 20px 30px -10px",
                    backgroundColor: "white",
                  }}
                >
                  <h3>Please provide the details to find Students </h3>
                  <div className="input-group">
                    <label htmlFor="qualification">Your Qualification</label>
                    <input
                      type="text"
                      name="qualification"
                      value={credentials.qualification}
                      onChange={onChangeHander}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="teachingExp">Teaching Experience</label>
                    <input
                      type="text"
                      name="teachingExp"
                      value={credentials.teachingExp}
                      onChange={onChangeHander}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="about">Description about You</label>
                    <input
                      type="text"
                      maxLength="125"
                      name="about"
                      value={credentials.about}
                      onChange={onChangeHander}
                      required
                    />
                  </div>
                  <button className="button-30" onClick={handleSubmit}>
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
