import './App.css';
import { Route, BrowserRouter, Routes} from "react-router-dom";
import Home from './pages/Home/Home';
import ProductsList from './pages/Products/ProductsList/ProductsList';
import ProductView from './pages/Products/ProductView/ProductView';
import Navbar from './components/Navbar/Navbar';
import Error from './pages/Error/Error';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<ProductsList />} />
          <Route path='/products/:id' element={<ProductView />} />
          <Route path='/products/new' element={<ProductView />} />
          <Route path='/*' element={<Error />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
