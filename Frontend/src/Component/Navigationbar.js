import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

export function NavigationBar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLoginOrLogout = () => {
    if (isLoggedIn) {

      localStorage.removeItem("token"); 
      setIsLoggedIn(false); 
      navigate('/register'); 
    } else {
      
      navigate('/signin');
    }
  };

  return (
    <nav className="nav">
      <a href="#" className="nav__brand">
        LoanApp
      </a>
      <ul className={active}>
        <LinkContainer to="/">
          <li className="nav__item">
            <a href="#" className="nav__link">
              Home
            </a>
          </li>
        </LinkContainer>
        <LinkContainer to="/apply">
          <li className="nav__item">
            <a href="#" className="nav__link">
              AppliedLoan
            </a>
          </li>
        </LinkContainer>
        <LinkContainer to="/loans">
          <li className="nav__item">
            <a href="#" className="nav__link">
              MyLoans
            </a>
          </li>
        </LinkContainer>

        <li className="nav__item">
          <Button onClick={handleLoginOrLogout} className={`btn btn-${isLoggedIn ? "danger" : "primary"}`}>
            <h4 className="text-center pt-1">{isLoggedIn ? "Log Out" : "Log In"}</h4>
          </Button>
        </li>
      </ul>

      <div
        onClick={() => {
          if (active === "nav__menu") {
            setActive("nav__menu nav__active");
          } else setActive("nav__menu");

          if (icon === "nav__toggler") {
            setIcon("nav__toggler toggle");
          } else setIcon("nav__toggler");
        }}
        className={icon}
      >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}
