/*
Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu
Contoh:
const sentence = "Saya sangat senang mengerjakan soal algoritma"
longest(sentence)
// mengerjakan: 11 character
*/
const longest = (sentence) => {
  const words = sentence.split(" ");
  let longest = "";
  for (let word of words) {
    if (word.length > longest.length) {
      longest = word;
    }
  }
  return `${longest}: ${longest.length} character`;
};

const sentence = "Saya sangat senang mengerjakan soal algoritma";
const longestResult = longest(sentence);
console.log(`Output: ${longestResult}`);
