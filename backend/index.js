const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

// Load models once (fixed: removed duplicates)
require("./model/Store");
require("./model/User");
require("./model/Category");
require("./model/Product");
require("./model/Supplier");
require("./model/Purchase");
require("./model/PurchaseItem");
require("./model/Sale");
require("./model/SaleItem");

// Load routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const storeRoutes = require("./routes/storeRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes"); // fixed: was missing entirely
const purchaseItemRoutes = require("./routes/purchaseItemRoutes");
const salesRoutes = require("./routes/salesRouter");
const saleItemRoutes = require("./routes/saleItemRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost:27017/inv_system")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection failed:", err));

// Base route
app.get("/", (req, res) => {
  res.json({ message: "MeroByapar API is running!" });
});

// Register all routes under /api
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", storeRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", supplierRoutes);
app.use("/api", purchaseRoutes);       // fixed: added missing purchase routes
app.use("/api", purchaseItemRoutes);
app.use("/api", salesRoutes);
app.use("/api", saleItemRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
