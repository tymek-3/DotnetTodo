import React from "react";
import { Link } from "react-router-dom";

type Props = {
  isLogedIn: boolean;
  logout(): void;
};

const Navbar = (props: Props) => {
  return (
    <nav className="pl-2 gap-2 flex justify-start">
      <Link to="/">Home</Link>
      {props.isLogedIn ? (
        <button onClick={props.logout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
