import './App.css';
import Login from './components/auth/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './components/product/Products';
import Layout from './components/Layout';
import NoPage from './components/Nopage';
import Newproduct from './components/product/Newproduct';
import Newsale from "./components/sale/Newsale"
import Sales from './components/sale/Sales';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Layout />}>
          <Route path="products" element={<Products />} />
          <Route path="sales" element={<Sales />} />
          <Route path="newproduct" element={<Newproduct />} />
          <Route path="newsale" element={<Newsale />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
