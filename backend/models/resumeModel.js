const mongoose = require("mongoose");

const resumeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
    },
    email: {
      type: String, // Removed the `unique: true` constraint
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    resumeId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
    },
    summery: {
      type: String,
    },
    education: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Education",
      },
    ],
    skill: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    experience: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Experience",
      }
    ],
    // project: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Project",
    // },]
  },
  { timestamps: true } // Corrected to `timestamps` instead of `timeStamps`
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
