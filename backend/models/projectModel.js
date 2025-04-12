const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required : true
    },
    subTitle: {
      type: String,
    },

    startDate: {
      type: Date,
      required : true
    },
    endDate: {
      type: Date,
      required : true
    },
    
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
