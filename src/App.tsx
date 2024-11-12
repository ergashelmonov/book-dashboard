import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { Home, Login, Notification, Order, Product } from "./pages";
import { useEffect } from "react";
import { Layout } from "./components";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    localStorage.getItem("dtoken")
      ? navigate(pathname == "/login" ? "/" : { pathname })
      : navigate("/login");
  }, [localStorage.getItem("dtoken")]);

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/products" element={<Product />} />
          <Route path="/notification" element={<Notification />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
