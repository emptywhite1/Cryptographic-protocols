const crypto = require("crypto");

function power(x, y, p) {
  // Initialize result
  // (JML- all literal integers converted to use n suffix denoting BigInt)
  let res = 1n;

  // Update x if it is more than or
  // equal to p
  x = x % p;
  while (y > 0n) {
    // If y is odd, multiply
    // x with result
    if (y & 1n) res = (res * x) % p;

    // y must be even now
    y = y / 2n; // (JML- original code used a shift operator, but division is clearer)
    x = (x * x) % p;
  }
  return res;
}


function getRandomBigInt(maxNum) {
  const maxNumStr = maxNum.toString();
  const maxNumLen = maxNumStr.length;
  let randNumStr = "";

  for (let i = 0; i < maxNumLen; i++) {
    randNumStr += Math.floor(Math.random() * 10).toString();
  }

  const randNum = BigInt(randNumStr);

  if (randNum >= maxNum || randNum === 0n) {
    return getRandomBigInt(maxNum);
  }

  return randNum;
};

function stringToBigInt(str, p) {
  const hash = crypto.createHash('sha256').update(str).digest();
  const num = BigInt(`0x${hash.toString('hex')}`);
  return num % p;
}
module.exports = { power, getRandomBigInt, stringToBigInt };
