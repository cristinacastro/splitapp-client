import React from 'react'
import { withAuth } from "../lib/AuthProvider";	
import { Link } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  return (
     <nav className="navbar">
        <ul className="center-div">
          <Link to='/'>
            <li>Dashboard</li>
          </Link>
          <Link to='/groups'>
            <li>Groups</li>
          </Link>
          <Link to='/arrangements'>
            <li>Arrangements</li>
          </Link>
          <Link to='/profile'>
            <li>Perfil</li>
          </Link>
        </ul>
      </nav>
  );
}


export default withAuth(Navbar);
