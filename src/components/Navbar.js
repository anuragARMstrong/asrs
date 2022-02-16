import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onRouteChange }) => {
  return (
    <Router>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
        style={{ width: "280px" }}
      >
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <svg className="bi me-2" width="40" height="32">
            <use href="#bootstrap"></use>
          </svg>
          <span className="fs-4">ASRS Resolver</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            {/* <a href="#" className="nav-link active" aria-current="page"> */}
            {/* <svg className="bi me-2" width="16" height="16"> */}
            {/* <use href="/"></use> */}
            <Link
              to="/"
              onClick={() => onRouteChange("home")}
              className="nav-link active"
            >
              Home
            </Link>
            {/* </svg> */}
            {/* </a> */}
          </li>
          <li>
            <Link
              to="/barcode"
              onClick={() => onRouteChange("barcode")}
              className="nav-link text-white"
            >
              Barcode
            </Link>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16">
                <use href="#table"></use>
              </svg>
              Other 1
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16">
                <use href="#grid"></use>
              </svg>
              Other 2
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16">
                <use href="#people-circle"></use>
              </svg>
              Other 3
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>PrudviRaj</strong>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href="#">
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Router>
  );
};

export default Navbar;
