import React from "react";
import { Nav } from "react-bootstrap";
import "../style/Dashboard.css";
function Dashboard() {
  return (
    <Nav
       className="col-md-2 d-none d-md-block bg-light sidebar"
    >
    <div id="content" className="content">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/Diffie-Hellman">
          Diffie-Hellman key exchange
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/Schnorr-login">Schnorr authentication</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/Chaum-signing">Chaum blind signature</Nav.Link>
      </Nav.Item>
      </div>
    </Nav>
    
  );
}

export default Dashboard;
