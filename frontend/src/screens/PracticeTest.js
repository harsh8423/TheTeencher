import React, { useState, useEffect, useContext } from "react";
import "./PracticeTectCss.css";
import ContextApi from "../components/ContextApi";
import ResultPage from "./ResultPage";



export default function ExamTestPortal(props)  {

  const totalQuestions = 5;
  const a = useContext(ContextApi);
  
  console.log(a.user._id);
  console.log(props.detail.chapterName, props.detail.subjectName)
  
  const [questionStatus, setQuestionStatus] = useState(
    Array(totalQuestions).fill(null));
  const [page, setpage] = useState("not")
  const [questions, setQuestions] = useState([]);
  
  const [answers, setAnswers] = useState(
    Array(totalQuestions).fill("Not attempted")
    );
    
    const newAnswers = [...answers];
  var [currentIndex, setCurrentIndex] = useState(0);
  const [choosenOption, setchoosenOption] = useState(null)


  useEffect(() => {
      getQuestion()
    }, []);

    
    const getQuestion = async () => {
      const response = await fetch("http://localhost:5000/api/PracticeTest", {
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
    


  // const goToQuestion = (index) => {
  //   setCurrentIndex(index);
  // };

  const nextQuestion = () => {
    const nextIndex = ++currentIndex;
    if (currentIndex === 5) {
      // Handle test submission here
      submitTest();
    } else if (nextIndex <= totalQuestions) {
      setCurrentIndex(nextIndex);
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

  return (<>
  {page==="submitted"&& <div>
      <ResultPage questions ={questions} detail={props.detail} answers={answers} testType="PracticeTest"/>
    </div>}
    {page==="yes" && <div className="container-fluid" style={{
          height: "100vh"}}>
    <div className="row">
      <div
        className="col-12"
        style={{ color: "white", backgroundColor: "rgb(39, 171, 197)" }}
      >
        <h2>THE TEENCHER</h2>
      </div>
    </div>
    {/* Test Container */}
    <div id="testContainer" className="row">
      <div className="col-9">
        <div className="row">
          <div className="col-10 text-center">
            <h1>
              <strong>PRACTICE TEST</strong>
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
            <h4>Subject:  {props.detail.subjectName}</h4>
          </div>
          <div
            className="col-6"
            style={{ color: "white", backgroundColor: "rgb(87, 189, 220)" }}
          >
            <h4>Chapter: {props.detail.chapterName}</h4>
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
              <input
                type="hidden"
                name="correctOption"
                value={questions[currentIndex].correctOption}
              />
              <input
                type="hidden"
                name="explanation"
                value={questions[currentIndex].explanation}
              />
            </div>
            <button
              type="button"
              id="nextButton"
              className="btn btn-info"
              onClick={nextQuestion}
            >
              <b>Go To Next Question</b>
            </button>
            <p>
              <br />
            </p>
            <div
              id="result"
              className="text-center pt-4 pb-4"
              // style={{ border: "2px solid black", display: "none" }}
            >
              {answers[currentIndex] !== "Not attempted" && (
                <div>{answers[currentIndex]==="true"? <div style={{backgroundColor:"green", color:"white", padding:"10px"}}>
                  <h3>Yeh!!! Correct Answer </h3>
                  <p>correct option:<strong> {questions[currentIndex].correctOption} </strong></p>
                  <p>explanation <strong>{questions[currentIndex].explanation}</strong></p>
                  
                </div >:<div style={{backgroundColor:"red ", color:"white",padding:"10px"}}>
                <h3>Opps!!! Wrong Answer </h3>
                <p>Option selected: <strong>{choosenOption}</strong>&nbsp;&nbsp;&nbsp;&nbsp;
                  <strong>correct option: {questions[currentIndex].correctOption} </strong></p>
                  <p>explanation <strong>{questions[currentIndex].explanation}</strong></p></div>}
                </div>
              )}
            </div>
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
            <h4>{a.user.personalInfo[0].name}</h4>
            <h6>Student ID: 0421</h6>
            <h6>{a.user.personalInfo[0].class}class 10</h6>
            <h6>Contact No. {a.user.personalInfo[0].mobileNumber}</h6>
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
                  backgroundColor:
                    questionStatus[index] === "correct"
                      ? "green"
                      : questionStatus[index] === "incorrect"
                      ? "red"
                      : "orange",
                  margin: "3px",
                  pading: "15px",
                }}
                // onClick={() => goToQuestion(index)}
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
