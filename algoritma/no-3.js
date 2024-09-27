/*
Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT
Contoh:
INPUT = ['xc', 'dz', 'bbb', 'dz']
QUERY = ['bbb', 'ac', 'dz']
OUTPUT = [1, 0, 2] karena kata 'bbb' terdapat 1 pada INPUT, kata 'ac' tidak ada pada INPUT, dan kata 'dz' terdapat 2 pada INPUT
 */

const countQuery = (inputArray, queryArray) => {
  return queryArray.map((query) => {
    return inputArray.filter((item) => item === query).length;
  });
};

const inputArray = ["xc", "dz", "bbb", "dz"];
const queryArray = ["bbb", "ac", "dz"];
const queryResult = countQuery(inputArray, queryArray);
console.log("Output :", queryResult);
