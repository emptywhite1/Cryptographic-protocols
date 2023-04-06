import React, { useState } from "react";
import Header from "../components/Header";
import "../style/DiffieHellman.css";
import { computeDHKey } from "../utility/Math-utils";
import { DHValidation } from "../utility/validation";
import { BaseUrl } from "../utility/BaseUrl";
import axios from "axios";

function DiffieHellman() {
  const [p, setP] = useState("");
  const [g, setG] = useState("");
  const [a, setA] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (event) => {
    if (DHValidation(event)) {
      const publicKey = computeDHKey(p, g, a);
      setPublicKey(publicKey.toString());

      const data = {
        p: p,
        g: g,
        A: publicKey.toString(),
      };
      axios
        .post(`${BaseUrl}/dh/getServerKey`, data)
        .then((res) => {
          setResponse(res.data);
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
              <label>Generator g (Primitive Root mod P)</label>
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
                value={a}
                onChange={(e) => setA(e.target.value)}
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
      <div id="response" className="row">
        <div className="col-md-6 ">
          <h2>Transmited Data</h2>
          <p>Prime: {p}</p>
          <p>Generator: {g}</p>
          <p>Your Public Key: {publicKey}</p>
          <p>Server Public Key: {response.serverPublicKey}</p>
          
        </div>

        <div className="col-md-6">
          <h2>Secret Data <span style={{fontSize: '45%', color: "gray"}}>(in reality, not this app)</span></h2>
          <p>Your Private Key: {a}</p>
          <p>Server Private Key: {response.serverPrivateKey}</p>
          <p>Shared Key: {response.sharedKey}</p>
        </div>
      </div>
    </div>
  );
}

export default DiffieHellman;
