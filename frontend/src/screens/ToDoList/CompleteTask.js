import React,{useState} from 'react'

export default function CompleteTask(props) {
  const {studentId, taskId}= props
  const [Completed, setCompleted] = useState("no")
  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/complete/${taskId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: studentId,
          }),
        }
      );
      const json = await response.json();

      if (!json.success) {
        alert("error");
      }
      if (json.success) {
        console.log(json);
        setCompleted("yes")
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return (
    <>
    {Completed==="no"? (
    <div>
      <button className="button-6" onClick={() => handleDelete(taskId)}>Confirm</button>
    </div>

    ):(
      <div>
        <h1 style={{color:"green"}}>Done</h1>
      </div>
    )}
    </>
    
  )
}
