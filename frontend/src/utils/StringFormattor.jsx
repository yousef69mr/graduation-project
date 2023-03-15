export const avatarFormater = (username) => {
  let arr = username.split(" ", 2);
  let shortUsername = arr.map((value, index, array) =>
    value.charAt(0).toUpperCase()
  );
  return shortUsername;
};

export const capitalizeString = (str) => {
  let arr = str.split(" ");
  // alert(arr);
  let capitalizedStr = arr.map(
    (value, index, array) =>
      value.charAt(0).toUpperCase() + value.slice(1) + " "
  );
  // alert(capitalizedStr);
  return capitalizedStr.join(" ");
};
