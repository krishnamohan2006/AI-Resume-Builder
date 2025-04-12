const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required : true
    },
    clerkId: {
      type: String,
      required : true
    },
    fullName: {
      type: String,
      required : true
    },
    phone: {
      type: String,
      required : true
    },
    
    password: {
      type: String,
    },
    address: {
      type: String,
    },
    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume",
      },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
