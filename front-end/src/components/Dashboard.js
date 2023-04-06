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
        <Nav.Link href="/Schnorr-signature">Schnorr signature</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/Chaum-blind-signature">Chaum blind signature</Nav.Link>
      </Nav.Item>
      </div>
    </Nav>
    
  );
}

export default Dashboard;
