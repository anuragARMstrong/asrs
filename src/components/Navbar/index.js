import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const Navbar = () => {
  return (
    <div
      className="d-flex flex-column height flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: '20%', position: 'fixed' }}
    >
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg className="bi me-2" width="40" height="32">
          <use href="#bootstrap"></use>
        </svg>
        <span className="fs-4">ASRS Resolver</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto text">
        <li className="nav-item">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link text-white')}>
            Loc Out of Sequence
          </NavLink>
        </li>
        <li>
          <NavLink to="/barcode" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link text-white')}>
            Pallet Generator
          </NavLink>
        </li>
        <li>
          <NavLink to="/simulate" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link text-white')}>
            ASRS Simulator
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pallet-register"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link text-white')}
          >
            Pallet Register
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/set-configuration"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link text-white')}
          >
            Set Configuration
          </NavLink>
        </li>
      </ul>
      <hr />
      {/* <div className="dropdown">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
        <strong>PrudviRaj</strong>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
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
      </div> */}
    </div>
  );
};

export default Navbar;
