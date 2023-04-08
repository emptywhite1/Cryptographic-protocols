import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Dashboard from "./components/Dashboard";
import HomePage from "./pages/HomePage";
import DiffieHellman from "./pages/DiffieHellman";
import SchnorrRegister from "./pages/SchnorrRegister";
import SchnorrLogin from "./pages/SchnorrLogin";
import ChaumSigning from "./pages/ChaumSigning";
import ChaumVerifying from "./pages/ChaumVerifying";



class App extends React.Component {
  render() {
    return(
    <Router>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Dashboard />
          </Col>
          <Col xs={10} style={{padding: 0}}>
            <Routes>
              <Route
                path="/"
                element={<HomePage />}
              />
              <Route
                path="/Diffie-Hellman"
                element={<DiffieHellman/>}
              />
              <Route
                path="/Schnorr-register"
                element={<SchnorrRegister/>}
              />
              <Route
                path="/Schnorr-login"
                element={<SchnorrLogin/>}
              />
              <Route
                path="/Chaum-signing"
                element={<ChaumSigning/>}
              />
              <Route
                path="/Chaum-verifying"
                element={<ChaumVerifying/>}
              />
              <Route path="*" element={<h1>404</h1>} />
              
            </Routes>
          </Col>
        </Row>
      </Container>

    </Router>
    )
  }
}

export default App;
