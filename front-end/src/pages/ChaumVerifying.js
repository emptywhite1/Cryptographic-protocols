import React, { useState } from "react";
import Header from "../components/Header";
import "../style/DiffieHellman.css";
import { computeDHKey } from "../utility/Math-utils";
import { DHValidation } from "../utility/validation";
import { BASE_URL } from "../utility/Constant";
import axios from "axios";

function ChaumVerifying() {
  const [message, setMessage] = useState("");
  const [g, setG] = useState("");
  const [a, setA] = useState(""); // user privateKey
  const [publicKey, setPublicKey] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault()
    // if (DHValidation(event)) {
    //   const publicKey = computeDHKey(p, g, a);
    //   setPublicKey(publicKey.toString());

    //   const data = {
    //     p: p,
    //     g: g,
    //     A: publicKey.toString(),
    //   };
    //   axios
    //     .post(`${BASE_URL}/dh/getServerKey`, data)
    //     .then((res) => {
    //       setResponse(res.data);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    
  };

  return (
    <div>
      <Header name="Chaum Blind Signature" />
      <div className="card form-wrapper">
      <div className="card-header">Signing form</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your message</label>
              <textarea
                rows={5}
                className="form-control"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Your signature</label>
              <textarea
                rows={5}
                className="form-control"
                id="signature"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "0vh" }}>
              <a
                href="/Chaum-signing"
                style={{ textDecoration: "none", fontSize: 12 }}
              >
                Your message haven't been signed yet? Go here
              </a>
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
      <div id="info" className="row">
        <div>
          <h4>Your blinded message</h4>
          <p>hello</p>
        </div>
        <div>
          <h4>Your blinded signature</h4>
          <p>hello</p>
          <h4>Your unblinded signature(use this with the message in verification page)</h4>
          <p>hello</p>
        </div>
      </div>
    </div>
  );
}

export default ChaumVerifying;
