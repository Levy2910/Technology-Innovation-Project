/*Hero component
Le Vy Cao 104201234
Last edited 14/09/2023*/
import React from 'react';
import { Link } from 'react-router-dom';
import "../Css/Hero.css";
import WelcomeMessage from './WelcomeMessage';

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <WelcomeMessage/>
          <h1>We’re here to help</h1>
          <h2>HIV Support</h2>
          <p>Join our community to get access to various benefits such as chatting with professionals, finding the nearest clinics, and more.</p>
          <Link to="/about" className="navbar-link"><button>About us</button></Link>
          <p>Stop the worry by getting tested with Atomo self-testing kit</p>
          <a href="https://atomohivtest.com/home.php"><button>Get Tested Today</button></a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
