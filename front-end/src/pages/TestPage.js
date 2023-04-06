import React, { useState } from 'react';
import {isPrime} from '../utility/Math-utils';

/* global BigInt */


function TestPage() {
  const [inputValue, setInputValue] = useState('');
  const [isPrimeValue, setIsPrimeValue] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    const inputAsBigInt = BigInt(inputValue);
    const isInputPrime = isPrime(inputAsBigInt);
    setIsPrimeValue(isInputPrime);
  };

  return (
    <div>
      <label htmlFor="primeInput">Enter a BigInt:</label>
      <input type="text" id="primeInput" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Check if Prime</button>
      {isPrimeValue && <p>{inputValue} is prime!</p>}
      {!isPrimeValue && <p>{inputValue} is not prime.</p>}
    </div>
  );
}

export default TestPage;
