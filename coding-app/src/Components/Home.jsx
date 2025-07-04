import React from "react";
import Navbar from "./Navbar"; 
import Hero from "./Hero";
import UsersSection from "./UsersSection";
import Testimonials from "./Testimonials";
import Collaborate from "./Collaborate";
import Feedback from "./Feedback";


const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <UsersSection />
      <Testimonials />
      <Collaborate />
      <Feedback />

    </div>
  );
};

export default Home;
