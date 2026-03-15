const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

require("./model/Store"); // पहिले Store
require("./model/Category"); // अनि Category
require("./model/Product"); // बाँकी models
require("./model/User");
require("./model/Supplier");
require("./model/Product");
require("./model/PurchaseItem");
require('./model/SaleItem');
require('./model/Sale');
require('./model/Store');

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
// const userRoutes = require('./routes/userRoutes')
const productRoutes = require("./routes/productRoutes");
const purchaseItem = require("./routes/purchaseItemRoutes");
const saleItem = require('./routes/saleItemRoutes');
const sale = require('./routes/salesRouter');
const store = require('./routes/storeRoutes');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL || "mongodb://localhost:27017/inv_system")
  .then(() => {
    console.log("mongodb chai connect vayo haita");
  })

  .catch((err) => {
    console.log("Database chai connect vayena", err);
  });

app.get("/", (req, res) => {
  res.json({
    message: "SERVER CHAI CHALNA THALYO HAITA ",
  });
});

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", supplierRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", purchaseItem);
app.use('/api', saleItem);
app.use('/api', sale);
app.use('/api', store);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
