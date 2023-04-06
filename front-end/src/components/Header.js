import React from "react";
import "../style/Header.css";
import { Nav } from "react-bootstrap";

function Header(props) {
  return (
    <div className="wrapper bg-light">
    <h1>{props.name}</h1>
    </div>
  );
  }
  export default Header;