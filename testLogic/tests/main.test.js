const { PairsCount } = require("../sock");
const { WordCount } = require("../word");

describe("1. Hitunglah jumlah pasang kaos kaki yang dapat dijual oleh sales", () => {
  test("1.X Example", (done) => {
    const inputs = [5, 7, 7, 9, 10, 4, 5, 10, 6, 5];
    const expectedOutput = 3;

    const pairs = PairsCount(inputs);
    if (pairs == expectedOutput) {
      done();
    } else {
      done(pairs);
    }
  });
  test("1.A Test", (done) => {
    const inputs = [10, 20, 20, 10, 10, 30, 50, 10, 20];
    const expectedOutput = 3;

    const pairs = PairsCount(inputs);
    if (pairs == expectedOutput) {
      done();
    } else {
      done(pairs);
    }
  });
  test("1.B Test", (done) => {
    const inputs = [6, 5, 2, 3, 5, 2, 2, 1, 1, 5, 1, 3, 3, 3, 5];
    const expectedOutput = 6;

    const pairs = PairsCount(inputs);
    if (pairs == expectedOutput) {
      done();
    } else {
      done(pairs);
    }
  });
  test("1.C Test", (done) => {
    const inputs = [1, 1, 3, 1, 2, 1, 3, 3, 3, 3];
    const expectedOutput = 4;

    const pairs = PairsCount(inputs);
    if (pairs == expectedOutput) {
      done();
    } else {
      done(pairs);
    }
  });
});

describe("2. Hitunglah jumlah kata pada sebuah kalimat", () => {
  test("2.X Example", (done) => {
    const str = "Kemarin Shopia per[gi ke mall.";
    const expectedOutput = 4;

    const words = WordCount(str);
    if (words == expectedOutput) {
      done();
    } else {
      done(words);
    }
  });
  test("2.A Test", (done) => {
    const str = "Saat meng*ecat tembok, Agung dib_antu oleh Raihan.";
    const expectedOutput = 5;

    const words = WordCount(str);
    if (words == expectedOutput) {
      done();
    } else {
      done(words);
    }
  });
  test("2.B Test", (done) => {
    const str = "Berapa u(mur minimal[ untuk !mengurus ktp?";
    const expectedOutput = 3;

    const words = WordCount(str);
    if (words == expectedOutput) {
      done();
    } else {
      done(words);
    }
  });
  test("2.C Test", (done) => {
    const str = "Masing-masing anak mendap(atkan uang jajan ya=ng be&rbeda.";
    const expectedOutput = 4;

    const words = WordCount(str);
    if (words == expectedOutput) {
      done();
    } else {
      done(words);
    }
  });
});
