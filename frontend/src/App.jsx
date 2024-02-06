import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { AdminPage } from "./Components/Admin/AdminPage";
import { HomePage } from "./Components/Home/HomePage";
import { StudentDetailsForm } from "./Components/Student/StudentDetailsForm";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detailsForm" element={<StudentDetailsForm />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
