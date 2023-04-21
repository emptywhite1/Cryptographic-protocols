import Header from "../components/Header";
import TestPage from "./TestPage";

function HomePage() {
  return (
    <div>
      <Header name="Home" />
      <h1>Instruction</h1>
      <hr></hr>
      <div>
        <h3>Diffie-Hellman key exchange</h3>
        <p> User enter numbers for p, g, and private key. p must be prime, g must be primitive root mod p.</p>
        <p>The server will then send a random public key created from p and g for the client to calculate the shared key.</p>
      </div>
      <hr></hr>
      <div>
        <h3>Schnorr authentication</h3>
        <p>User send their username and their public key, which is create from their password to the server for registration.</p>
        <p>User can then login using their username and password. Note that the password was never sent so the server and attacker have no idea what it is</p>
      </div>
      <hr></hr>
      <div>
        <h3>Chaum blind signature</h3>
        <p>User enter the message they want to sign and the sever will return the signature.</p>
        <p>User can then verify the signature in the verify page.</p>
      </div>
    </div>
  );
}

export default HomePage;
