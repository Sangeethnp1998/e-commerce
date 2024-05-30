import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./componants/navigation/Navbar";
import ProtectedRoute from "./componants/navigation/ProtectedRoute";
import { Home } from "./pages/Home";
import PlaceOrder from "./pages/PlaceOrder";
import ProductList from "./pages/ProductList";
import { restoreUser } from "./store/auth";
import { restoreCart } from "./store/cart";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
    dispatch(restoreCart());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <PlaceOrder />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
