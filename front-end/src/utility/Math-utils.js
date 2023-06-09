/* global BigInt */

import CryptoJS from 'crypto-js';

// Javascript program Miller-Rabin primality test
// based on JavaScript code found at https://www.geeksforgeeks.org/primality-test-set-3-miller-rabin/

// Utility function to do
// modular exponentiation.
// It returns (x^y) % p
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

// This function is called
// for all k trials. It returns
// false if n is composite and
// returns false if n is
// probably prime. d is an odd
// number such that d*2<sup>r</sup> = n-1
// for some r >= 1
function miillerTest(d, n) {
  // (JML- all literal integers converted to use n suffix denoting BigInt)

  // Pick a random number in [2..n-2]
  // Corner cases make sure that n > 4
  /* 
        JML- I can't mix the Number returned by Math.random with
        operations involving BigInt. The workaround is to create a random integer 
        with precision 6 and convert it to a BigInt.
    */
  const r = BigInt(Math.floor(Math.random() * 100_000));
  // JML- now I have to divide by the multiplier used above (BigInt version)
  const y = (r * (n - 2n)) / 100_000n;
  let a = 2n + (y % (n - 4n));

  // Compute a^d % n
  let x = power(a, d, n);

  if (x == 1n || x == n - 1n) return true;

  // Keep squaring x while one
  // of the following doesn't
  // happen
  // (i) d does not reach n-1
  // (ii) (x^2) % n is not 1
  // (iii) (x^2) % n is not n-1
  while (d != n - 1n) {
    x = (x * x) % n;
    d *= 2n;

    if (x == 1n) return false;
    if (x == n - 1n) return true;
  }

  // Return composite
  return false;
}

// It returns false if n is
// composite and returns true if n
// is probably prime. k is an
// input parameter that determines
// accuracy level. Higher value of
// k indicates more accuracy.
export const isPrime = function (n, k = 40) {
  // (JML- all literal integers converted to use n suffix denoting BigInt)
  // Corner cases
  if (n <= 1n || n == 4n) return false;
  if (n <= 3n) return true;

  // Find r such that n =
  // 2^d * r + 1 for some r >= 1
  let d = n - 1n;
  while (d % 2n == 0n) d /= 2n;

  // Iterate given nber of 'k' times
  for (let i = 0; i < k; i++) if (!miillerTest(d, n)) return false;

  return true;
};

function getFactors(n) {
  let factors = [];
  for (let i = 2n; i <= n; i++) {
    while (n % i == 0n) {
      factors.push(i);
      n = n / i;
    }
  }
  return factors;
}

export const isPrimitiveRoot = function (g, p) {
  let totient = p - 1n;
  let factors = getFactors(totient);

  for (let i = 0; i < factors.length; i++) {
    let factor = factors[i];
    if (power(g, totient / factor, p) == 1n) {
      return false;
    }
  }
  return true;
};

export const computeDHKey = function (prime, generator, privateKey) {
  const p = BigInt(prime);
  const g = BigInt(generator);
  const a = BigInt(privateKey);
  let A = power(g, a, p);

  return A;
};

export const stringToBigInt = function (str, p) {
  const hash = CryptoJS.SHA256(str).toString();
  const num = BigInt(`0x${hash}`);
  return num % p;
};

export const computeSchnorrKey = function (prime, generator, password) {
  const x = BigInt(stringToBigInt(password, prime));
  const p = BigInt(prime);
  const g = BigInt(generator);

  return power(g, x, p);
};

export const getRandomBigInt = function (maxNum) {
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
export const computeSchnorrAnnouncement = function (prime, generator, nonce) {
  const u = BigInt(nonce);
  const p = BigInt(prime);
  const g = BigInt(generator);
  return power(g, u, p);
};

export const computeSchnorrResponse = function (
  nonce,
  password,
  challenge,
  prime
) {
  const u = BigInt(nonce);
  const q = BigInt(prime) - BigInt(1);
  const x = stringToBigInt(password, prime);
  const c = BigInt(challenge);

  return (u + c * x) % q;
};

export const checkGCD = function (a, b) {
  const gcd = (a, b) => {
    if (b === 0n) {
      return a;
    }
    return gcd(b, a % b);
  };
  return gcd(a, b) === 1n;
};

export const getR = function (chaumN) {
  let r;
  do {
    r = getRandomBigInt(chaumN);
  } while (!checkGCD(r, chaumN));
  return r;
};

export const getBlindFactor = function (r, chaumN, publicKey) {
  const blindFactor = power(r, publicKey, chaumN);
  return blindFactor;
};

export const computeBlindedMessage = function (
  numericMessage,
  blindFactor,
  chaumN
) {
  return (numericMessage * blindFactor) % chaumN;
};

export const unblindSignature = function (blindedSignature, r, chaumN) {
  const rInverse = modInverse(r, chaumN);
  const bSignature = BigInt(blindedSignature);
  return (bSignature * rInverse) % chaumN;
};
export const modInverse = function (number, mod) {
  const a = number;
  const n = mod;
  let t = 0n;
  let newt = 1n;
  let r = n;
  let newr = a;

  while (newr !== 0n) {
    let quotient = r / newr;

    [t, newt] = [newt, t - quotient * newt];
    [r, newr] = [newr, r - quotient * newr];
  }

  if (r > 1n) {
    throw new Error("a is not invertible");
  }

  if (t < 0n) {
    t += n;
  }

  return t;
};

