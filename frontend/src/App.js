import React from "react";

import Home from "./screens/Home";
import StudentHome from "./screens/StudentHome";
import TeacherHome from "./screens/TeacherHome";
import PracticeTestPage from "./screens/PracticeTestPage";
import TestMarks from "./screens/TestMarks";
import ComingSoon from "./components/ComingSoon";
import PracticeTest from "./screens/PracticeTest";
import Test from "./screens/Test";
import Chapter1 from "./notes/CBSE/class10/Science/Chapter1";
import Homework from "./screens/Homework";
import Login from "./screens/Login";
import LoginTeacher from "./screens/LoginTeacher";
import TutorSearch from "./screens/TutorSearch";
import ChatRoom from "./screens/ChatRoom";
import FeesStructure from "./screens/FeesStructure";

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContextStat from "./components/ContextStat";

function App() {
  return (
    <>
      <ContextStat>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/Login" element={<Login />} />
              <Route exact path="/LoginTeacher" element={<LoginTeacher />} />
              <Route exact path="/Chapter1" element={<Chapter1 />} />
              <Route exact path="/PracticeTestPage/:id" element={<PracticeTestPage />}/>
              <Route exact path="/TestMarks" element={<TestMarks />} />
              <Route exact path="/Test" element={<Test />} />
              <Route exact path="/PracticeTest" element={<PracticeTest />} />
              <Route exact path="/StudentHome" element={<StudentHome />} />
              <Route exact path="/TeacherHome" element={<TeacherHome />} />
              <Route exact path="/ComingSoon" element={<ComingSoon />} />
              <Route exact path="/Homework" element={<Homework />} />
              <Route exact path="/TutorSearch" element={<TutorSearch />} />
              <Route exact path="/ChatRoom" element={<ChatRoom />} />
              <Route exact path="/FeesStructure" element={<FeesStructure />} />
            </Routes>
          </div>
        </Router>
      </ContextStat>
    </>
  );
}

export default App;
