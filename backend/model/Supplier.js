const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    supplier_name: {
      type: String,
      required: [true, "product ko name halnei parxa"],
      trim: true,
    },
    supplier_phone: {
      type: String,
      required: [true, "contact ta garnu paro holanta "],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "address ta chaiyo nih"],
    },

    email: {
      type: String,
      unique: true,
    },

    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Supplier", supplierSchema);
