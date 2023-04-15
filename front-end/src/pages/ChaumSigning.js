import React, { useState } from "react";
import Header from "../components/Header";
import "../style/DiffieHellman.css";
import {
  computeBlindedMessage,
  getBlindFactor,
  getR,
  stringToBigInt,
  unblindSignature,
} from "../utility/Math-utils";
import { ChaumValidation } from "../utility/validation";
import { BASE_URL, CHAUM_N, CHAUM_PUBLICKEY } from "../utility/Constant";
import axios from "axios";

function ChaumSigning() {
  const [message, setMessage] = useState("");
  const [blindMessage, setBlindMessage] = useState("");
  const [blindedSignature, setblindedSignature] = useState("");
  const [signature, setSignature] = useState("");

  const handleSubmit = (event) => {
    if (ChaumValidation(event)) {
      const r = getR(CHAUM_N);
      const blindFactor = getBlindFactor(r, CHAUM_N, CHAUM_PUBLICKEY);
      const numericMessage = stringToBigInt(message, CHAUM_N);
      const blindedMessage = computeBlindedMessage(
        numericMessage,
        blindFactor,
        CHAUM_N
      );

      setBlindMessage(blindedMessage.toString());

      const data = {
        message: blindedMessage.toString(),
      };

      axios
        .post(`${BASE_URL}/chaum/requestSignature`, data)
        .then((res) => {
          setblindedSignature(res.data.signature);

          const unblindedSignature = unblindSignature(
            res.data.signature,
            r,
            CHAUM_N
          );
          setSignature(unblindedSignature.toString());
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
            <div style={{ marginTop: "0vh" }}>
              <a
                href="/Chaum-verifying"
                style={{ textDecoration: "none", fontSize: 12 }}
              >
                Need to verify your signature? Go here
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
        <div></div>
        <div>
          <h4>Your blinded message (what the server see)</h4>
          <p>{blindMessage}</p>
        </div>
        <div>
          <h4>Your blinded signature (signed on the blinded message)</h4>
          <p>{blindedSignature}</p>
          <h4>
            Your unblinded signature(use this to verify the message in
            verification page)
          </h4>
          <p>{signature}</p>
        </div>
      </div>
    </div>
  );
}

export default ChaumSigning;
