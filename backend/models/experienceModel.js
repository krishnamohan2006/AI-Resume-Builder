const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      // required : true
    },
    companyName: {
      type: String,
      // required : true
    },
    city: {
      type: String,
      // required : true
    },
    startDate: {
      type: Date,
      // required : true
    },
    endDate: {
      type: Date,
      // required : true
    },
    state: {
      type: String,
      // required : true
    },
    workSummery: {
      type: String,
    },
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;
