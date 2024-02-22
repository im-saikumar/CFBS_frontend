export const userDetails = JSON.parse(localStorage.getItem("userDetails"));

console.log(userDetails);
export const loginDetails = {
  login: userDetails ? userDetails.login : false,
};

export const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
