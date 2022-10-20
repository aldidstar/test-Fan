function PairsCount(arrayInput) {
  let lastInputs = 0;
  let count = 0;

  arrayInput.sort(function (a, b) {
    return a - b;
  });

  arrayInput.forEach((input) => {
    if (lastInputs == input) {
      count++;
      lastInputs = 0;
    } else {
      lastInputs = input;
    }
  });

  return count;
}

module.exports = {
  PairsCount,
};
