import React, { useState } from "react";
import Header from "../components/Header";
import "../style/DiffieHellman.css";
import { computeDHKey, stringToBigInt } from "../utility/Math-utils";
import { ChaumValidation } from "../utility/validation";
import { BASE_URL, CHAUM_N } from "../utility/Constant";
import axios from "axios";

function ChaumVerifying() {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");

  const handleSubmit = (event) => {
    if (ChaumValidation(event)) {
      const numericMessage = stringToBigInt(message, CHAUM_N);
      const data = {
        message: numericMessage.toString(),
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
      <hr></hr>
      <div id="info" className="row">
        <div>
          <h4>Fixed data</h4>
          <p>p: 547340383682117520798650035135656395481389963285775976108215099322508386141878177632883217495196614653381941734640444039617548576136943045116463713937</p>
          <p>q: 827425321347070857571601850577711682088450109992424147819756234151141123241440124201411683469030722587483219307421445622021923428689831657385548035757</p>
          <p>n: 452883292854405147954669301415697684252360037323511565531808565344106755425927994151842238207765299581257301622311911175737996389834977115456260820046039092823127663973252123404273908319090096266830979128319048276570787714045541130449186809784175561681797987688682800425556891888769519819375495245309</p>
          <p>publicKey: 195273912617724260052949922223517853791178544811558587014692590206694376513787354487860341449869224184189643042636945079278463008467424851488235783017503130483226322008998869626335201885080468167683623602622084013398508342237045403703855972290186419284734101028150476400102858735575809159050912174975</p>
          <p>privateKey: 277048432760301957225016439211840787707122992981885489691603723581578902269334147407539496562851595158118140536339142965793113334996298195930978755764659183348399360253597057236813499455633438404950114182354037259194744429157848060505960908975695584733355891901081857244042605829168214498381537004031</p> 
        </div>
        
      </div>
    </div>
  );
}

export default ChaumVerifying;
