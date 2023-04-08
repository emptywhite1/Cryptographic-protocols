import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import Header from "../components/Header";
import { SchnorrValidation } from "../utility/validation";
import { computeSchnorrKey } from "../utility/Math-utils";
import { SCHNORR_PRIME, SCHNORR_GENERATOR, BASE_URL } from "../utility/Constant";

function SchnorrRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userPublicKey, setUserPublicKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handlePassword() {
    return computeSchnorrKey(
      SCHNORR_PRIME,
      SCHNORR_GENERATOR,
      password
    ).toString();
  }

  const handleSubmit = (event) => {
    if (SchnorrValidation(event)) {
      setIsSubmitting(true);
      setUserPublicKey(handlePassword())
      const data = {
        username: username,
        password: handlePassword(),
      };
      
      axios
        .post(BASE_URL + "/schnorr/register", data)
        .then((response) => {
            alert(response.data.message)
            setIsSubmitting(false)
        })
        .catch((error) => {
          console.error(error);
        });
      setTimeout(() => {
        setIsSubmitting(false);
      }, 5000);
    }
  };
  return (
    <div>
      <Header name="Schnorr Authentication" />
      <div className="card form-wrapper">
        <div className="card-header">Registration form</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <div style={{ marginTop: "0vh" }}>
              <a
                href="/Schnorr-login"
                style={{ textDecoration: "none", fontSize: 12 }}
              >
                Already have an account? Login here.
              </a>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "2vh" }}
              disabled={isSubmitting}
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <hr></hr>
      <div id="info">
        <h4 style={{ wordWrap: 'break-word' }}>Your publicKey (will be store by server):  {userPublicKey}</h4>
      </div>
    </div>
  );
}

export default SchnorrRegister;
