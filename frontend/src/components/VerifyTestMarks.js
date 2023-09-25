import React, { useState, useEffect } from "react";
import CompleteTask from "../screens/ToDoList/CompleteTask";

export default function VerifyTestMarks(props) {
  const { studentId } = props;
  const [Checkbox, setCheckbox] = useState(null);

  const [VerifyMark, setVerifyMark] = useState("no");

  const [Marks, setMarks] = useState([]);
  const getTestMarks = async () => {
    const response = await fetch("http://localhost:5000/api/TestMarks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: studentId,
      }),
    });
    const json = await response.json();

    if (!json.success) {
      console.log("not success");
    }
    if (json.success) {
      const marks = json.marks;
      console.log(marks);
      setMarks(marks);
    }
  };

  const handleVerify = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/VerifyTest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: studentId,
            testId: Checkbox._id
          }),
        }
      );
      const json = await response.json();

      if (!json.success) {
        alert("error");
      }
      if (json.success) {
        console.log(json);
        setVerifyMark("yes")
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCheckbox = (mark) => {
    setCheckbox(mark)
    handleVerify()
  };

  useEffect(() => {
    getTestMarks();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-8">
            {VerifyMark==="no"? (
                <div>

                    {Marks.map((mark, index) => {
                      return (
                        <>
                          {mark.testGiven[0].testName === "Test" &&
                            mark.tutorVerified === false && (
                              <div>
                                <p>
                                  Test Name: {mark.testGiven[0].testName} <br />
                                  Subject Name: {mark.subjectName} <br />
                                  Chapter name: {mark.chapterName} <br />
                                  Marks: {mark.testGiven[0].marksObtained} /
                                  {mark.testGiven[0].totalMarks} <br />
                                  The Teencher Remark: {mark.testGiven[0].remark} <br />
                                  <button
                                    className="button-6"
                                    onClick={() => handleCheckbox(mark)}
                                  >
                                    Verify
                                  </button>
                                </p>
                              </div>
                            )}
                        </>
                      );
                    })}
                </div>
            ):(
                <div>
                    <h1>Verified Successfully</h1>
                </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  //           return (
  //             <>
  //               {Checkbox === null ? (
  //                 <div className="container-fluid">
  //                   <div className="row">
  //                     <div
  //                       className="col-12"
  //                       style={{
  //                         border: "2px solid grey",
  //                         borderRadius: "5px",
  //                       }}
  //                     >
  //                       {task.title === "homework" && (
  //                         <>
  //                         {props.yes ? "":(
  //                           <input
  //                           onClick={() => handleCheckbox(task)}
  //                           style={{ float: "left", margin: "4px" }}
  //                           type="checkbox"
  //                           id="completed"
  //                           checked={task.completed}
  //                           name="completed"
  //                           value="completed"
  //                         />
  //                         )}
  //                       </>
  //                       )}
  //                     </div>
  //                   </div>
  //                 </div>
  //               ) : (
  //                 <>
  //                   {Checkbox && Checkbox._id === task._id && (
  //                     <CompleteTask studentId={studentId} taskId={Checkbox._id} />
  //                   )}
  //                 </>
  //               )}
  //             </>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
}
