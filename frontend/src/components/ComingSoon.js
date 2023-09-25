import React from "react";
import { useNavigate } from "react-router-dom";
import back from "../screens/images/ComingSoon.png";

export default function ComingSoon() {
    let navigate = useNavigate();

    const handleBack = ()=>{
        navigate("../StudentHome")
    }
  return (
    <div
      className=""
      style={{
        position: "relative",
        backgroundImage: `url(${back})`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <div onClick={handleBack}
        style={{
          border: "2px solid black",
          height: "80px",
          width: "400px",
          position: "absolute",
          borderRadius: "25%",
          left: "80px",
          bottom: "135px",
        }}
      ></div>
    </div>
  );
}
