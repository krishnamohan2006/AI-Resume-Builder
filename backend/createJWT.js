const jwt = require("jsonwebtoken");

const createJWT = (_id) => {
  return jwt.sign({_id, expiresIn: "3d"}, process.env.SECRET);
};

module.exports = createJWT;
