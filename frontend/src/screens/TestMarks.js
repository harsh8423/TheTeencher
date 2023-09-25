import React, { useContext, useEffect, useState } from "react";
import ContextApi from "../components/ContextApi";

export default function TestMarks() {
  const a = useContext(ContextApi);
  console.log(a.user._id);
  const id = a.user._id;

const [Marks, setMarks] = useState([])
  const getTestMarks = async () => {
    const response = await fetch("http://localhost:5000/api/TestMarks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const json = await response.json();

    if (!json.success) {
      console.log("not success");
    }
    if (json.success) {
      const marks = json.marks;
      console.log(marks);
      setMarks(marks)
      const testGiven=marks.testGiven;
    }
  };

  useEffect(() => {
    getTestMarks();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Test Type</th>
              <th scope="col">Subject</th>
              <th scope="col">Chapter</th>
              <th scope="col">Marks Obtained</th>
              <th scope="col">Total marks</th>
              <th scope="col">Remark</th>
            </tr>
          </thead>
          <tbody>
            {Marks.map((mark, index) => {
              return(
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{mark.testGiven[0].testName}</td>
                <td>{mark.subjectName}</td>
                <td>{mark.chapterName}</td>
                <td>{mark.testGiven[0].marksObtained}</td>
                <td>{mark.testGiven[0].totalMarks}</td>
                <td>{mark.testGiven[0].remark}</td>

              </tr>

              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
