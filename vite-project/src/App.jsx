import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header.jsx";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import UserManagement from './pages/UserManager.jsx'; 

import Task from "./pages/TaskManager.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/task" element={<Task />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
