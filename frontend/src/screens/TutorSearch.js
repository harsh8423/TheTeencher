import React,{useState, useEffect} from 'react'
import { useLocation } from "react-router-dom";

export default function TutorSearch() {

    
    const location = useLocation();
    const city = location.state;
    console.log(city)


  return (
    <div>
      <h1>this is tutor search</h1>
    </div>
  )
}
