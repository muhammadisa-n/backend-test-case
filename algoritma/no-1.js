const reverseString = (input) => {
  const stringPart = input.match(/[a-zA-Z]+/g)[0];
  const numberPart = input.match(/\d+/g)[0];
  const reverse = stringPart.split("").reverse().join("");

  return reverse + numberPart;
};

const inputString = "NEGIE1";
const reversedResult = reverseString(inputString);
console.log(`Output: ${reversedResult}`);
