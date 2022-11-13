import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import AboutUs from "./pages/AboutUs";
import Post_Advert from "./pages/Post_Advert";
import Admin from "./pages/Admin/Admin";
import Identification_Login from "./pages/Identification_Login"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Identification_Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/formsociety" element={<Post_Advert />} />
        <Route path="/adminpage" element={<Admin />} />
        {/* // if nothing was found*/}
        <Route path="*" element={<Identification_Login />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;