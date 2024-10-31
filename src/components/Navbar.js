import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/create-account">Create Account</Link>
  </nav>
);

export default Navbar;
