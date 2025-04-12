const mongoose = require("mongoose");

const educationSchema = mongoose.Schema(
  {
    universityName: {
      type: String,
    },
    degree: {
      type: String,
    },
    major: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationSchema);

module.exports = Education;
