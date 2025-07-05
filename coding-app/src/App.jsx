import React from "react";
import { BrowserRouter,Routes, Route} from "react-router-dom";
import Home from "./Components/Home";
import Coding from "./Components/Main/Coding";
import Courses from "./Components/Main/Courses";
import Footer from "./Components/Footer";
import CartPage from "./Components/Main/CartPage";
import Learning from "./Components/Main/Learning";
import VideoPage from "./Components/Main/VideoPage";
import Recruiter from "./Components/Recruiter";
import "./App.css"
import Product from "./Components/Product";
import Team from "./Components/Team"
import Features from "./Components/Features";
import Collaborate from "./Components/Collaborate";

const App = () => {
  return (
    <div>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coding" element={<Coding />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/learning/:id" element={<VideoPage />} />
          <Route path="/recruiter" element={<Recruiter />} />
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<Team />} />
          <Route path="/features" element={<Features/>} />
          <Route path="/collaborate" element={<Collaborate/>} />
        </Routes>
        <Footer />
    </BrowserRouter>
    </div>
  );
};

export default App;
