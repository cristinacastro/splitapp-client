import React from 'react'
import { withAuth } from "../lib/AuthProvider";	
import { Link } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  return (
     <nav className="navbar">
        <ul className="center-div">
          <Link to='/'>
            <li><img src="./../images/home.jpg"></img>Dashboard</li>
          </Link>
          <Link to='/groups'>
            <li><img src="./../images/group.jpg"></img>Groups</li>
          </Link>
          <Link to='/arrangements'>
            <li><img src="./../images/arrangements.jpg"></img>Arrangements</li>
          </Link>
          <Link to='/profile'>
            <li><img src="./../images/perfil.jpg"></img>Perfil</li>
          </Link>
        </ul>
      </nav>
  );
}


export default withAuth(Navbar);
