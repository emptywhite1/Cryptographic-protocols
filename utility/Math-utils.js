
//Miller-Rabin primality test
const isPrime = function (n, k) {
  if (n <= 1n) return false; // 0, 1, and negative numbers are not prime
  if (n <= 3n) return true; // 2 and 3 are prime
  if (n % 2n === 0n) return false; // Even numbers are not prime

  // Find r and d such that n-1 = 2^r * d
  let r = 0n;
  let d = n - 1n;
  while (d % 2n === 0n) {
    r++;
    d /= 2n;
  }

  // Repeat the test k times
  for (let i = 0; i < k; i++) {
    const a = BigInt(Math.floor(Math.random() * (n - 3)) + 2); // Pick a random number a in [2, n-2]
    let x = modPow(a, d, n);
    if (x === 1n || x === n - 1n) continue;

    for (let j = 1n; j < r; j++) {
      x = modPow(x, 2n, n);
      if (x === n - 1n) break;
      if (j === r - 1n) return false;
    }
  }

  return true;
}

function modPow(base, exponent, modulus) {
  let result = 1n;
  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    base = (base * base) % modulus;
    exponent /= 2n;
  }
  return result;
}

export default isPrime