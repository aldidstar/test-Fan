function WordCount(str) {
  const specialChars = /^[a-z\-A-Z]+[.,?]?$/;
  const split = str.split(" ");
  const array = [];
  for (let index = 0; index < split.length; index++) {
    if (specialChars.test(split[index]) === true) array.push(split[index]);
  }
  const totalString = array.length;
  return totalString;
}

module.exports = {
  WordCount,
};
