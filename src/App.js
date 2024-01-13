import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "../src/component/Login"
import Home from "../src/component/Home"
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Intro from "./component/Intro.js"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<ProtectedRoute Component={Home} />} />
      </Routes>

    </Router>
  );
}

export default App;
