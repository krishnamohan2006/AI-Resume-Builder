const { default: mongoose } = require("mongoose");
const Chat = require("../models/chatModel");

const fetchUserChat = async (req, res) => {
  const { _id } = req.user;
  try {
    const chatList = await Chat.find({
      users: { $elemMatch: { $eq: _id } },
    }).populate("users", "-password");

    if (chatList.length > 0) {
      res.status(200).json(chatList);
    } else {
      res.status(200).json({ message: "Chat is not available" });
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
};

const userChat = async (req, res) => {
  const { friendId } = req.body;
  const { _id } = req.user;
  const id2 = new mongoose.Types.ObjectId(friendId);

  try {
    const isChat = await Chat.find({
      $and: [
        { users: { $elemMatch: { $eq: _id } } },
        { users: { $elemMatch: { $eq: id2 } } },
      ],
    }).populate("users", "-password");

    if (!(isChat.length > 0)) {
      const newChat = await Chat.create({ users: [_id, id2] });
      const response = await Chat.findById(newChat._id).populate("users", "-password");
      res.status(200).json(response);
    } else {
      res.status(200).json(isChat);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteChat = async (req, res) => {
  const { chatId } = req.params;
  try {
    const response = await Chat.deleteOne({ _id: chatId });
    // if (response) {
    //   await Message.deleteMany({ chatId });
    // }
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { userChat, fetchUserChat, deleteChat };
