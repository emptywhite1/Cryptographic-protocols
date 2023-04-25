/* global BigInt */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { BASE_URL } from "../utility/Constant";
import { computeSchnorrKey } from "../utility/Math-utils";
import { SchnorrValidation } from "../utility/validation";

function SchnorrRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userPublicKey, setUserPublicKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modulo, setModulo] = useState(null);
  const [generator, setGenerator] = useState(null);

  useEffect(() => {
    async function getPublicData() {
      const response = await axios.get(`${BASE_URL}/schnorr/getPublicData`);
      setModulo(BigInt(response.data.modulo))
      setGenerator(BigInt(response.data.generator))
    }
    getPublicData();
    
  }, []);

  function handlePassword() {
    return computeSchnorrKey(
      modulo,
      generator,
      password
    ).toString();
  }

  const handleSubmit = (event) => {
    if (SchnorrValidation(event)) {
      setIsSubmitting(true);
      const publicKey = handlePassword()
      const data = {
        username: username,
        password: publicKey,
      };
      
      axios
        .post(BASE_URL + "/schnorr/register", data)
        .then((response) => {
            alert(response.data.message)
            setIsSubmitting(false)
            setUserPublicKey(publicKey)
        })
        .catch((error) => {
          alert(error.response.data.message)
          setIsSubmitting(false)
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
        <h4 style={{ wordWrap: 'break-word' }}>Your Public Key:  {userPublicKey}</h4>
      </div>
    </div>
  );
}

export default SchnorrRegister;
