const express = require("express");
const { userChat, fetchUserChat, deleteChat } = require("../controllers/userChat");
const verifyAuth = require("../middleware/verifyAuth");

const router = express.Router();

router.use(verifyAuth);

router.post("/", userChat);
router.get("/", fetchUserChat);
router.delete('/:chatId', deleteChat)

module.exports = router;
