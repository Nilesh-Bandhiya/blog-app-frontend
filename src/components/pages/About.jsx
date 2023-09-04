import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-image">
        <img src="../about.png" alt="pic" className="pic" />
      </div>
      <div className="about-text">
        <h2 className="text-h2">About Us</h2>
        <h5 className="text-h5">
          Front-end Developer & <span>Designer</span>
        </h5>
        <p className="text-p">
          Welcome to our blog! We are a passionate team of front-end developers
          and designers dedicated to creating beautiful and user-friendly
          websites and web applications. Our mission is to provide you with
          valuable content, insights, and inspiration through our blog posts. We
          believe in the power of design and technology to transform the digital
          landscape and enhance the user experience.
        </p>
      </div>
    </div>
  );
};

export default About;
