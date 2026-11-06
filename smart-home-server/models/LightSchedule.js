const mongoose = require("mongoose");

const lightScheduleSchema = new mongoose.Schema(
  {
    enabled: {
      type: Boolean,
      required: true,
      default: false,
    },
    time: {
      type: String,
      required: true,
      default: "18:00",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LightSchedule", lightScheduleSchema);

