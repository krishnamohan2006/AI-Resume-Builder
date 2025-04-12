const User = require("../models/userModel");
// const Message = require("../models/messageModel");
// const Chat = require("../models/chatModel");

const fetchUser = async (req, res) => {
  const { _id } = req.user;
  const query = req.body.text;
  try {
    const userList = await User.find({
      $and: [
        { _id: { $ne: _id } },
        {
          $or: [
            { email: { $regex: query, $options: "i" } },
            { name: { $regex: query, $options: "i" } },
          ],
        },
      ],
    });

    if (userList.length > 0) {
      res.status(200).json(userList);
    } else {
      res.status(200).json({ message: "No matching user found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// controller for deleting user

const updateUser = async (req, res) => {
  const { password, confirmPassword, newName, newEmail } = req.body;
  const { id } = req.params;
  // Check if password and confirm password match
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password and confirm password do not match" });
  }

  try {
    // Find the user by ID
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If new name is provided, update the name
    if (newName) {
      user.name = newName;
    }

    // If new email is provided, validate it and update the email
    if (newEmail) {
      if (!validator.isEmail(newEmail)) {
        return res.status(400).json({ message: "New email is not valid" });
      }
      user.email = newEmail;
    }

    // If a new password is provided, hash and update the password
    if (password) {
      const SALT = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, SALT);
      user.password = hash;
    }

    // Save the updated user
    await user.save();

    const TOKEN = createJWT(user._id);

    res.status(201).json({
      name: newName,
      email: newEmail,
      _id: user._id,
      TOKEN,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// controller for deleting user

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await User.findOneAndDelete({ _id: id });
    if (response) {
      // all chats of the user
      const chatsToDelete = await Chat.find({
        users: { $elemMatch: { $eq: id } },
      });

      // get chat IDs to be delete
      const chatIds = chatsToDelete.map((chat) => chat._id);

      //  Delete all messages within the chats
      await Message.deleteMany({ chatId: { $in: chatIds } });

      // Delete all chats of the user
      await Chat.deleteMany({
        users: { $elemMatch: { $eq: id } },
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchUser, deleteUser, updateUser };
