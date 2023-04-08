import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../style/Schnorr.css";
import Header from "../components/Header";
import { SchnorrValidation } from "../utility/validation";
import {
  getRandomBigInt,
  computeSchnorrAnnouncement,
  computeSchnorrResponse,
  computeSchnorrKey,
} from "../utility/Math-utils";
import {
  SCHNORR_PRIME,
  SCHNORR_GENERATOR,
  BASE_URL,
} from "../utility/Constant";

const { withCredentials } = axios.defaults;
axios.defaults.withCredentials = true;

function SchnorrLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [challenge, setChallenge] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    if (SchnorrValidation(event)) {
      const nonce = getRandomBigInt(SCHNORR_PRIME);
      setIsSubmitting(true);
      setAnnouncement(
        computeSchnorrAnnouncement(SCHNORR_PRIME, SCHNORR_GENERATOR, nonce)
      );
      setPrivateKey(
        computeSchnorrKey(SCHNORR_PRIME, SCHNORR_GENERATOR, password)
      );

      const loginData = {
        username: username,
        announcement: computeSchnorrAnnouncement(
          SCHNORR_PRIME,
          SCHNORR_GENERATOR,
          nonce
        ).toString(),
      };

      axios
        .post(BASE_URL + "/schnorr/login", loginData, { withCredentials: true })
        .then((response) => {
          const challenge = response.data.challenge;
          const publicKey = response.data.publicKey;
          setChallenge(challenge);
          setPublicKey(publicKey);

          const res = computeSchnorrResponse(
            nonce,
            password,
            challenge,
            SCHNORR_PRIME
          );

          setResponse(res);

          const responseData = {
            response: res.toString(),
          };

          axios
            .post(BASE_URL + "/schnorr/verify", responseData)
            .then((response) => {
              alert(response.data.message);
            })
            .catch((error) => {
              console.error(error);
            });

          setIsSubmitting(false);
        })
        .catch((error) => {
          alert(error);
          setIsSubmitting(false);
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
        <div className="card-header">Login form</div>
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
                href="/Schnorr-register"
                style={{ textDecoration: "none", fontSize: 12 }}
              >
                Doesn't have an account yet? Register here.
              </a>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "2vh" }}
              disabled={isSubmitting}
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <hr></hr>
      <div id="info">
        <div>
          <h2>Fixed Data</h2>
          <p>Prime: {SCHNORR_PRIME.toString()}</p>
          <p>Generator: {SCHNORR_GENERATOR.toString()}</p>
        </div>
        <div>
          <h2>Transmitted Data</h2>
          <p>Your Public Key: {publicKey.toString()} </p>
          <p>Announcement: {announcement.toString()} </p>
          <p>Challenge: {challenge.toString()} </p>
          <p>Response: {response.toString()}</p>
        </div>

        <div>
          <h2>Secret Data</h2>
          <p>Your Private Key (generate from password): {privateKey.toString()} </p>
        </div>
      </div>
    </div>
  );
}

export default SchnorrLogin;
