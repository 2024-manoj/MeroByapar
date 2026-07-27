const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    store_name: {
      type: String,
      required: [true, "store ko nam ta chainxa chainxa "],
      unique: true,
    },
    store_owner: {
      type: String,
      required: [true, "malik ko name ta chaiyo nih"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    phone: {
      type: String,
      required: [true, "phone number ta chaiyonta "],
    },

    address:{
      type: String,
      required: true 
    },

    subscription: {
      status: {
        type: String,
        enum: ["active", "inactive", "trial"],
        default: "trial",
      },
      expiryDate: Date,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Store", storeSchema);
