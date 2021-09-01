const jwt=require('jsonwebtoken')
const generateAccessToken = (user) => {
  return jwt.sign(
    user,
    "0b0bdf2d0247c3cf49542927d8290cf5db5a3681d6e794ea14d6fd8db5e865e908ef09cb7da3582ecd312163cd778c75d5f482ae13d77854c20143cec75c9c0d",
    { expiresIn: "6h" }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    user,
    "7a105f5d18db50536d66f6d012629be36bcfd78899128c3b944ca7eda412724de5df704d4561bbd051281144ae9a81b6733974cbfa5a1d655529a0fff006d9b0"
  );
};
module.exports = { generateAccessToken, generateRefreshToken };
