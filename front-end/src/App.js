import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import Dashboard from "./components/Dashboard";
// import Banner from './components/Banner';
import HomePage from "./pages/HomePage";
import DiffieHellman from "./pages/DiffieHellman";
// import SubPage1 from './pages/SubPage1';
// import SubPage2 from './pages/SubPage2';
// import SubPage3 from './pages/SubPage3';

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
