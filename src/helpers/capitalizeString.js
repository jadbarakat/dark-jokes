export const capitalizeString = (string) => {
  const array = string.split(" ");
  const finalArray = [];

  const capitalizeOneString = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  for (i = 0; i < array.length; i++) {
    finalArray.push(capitalizeOneString(array[i]));
  }

  return finalArray.join(" ");
};
