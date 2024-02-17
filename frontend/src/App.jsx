import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { AdminPage } from "./Components/Admin/AdminPage";
import { HomePage } from "./Components/Home/HomePage";
import { StudentDetailsForm } from "./Components/Student/StudentDetailsForm";
import { StudentDocuments } from "./Components/Student/StudentDocuments";
import { PrivateRoute } from "./Components/Student/PrivateRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/detailsForm" element={<StudentDetailsForm />} />
          <Route path="/documentsForm" element={<StudentDocuments />} />
        </Route>
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
