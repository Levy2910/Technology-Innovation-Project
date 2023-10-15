/*Navbar component
Le Vy Cao 104201234
Last edited 14/09/2023*/
import React, { useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';
 
import '../Css/Navbar.css'; // Import the CSS file
 
function Navbar() {
    let navigate = useNavigate();
    const logOut = () =>{
      // Clear all data from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('age');
      localStorage.removeItem('gender');
      localStorage.removeItem('nationality');
      localStorage.removeItem('postcode');
      localStorage.removeItem('name');
      localStorage.removeItem('password');
      localStorage.removeItem('email');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');

      navigate('/login');
    }
    const user = localStorage.getItem('token');
 
  return (
    <nav className="navbar">
      <div className="navbar-list">
        <div className="navbar-item logo">
          <Link to="/" className="navbar-link">
            <img
              width="50px"
              height="50px"
              src="/images/HRLogoCMYKsmall.jpg"
              alt="logo"
            />
          </Link>
        </div>
        <div className="navbar-item pages">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/about" className="navbar-link">
            About Us
          </Link>
          <Link to="/how-to-use" className="navbar-link">
            How to Use
          </Link>
          <Link to="/services" className="navbar-link">
            Services
          </Link>
          <Link to="/test" className="navbar-link">
            Log Test
          </Link>
        </div>
        <div className="navbar-item buttons">
          {user ? ( //show logout if user is authenticated, if not show login and reg
          (<>
          <Link to="/profile" className="navbar-link">
            <img
            width="40px"
            height="40px"
            src="/images/user-64.png"
            alt="logo"
          />
          </Link>
            <button onClick={logOut} className="navbar-link">Logout</button>
            </>
          )
          ) : (
            <>
              <Link to="/register" className="navbar-link">
                <button>Register</button>
              </Link>
              <Link to="/login" className="navbar-link">
                <button>Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
 
export default Navbar;