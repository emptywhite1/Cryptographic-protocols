const gMath = require('./GeneralMath')

function computePubKey (prime, generator, privateKey){
	
	const p = BigInt(prime);
  const g = BigInt(generator);
  const a = BigInt(privateKey);
	let A = gMath.power(g, a, p);

  return A;
}

function computeSharedKey (prime, otherPublicKey, privateKey){
	
	const p = BigInt(prime);
  const A = BigInt(otherPublicKey);
  const b = BigInt(privateKey);
	let K = gMath.power(A, b, p);

  return K;
}

module.exports = { computePubKey, computeSharedKey };