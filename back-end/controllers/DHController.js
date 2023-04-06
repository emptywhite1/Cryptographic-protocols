const DHMath = require("../utils/DHMath");
const GMath = require("../utils/GeneralMath");

function getServerKey(req, res) {
  const p = BigInt(req.body.p);
  const g = BigInt(req.body.g);
  const A = BigInt(req.body.A);

  //get random server private key
  b = GMath.getRandomBigInt(p);
  let pKey = DHMath.computePubKey(p, g, b);
  let sharedKey = DHMath.computeSharedKey(p, A, b);
  console.log("private key:" + b);
  console.log("shared key: " + sharedKey);

  res.send({
    serverPublicKey: pKey.toString(),
    serverPrivateKey: b.toString(),
    sharedKey: sharedKey.toString()
  });
}

module.exports = { getServerKey };
