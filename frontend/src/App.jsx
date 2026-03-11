import { BrowserRouter, Routes, Route } from "react-router-dom";

import Category from "./pages/Category";
import Product from "./pages/Product";
import Purchase from "./pages/Purchase";
import PurchaseItem from "./pages/Purchase_item";
import Sale from "./pages/Sale";
import SaleItems from "./pages/Sale_items";
import Store from "./pages/Store";
import Supplier from "./pages/Supplier";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/purchase-item" element={<PurchaseItem />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/sale-item" element={<SaleItems />} />
          <Route path="/store" element={<Store />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;