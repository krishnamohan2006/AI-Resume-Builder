const mongoose = require("mongoose");

const skillSchema = mongoose.Schema(
    {
        skill: {
            type: String,
        },
        rating: {
            type: Number,
        },
    },

    { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
