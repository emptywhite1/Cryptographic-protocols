import React, { useState } from "react";
import Header from "../components/Header";
import "../style/DiffieHellman.css";
import { computeDHKey } from "../utility/Math-utils";
import { DHValidation } from "../utility/validation";
import { BASE_URL } from "../utility/Constant";
import axios from "axios";

function DiffieHellman() {
  const [p, setP] = useState("");
  const [g, setG] = useState("");
  const [yourPrivateKey, setYourPrivateKey] = useState(""); // user privateKey
  const [yourPublicKey, setYourPublicKey] = useState("");
  const [serverPublicKey, setServerPublicKey] = useState("");
  const [sharedKey, setSharedKey] = useState("");


  const handleSubmit = (event) => {
    if (DHValidation(event)) {
      const publicKey = computeDHKey(p, g, yourPrivateKey);
      setYourPublicKey(publicKey.toString());

      const data = {
        p: p,
        g: g,
        A: publicKey.toString(),
      };
      axios
        .post(`${BASE_URL}/dh/getServerKey`, data)
        .then((res) => {
          setServerPublicKey(res.data.serverPublicKey)
          const sKey = computeDHKey(p, res.data.serverPublicKey, yourPrivateKey)
          setSharedKey(sKey.toString())
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <Header name="Diffie-Hellman key exchange" />
      <div className="card form-wrapper">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Prime number p</label>
              <input
                type="text"
                className="form-control"
                id="Prime-Number-p"
                value={p}
                onChange={(e) => setP(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Generator g (Primitive Root mod p)</label>
              <input
                type="text"
                className="form-control"
                id="Generator-g"
                value={g}
                onChange={(e) => setG(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Private key</label>
              <input
                type="text"
                className="form-control"
                id="Private-key"
                value={yourPrivateKey}
                onChange={(e) => setYourPrivateKey(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "2vh" }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
      <hr></hr>
      <div id="info" className="row justify-content-center">
        <div className="col-md-4 ">
          <h2>Transmited Data</h2>
          <p>Prime: {p}</p>
          <p>Generator: {g}</p>
          <p>Your Public Key: {yourPublicKey}</p>
          <p>Server Public Key: {serverPublicKey}</p>
          
        </div>

        <div className="col-md-4">
          <h2>Secret Data</h2>
          <p>Shared Key: {sharedKey}</p>
        </div>
      </div>
    </div>
  );
}

export default DiffieHellman;
