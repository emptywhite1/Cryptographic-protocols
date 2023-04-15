const DHModel = require("../models/DHModel");
const GMath = require("../utils/GeneralMath");

function getServerKey(req, res) {
  const p = BigInt(req.body.p);
  const g = BigInt(req.body.g);
  const A = BigInt(req.body.A);

  //get random server private key
  b = GMath.getRandomBigInt(p);
  let pKey = DHModel.computePubKey(p, g, b);
  let sharedKey = DHModel.computeSharedKey(p, A, b);
 
  console.log("Server DH private key: " + b)
  console.log("DH shared key: " + sharedKey)

  res.send({
    serverPublicKey: pKey.toString(),
  });
}

module.exports = { getServerKey };
