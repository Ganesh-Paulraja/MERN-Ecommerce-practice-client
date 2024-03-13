import './App.scss';
import { Routes, Route} from 'react-router-dom';
import { setDataProduct } from './Redux/productSlice';
import { useDispatch } from 'react-redux';


// ---Toaster---
import {Toaster} from 'react-hot-toast'
// ------------------

//Components
import {Header} from './Header/Header';
import Footer from './Footer/Footer';
// pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Menu from './pages/Menu/Menu'
import Cart from './pages/Cart/Cart'
import Signup from './pages/Signup/Signup'
import Login  from './pages/Login/Login';
import NewProduct from './pages/NewProduct/NewProduct';
import { useEffect } from 'react';
import Product from './pages/Product/Product';
 
function App() {
  const dispatch = useDispatch();
    // const productData = useSelector((state) => state.product);
    // console.log(window.innerWidth);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
                const resData = await res.json();
                if (res.ok) {
                    dispatch(setDataProduct(resData));
                } else {
                    console.error('Failed to fetch data:', res.status);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [dispatch]);
  return (
    <div className="App">
       {/* ---Toaster--- */}
      <Toaster/>
         {/* --------- */}
      <div>
      
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/About" element={<About/>} />
          <Route exact path="/Contact" element={<Contact/>} />
          <Route exact path="/Menu" element={<Menu/>} />
          <Route exact path="/Product/:filterby" element={<Product/>} />
          <Route exact path="/Cart" element={<Cart/>} />
          <Route exact path="/Signup" element={<Signup/>}/>
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="/Newproduct" element={<NewProduct/>}/>
        </Routes>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
