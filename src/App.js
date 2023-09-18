import './App.scss';
import { Routes, Route} from 'react-router-dom';

// ---Toaster---
import {Toaster} from 'react-hot-toast'
// ------------------

//Components
import Header from './Header/Header';

// pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Menu from './pages/Menu/Menu'
import Cart from './pages/Cart/Cart'
import Signup from './pages/Signup/Signup'
import Login  from './pages/Login/Login';
 
function App() {
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
          <Route exact path="/Cart" element={<Cart/>} />
          <Route exact path="/Signup" element={<Signup/>}/>
          <Route exact path="/Login" element={<Login/>}/>
        </Routes>
      {/* </BrowserRouter> */}
      </div>
    </div>
  );
}

export default App;
