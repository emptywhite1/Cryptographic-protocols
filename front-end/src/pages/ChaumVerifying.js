import axios from "axios";
import React, { useState } from "react";
import Header from "../components/Header";
import "../style/DiffieHellman.css";
import { BASE_URL } from "../utility/Constant";
import { ChaumValidation } from "../utility/validation";

function ChaumVerifying() {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");

  const handleSubmit = (event) => {
    if (ChaumValidation(event)) {
      const data = {
        message: message,
        signature: signature,
      };
      axios
        .post(`${BASE_URL}/chaum/verifySignature`, data)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((error) => {
          alert(error, message);
        });
    }
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
                rows={7}
                className="form-control"
                id="signature"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
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
      
      
    </div>
  );
}

export default ChaumVerifying;
