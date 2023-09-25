import React, { useState, useEffect, useContext } from "react";
import "./PracticeTectCss.css";
import ContextApi from "../components/ContextApi";
import ResultPage from "./ResultPage";



export default function ExamTestPortal(props)  {

  const a = useContext(ContextApi);
  console.log(a.user._id);
  const [TimerStyle, setTimerStyle] = useState({ 
    color:"white",
    backgroundColor: "rgb(39, 171, 197)",

})

  console.log(props.detail.chapterName, props.detail.subjectName)
  const totalQuestions = 10;
  const [page, setpage] = useState("not")
  const [questions, setQuestions] = useState([]);
  
  const getQuestion = async () => {
    const response = await fetch("http://localhost:5000/api/Test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        className: a.user.personalInfo[0].schoolStandard,
        schoolBoard: a.user.personalInfo[0].schoolBoard,
        subjectName: props.detail.subjectName,
        chapterName: props.detail.chapterName,
      }),
    });
    const json = await response.json();
    
    if (!json.success) {
      alert("email or password wrong");
    }
    if (json.success) {
      
      await setQuestions(json.questions);
      console.log(json.questions)
      setpage("yes")
      
    }
    
  };
  
  const [questionStatus, setQuestionStatus] = useState(
    Array(totalQuestions).fill(null)
    );
    const [answers, setAnswers] = useState(
      Array(totalQuestions).fill("Not attempted")
      );
      
      const newAnswers = [...answers];
      var [currentIndex, setCurrentIndex] = useState(0);
      const [choosenOption, setchoosenOption] = useState(null)
      const [TimeRemaining, setTimeRemaining] = useState(``)
      
      
      const goToQuestion = (index) => {
        setCurrentIndex(index);
      };
      
      const nextQuestion = () => {
        const nextIndex = ++currentIndex;
        if (currentIndex === 10) {
          // Handle test submission here
          submitTest();
        } else if (nextIndex <= totalQuestions) {
          setCurrentIndex(nextIndex);
        }
      };
      
      const previousQuestion = () => {
        var previousIndex
        if (currentIndex <= 0) {
          // Handle test submission here
        } else if (currentIndex <= totalQuestions) {
          previousIndex = --currentIndex;
          setCurrentIndex(previousIndex);
        }
      };
      
      const submitTest = () => {
        console.log("thank you.... your test has been submitted")
        setpage("submitted")
      };
      
      const handleOptionClick = (selectedOption, correctOption, explanation) => {
        setchoosenOption(selectedOption)
        if (selectedOption === correctOption) {
          console.log("correct");
          
          newAnswers[currentIndex] = "true";
          setAnswers(newAnswers);
          setQuestionStatus((prevStatus) => {
            const updatedStatus = [...prevStatus];
            updatedStatus[currentIndex] = "correct";
            return updatedStatus;
          });
        } else {
          newAnswers[currentIndex] = "false";
          setAnswers(newAnswers);
          console.log("incorrect");
          setQuestionStatus((prevStatus) => {
            const updatedStatus = [...prevStatus];
            updatedStatus[currentIndex] = "incorrect";
            return updatedStatus;
      });
    }
    console.log(answers);
    
    
  };
  //EXAM TIMER SCRIPT 
  // Set the date we're counting down to
  var fixed = new Date().getTime();
  // Update the count down every 1 second
  
        
          useEffect(() => {
            var Timer = setInterval(function () {
    
              // Get real time date
              var now = new Date().getTime();
              var duration = (fixed + 60000)
              console.log(now)
              // Find the distance between now and the count down time
              var distance = duration - now;
              
              if(distance<=31000 && distance>=30000){
                  alert("Hurry Up!!! 30 Secands Left ")
                  setInterval(() => {
                    setTimerStyle({ 
                      color:"red",
                      backgroundColor: "rgb(39, 171, 197)",
                  
                  })
                    }, 500);
                    setInterval(() => {
                      setTimerStyle({ 
                        color:"white",
                        backgroundColor: "rgb(39, 171, 197)",
                    
                    })
                      }, 1000);
                    }
                    
                    // Time calculations for days, hours, minutes and seconds
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    // Output the result in an element with id="demo"
                    setTimeRemaining(`${minutes}m ${" "} ${seconds}s`)
                    // document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";
                    
                    if (distance < 0) {
                      // clearInterval(Timer);
                      setTimeRemaining("TIME OVER")
                    }
                    
                  }, 1000);
              getQuestion()
            }, []);
        return (<>
  {page==="submitted"&& <div>
  <ResultPage questions ={questions} detail={props.detail} answers={answers} testType="Test"/>
    </div>}
    {page==="yes" && <div className="container-fluid" style={{
          height: "100vh"}}>
    <div className="row">
      <div
        className="col-6"
        style={{ color: "white", backgroundColor: "rgb(39, 171, 197)" }}
      >
        <h2>THE TEENCHER</h2>
      </div>
      <div
        className="col-6"
        style={TimerStyle}
      >
        <h2>Time Left: {TimeRemaining}</h2>
      </div>
    </div>
    {/* Test Container */}
    <div id="testContainer" className="row">
      <div className="col-9">
        <div className="row">
          <div className="col-10 text-center">
            <h1>
              <strong>Weekly TEST</strong>
            </h1>
          </div>
          <div className="col-2 text-center mt-2">
            <button
              type="button"
              id="submitButton"
              className="btn btn-warning"
              onClick={submitTest}
            >
              <strong>Submit Test</strong>
            </button>
          </div>
          <div
            className="col-6"
            style={{ color: "white", backgroundColor: "rgb(87, 189, 220)" }}
          >
            <h4>Subject:</h4>
          </div>
          <div
            className="col-6"
            style={{ color: "white", backgroundColor: "rgb(87, 189, 220)" }}
          >
            <h4>Syllabus:</h4>
          </div>
          <div className="col-12">
            <br />
            <div className="question-frame" id={`question-${currentIndex}`}>
              <h3>Question {currentIndex + 1}:</h3>
              <p>
                <strong>{questions[currentIndex].question}</strong>
              </p>
              {questions[currentIndex].options.map((option, optionIndex) => (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-dark imb"
                    name="choice"
                    value={option}
                    onClick={() =>
                      handleOptionClick(
                        option,
                        questions[currentIndex].correctOption,
                        questions[currentIndex].explanation
                      )
                    }
                  >
                    {option}
                  </button>
                  <br />
                  <br />
                </>
              ))}
              
            </div>
            <button
              type="button"
              id="nextButton"
              className="btn m-1 btn-info"
              onClick={nextQuestion}
            >
              <b>Go To Next Question</b>
            </button>
            <button
              type="button"
              id="nextButton"
              className="btn m-1 btn-info"
              onClick={previousQuestion}
            >
              <b>Previous Question</b>
            </button>
          </div>
        </div>
        <div className="col-12">
          <div className="w3-panel w3-pale-yellow w3-leftbar w3-rightbar w3-border-yellow">
            <h3>Instructions :</h3>
            <p>
              1. Once the option is submitted you cannot change the option.
              <br />
              2. Practice test is not time bound.
              <br />
              3. The Teencher will keep the record of the Practice tests to
              check the progress of the Student
            </p>
          </div>
        </div>
      </div>
      <div className="col-3">
        <div className="row">
          <div
            className="col-12 text-center"
            style={{ backgroundColor: "rgb(109, 210, 208)" }}
          >
            <h4>Student Name</h4>
            <h6>Student ID</h6>
            <h6>class 10</h6>
            <h6>Contact No.</h6>
          </div>
          <div className="col-12 text-center">
            <br />
            <br />
            <h3>Preview Section</h3>
            {questions.map((_, index) => (
              <button
                className={`w3-button w3-circle preview ${
                  questionStatus[index] === "correct"
                    ? "correct"
                    : questionStatus[index] === "incorrect"
                    ? "incorrect"
                    : ""
                }`}
                value="rtr"
                style={{
                  color:"white",
                  backgroundColor:
                    questionStatus[index] === "correct"
                      ? "blue"
                      : questionStatus[index] === "incorrect"
                      ? "blue"
                      : "orange",
                  margin: "3px",
                  pading: "15px",
                }}
                onClick={() => goToQuestion(index)}
              >
                <strong>{index + 1}</strong>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>}
  </>
  );
};
