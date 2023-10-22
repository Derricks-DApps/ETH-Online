const calculateCheckDigit = (barcodeNumber) => {
  //separate the digits into two groups, odd and even
  const oddDigits = [];
  const evenDigits = [];
  for (let i = 0; i < barcodeNumber.length; i++) {
    if (i % 2 === 0) {
      oddDigits.push(barcodeNumber[i]);
    } else {
      evenDigits.push(barcodeNumber[i]);
    }
  }

  // convert all charcters to numbers
  const oddDigitsAsNumbers = oddDigits.map(Number);
  const evenDigitsAsNumbers = evenDigits.map(Number);

  // add all odd digits
  const oddSum = oddDigitsAsNumbers.reduce((a, b) => a + b, 0);
  // multiply by three
  const oddSumTripled = oddSum * 3;

  // add all even digits
  const evenSum = evenDigitsAsNumbers.reduce((a, b) => a + b, 0);

  // add oddSumTripled and evenSum
  const totalSum = oddSumTripled + evenSum;
  console.log("Total sum: ", totalSum);
  // calculate smallest number needed to round result up to the nearest 10
  const nextTen = (10 - (totalSum % 10)) % 10;
  console.log("Next ten: ", nextTen);
  // return nextTen;
  return Functions.encodeUint256(nextTen);
};
