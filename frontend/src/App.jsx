import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home/home.jsx';
import Login from './components/Login/login.jsx';
import Register from './components/Register/register.jsx';
import UserHome from './pages/user/UserHome/UserHome.jsx';
import Books from './pages/user/Books/Books.jsx'
import BookDetails from './pages/user/BookDetails/BookDetails.jsx';
import WishList from './pages/user/WishList/WishList.jsx';
import Cart from './pages/user/Cart/Cart.jsx';
import Orders from './pages/user/Order/Orders.jsx';
import Profile from './pages/user/Profile/Profile.jsx'

import SellerHome from './pages/seller/SellerHome/SellerHome.jsx';
import SellerBooks from './pages/seller/SellerBooks/SellerBooks.jsx';
import Addbook from './pages/seller/AddBook/AddBook.jsx';
import SellerOrders from './pages/seller/SellerOrder/SellerOrder.jsx';

import AdminHome from './pages/admin/AdminHome/AdminHome.jsx';
import AdminUsers from './pages/admin/AdminUsers/AdminUsers.jsx';
import AdminOrders from './pages/admin/AdminOrders/AdminOrders.jsx';
import AdminBooks from './pages/admin/AdminBooks/AdminBooks.jsx'

import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';

import './App.css';

const App = () => {
  return (
    <div className="bg-container">
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
          </Route>

          <Route element = {<ProtectedRoute allowedRole="user"/>}>
            <Route path="/user/home" element={<UserHome />} />
            <Route path="/user/books" element={<Books />} />
            <Route path="/user/cart" element={<Cart />} />
            <Route path="/user/books/:id" element={<BookDetails/>}/>
            <Route path="/user/wishlist" element={<WishList/>} />
            <Route path="/user/orders" element={<Orders/>} />
            <Route path="/user/profile" element={<Profile/>} />
          </Route>


          <Route element = {<ProtectedRoute allowedRole="seller"/>}>
            <Route path="/seller/home" element={<SellerHome/>}/>
            <Route path="/seller/books" element={<SellerBooks />}/>
            <Route path="/seller/add-book" element={<Addbook />}/>
            <Route path="/seller/orders" element={<SellerOrders />}/>
          </Route>

          <Route element = { <ProtectedRoute allowedRole="admin"/>}>
            <Route path="/admin/home" element={<AdminHome />}/>
            <Route path="/admin/users" element={<AdminUsers/>} />
            <Route path="/admin/orders" element={<AdminOrders/>}/>
            <Route path="/admin/books" element={<AdminBooks />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;