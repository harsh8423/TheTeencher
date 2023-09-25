import React,{useContext} from 'react'
import VerifyHomework from '../components/VerifyHomework'
import ContextApi from "../components/ContextApi";
import { useNavigate } from "react-router-dom";
import backIcon from "./images/icons8-back-50.png";


export default function Homework() {
  let navigate = useNavigate();
    const a = useContext(ContextApi);
    const id= a.user._id

    const handleBack = ()=>{
      navigate("../StudentHome")
    }
  return (
    <div>
      <div className="container-fluid d-flex justify-content-center align-items-center text-center">
      <div className="row">
        <div className="col-2 m-1">{<img onClick={handleBack} style={{cursor:"pointer"}} src={backIcon} width={70} height={50} alt="..." />}
</div>
        <div className="col-8 m-1"><h1>Homework</h1></div>
                <div
                  className="col-12 pt-4 m-1"
                  style={{
                    minHeight:"80vh",
                    height: "auto",
                    overflow: "hidden",
                    zIndex: 1,
                    backgroundColor: "white",
                    borderRadius: "30px",
                    // left: "420px",
                    // top: "0px",
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                  }}
                >
                  <VerifyHomework studentId={id} yes={"yes"}/>
                </div>
              </div>
      </div>
    </div>
  )
}
