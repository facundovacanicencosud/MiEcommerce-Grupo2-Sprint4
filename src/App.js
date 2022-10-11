import "./App.css";
import { Route, BrowserRouter, Routes, useParams, } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductsList from "./pages/Products/ProductsList/ProductsList";
import UsersList from "./pages/Users/UsersList/UsersList";
import ProductView from "./pages/Products/ProductView/ProductView";
import NewProductView from "./pages/Products/ProductView/NewProductView";
import Error from "./pages/Error/Error";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/products/:id" element={<ProductView />} />
            <Route path="/products/new" element={<NewProductView />} />
            <Route path="/*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
