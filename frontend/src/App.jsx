import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { AdminPage } from "./Components/Admin/AdminPage";
import { HomePage } from "./Components/Home/HomePage";
import StudentDetailsForm from "./Components/Student/StudentDetailsForm";
import { StudentDocuments } from "./Components/Student/StudentDocuments";
import { PrivateRoute } from "./Components/Student/PrivateRoute";
import { ThankYou } from "./Components/Student/ThankYou";
import { Loginentry } from "./Components/Student/Loginentry";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginentry" element={<Loginentry />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/detailsForm/:batch" element={<StudentDetailsForm />} />
          <Route path="/documentsForm/:batch" element={<StudentDocuments />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Route>
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
