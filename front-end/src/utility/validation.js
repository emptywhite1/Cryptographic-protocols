import {isPrime, isPrimitiveRoot} from "./Math-utils";

/* global BigInt */
function isNumber(input) {
  const regex = /^\d+$/;
  return regex.test(input);
}

export const DHValidation = (e) => {
  e.preventDefault();

  const pInput = document.getElementById("Prime-Number-p");
  const gInput = document.getElementById("Generator-g");
  const privateKeyInput = document.getElementById("Private-key");

  // Check if all input fields are filled
  if (!pInput.value || !gInput.value || !privateKeyInput.value) {
    alert("Please fill in all input fields.");
    return false;
  }
  if (!isNumber(pInput.value) || !isNumber(gInput.value) || !isNumber(privateKeyInput.value)) {
    alert("All input fields must be numbers!");
    return;
  }
  

  const p = BigInt(pInput.value);
  const g = BigInt(gInput.value);
  const privateKey = BigInt(privateKeyInput.value);

  // Check if p is a prime number
  if (!isPrime(p)) {
    alert("The prime number P must be a prime number.");
    return false;
  }

  /// Check if g is a primitive root modulo p
  if (!isPrimitiveRoot(g, p)) {
    alert("G must be a primitive root modulo P!");
    return false
  }

  // Check if private key is bigger than 1 and smaller than p
  if (privateKey <= 1 || privateKey >= p) {
    alert("The private key must be bigger than 1 and smaller than P.");
    return false;
  }

  return true;
}
 
export const SchnorrValidation = (e) => {
  e.preventDefault();

  const pInput = document.getElementById("username");
  const password = document.getElementById("password");
 

  // Check if all input fields are filled
  if (!pInput.value || !password.value) {
    alert("Please fill in all input fields.");
    return false;
  }
  

  return true;
}




