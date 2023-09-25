import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import back from "./images/header-bg.png.webp";
import stuicon from "./images/icons8-student-96.png";
import teaicon from "./images/teacher.png";
import cities from "./searchObjects";
import Select from "react-select";

export default function Home() {
  let navigate = useNavigate();
  const [Longitude, setLongitude] = useState("")
    const [Latitude, setLatitude] = useState("")

  const handleStudent = () => {
    navigate("../Login");
  };

  const handleTeacher = () => {
    navigate("../LoginTeacher");
  };

  
 const currentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        console.log(position)
        console.log("latitude: ",position.coords.latitude,position.coords.longitude)
    })
    }
    

  return (
    <>
      <div>
        <Navbar />
        <div className="container-fliud text-center">
          <div className="row">
            <div
              className="col-12"
              style={{
                backgroundImage: `url(${back})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                position: "relative",
              }}
            >
              <div className="container-fluid d-flex justify-content-center align-items-center">
                <div className="row ">
                  <div
                    className="col-8 mt-4"
                    style={{
                      fontSize: "3rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Welcome To,{" "}
                  </div>
                  <div
                    className="col-12 text-center"
                    style={{
                      fontSize: "5rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    The Teencher
                  </div>
                  <dov className="col-4"></dov>
                  <div
                    className="col-8"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Enhancing the Education, Enhancing the Future
                  </div>
                  <div
                    className="col-12 mt-5"
                    style={{ fontWeight: "bold", fontSize: "4rem" }}
                  >
                    Get Home Tutor
                  </div>
                  <div className="col-3"></div>
                  <div className="col-5 mt-2">
                    <div className="text-center">
                    <Select
                    
                    placeholder="Search tutor in your city"
                    styles={{ height: "10px", overflow: "auto" }}
                    options={cities}
                    isSearchable
                    onChange={(city) => {
                      navigate("../TutorSearch", { state: city });
                    }}
                  />
                    </div>
                  </div>
                  <div className="col-2"><button className="button-55" onClick={currentLocation}>Use location</button></div>

                  <div
                    className="col-12"
                    style={{
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    The Teencher improves the quality of education of Home
                    Tution
                  </div>
                  <div className="container mt-5 mb-5">
                    <div className="row">
                      <div className="col-2"></div>
                      <div
                        className="col-4 text-center"
                        style={{
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        <button className="button-55" onClick={handleStudent}>
                          <span className="d-flex">
                            <img
                              src={stuicon}
                              width={90}
                              height={100}
                              alt="..."
                            />{" "}
                            <span className="mt-3 ">
                              Study And Enhance Your Learning Experience With
                              The Special Features From The Teencher
                            </span>
                          </span>
                          <button
                            className="button-55 m-0"
                            style={{
                              color: "red",
                              backgroundColor: "whitesmoke",
                            }}
                          >
                            Student Login|Register
                          </button>
                        </button>
                      </div>
                      <div
                        className="col-4 text-center"
                        style={{
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        <button className="button-55" onClick={handleTeacher}>
                          <span className="d-flex">
                            <img
                              src={teaicon}
                              width={90}
                              height={100}
                              alt="..."
                            />{" "}
                            <span className="mt-3 text-center">
                              Start Your Tutoring Career With The Help And
                              Support From <br /> The Teencher
                            </span>
                          </span>
                          <button
                            className="button-55 m-0"
                            style={{
                              color: "red",
                              backgroundColor: "whitesmoke",
                            }}
                          >
                            Teacher Login|Register
                          </button>
                        </button>
                      </div>
                      <div className="col-2"></div>
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
