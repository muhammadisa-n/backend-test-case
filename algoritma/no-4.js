/*
Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN Contoh:
Contoh:

Matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]

diagonal pertama = 1 + 5 + 9 = 15
diagonal kedua = 0 + 5 + 7 = 12

maka hasilnya adalah 15 - 12 = 3
*/
const matrixDiagonalDifference = () => {
  const n = matrix.length;
  let firstDiagonalSum = 0;
  let secondDiagonalSum = 0;

  for (let i = 0; i < n; i++) {
    firstDiagonalSum += matrix[i][i];
    secondDiagonalSum += matrix[i][n - i - 1];
  }
  return Math.abs(firstDiagonalSum - secondDiagonalSum);
};

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];
const diagonalDifferenceResult = matrixDiagonalDifference(matrix);
console.log(`Output : ${diagonalDifferenceResult}`);
