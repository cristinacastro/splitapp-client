import React from 'react'
import { withAuth } from "../lib/AuthProvider";	

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
     <nav>
        <ul>
          <Link to='/profile'>
            <li>Perfil</li>
          </Link>
          <Link to='/groups'>
            <li>Groups</li>
          </Link>
          <Link to='/'>
            <li>Dashboard</li>
          </Link>
          <Link to='/arrangements'>
            <li>Arrangements</li>
          </Link>
        </ul>
      </nav>
  );
}


export default withAuth(Navbar);
