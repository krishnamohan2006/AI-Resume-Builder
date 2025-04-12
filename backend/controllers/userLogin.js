const createJWT = require("../createJWT");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const userLogin = async (req, res) => {
  const { password, email } = req.body;
  console.log('hitting here')
  if (!(email && password)) {
    return res.status(500).json({ mssg: "All fields must be filled" });
  }
  try {
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      return res.status(500).json({ message: "User does not exist" });
    }
    const match = await bcrypt.compare(password, isUserExist.password);
    if (!match) {
      return res.status(500).json({ message: "Incorrect password" });
    }
    if (match) {
      const TOKEN = createJWT(isUserExist._id);
      return res.status(200).json({ name: isUserExist?.name,email:isUserExist?.email,_id: isUserExist?._id, TOKEN });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = userLogin;
