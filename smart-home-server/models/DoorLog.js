const mongoose = require("mongoose");

const doorLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    userName: {
      type: String,
      required: true,
      default: "Usuário Desconhecido",
    },
    action: {
      type: String,
      enum: ["OPEN", "CLOSE"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DoorLog", doorLogSchema);

