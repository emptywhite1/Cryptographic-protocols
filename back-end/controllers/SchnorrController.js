const { generateKeyPairSync } = require("crypto");
const schnorrModel = require("../models/SchnorrModel");
const sql = require("../db/DbConnection");

const p = 14017716757242392797n;
const g = 1737185883727607545n;

// Register a user
async function register(req, res) {
  const { username, password } = req.body;
  console.log("Username:", username);
  console.log("Password:", password);
  try {
    await schnorrModel.register(username, password);
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// Start a login session
async function login(req, res) {
  let { username, announcement } = req.body;
  try {
    const publicKey = (
      await schnorrModel.getUserPublicKey(username)
    ).toString();
    const challenge = schnorrModel.generateChallenge().toString();
    announcement = announcement.toString();

    req.session.username = username;
    req.session.announcement = announcement;
    req.session.challenge = challenge;
    req.session.publicKey = publicKey;

    const sessionId = req.session.id;

    res.cookie('sessionId', sessionId);
    res.json({ challenge: challenge, publicKey: publicKey});
  } catch (err) {
    console.error(err);
    if (err.message == "User not found") {
      res.status(404).json({ message: "User not found" });
      return;
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
}

// Verify the response from the client
function verifyResponse(req, res) {
  const { response } = req.body;
  const { announcement, publicKey, challenge } = req.session;
  
  const r = BigInt(response);
  const h = BigInt(publicKey);
  const a = BigInt(announcement);
  const c = BigInt(challenge);
  if(schnorrModel.verifyResponse(r, h, c, a)){
    res.json({message: "verification success"})
  }else{
    res.json({message: "verification failed"})
  }
  
}

module.exports = {
  register,
  login,
  verifyResponse,
};
