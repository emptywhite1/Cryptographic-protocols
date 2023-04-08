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
 

  res.send({
    serverPublicKey: pKey.toString(),
    serverPrivateKey: b.toString(),
    sharedKey: sharedKey.toString()
  });
}

module.exports = { getServerKey };
