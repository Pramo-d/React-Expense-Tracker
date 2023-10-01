import "./App.css";
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import UpdateProfile from "./Components/Pages/UpdateProfile";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header.js/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
