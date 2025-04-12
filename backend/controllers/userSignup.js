
const User = require("../models/userModel");

const userSignup = async (req, res) => {
  const { resumeId, email, fullName, phone } = req.body;

  try {
    const isUserExist = await User.findOne({ email });
    let user
    if (!isUserExist) {
      user = await User.create({ clerkId : resumeId, phone, email, fullName });
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = userSignup;
