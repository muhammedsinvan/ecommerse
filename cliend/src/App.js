import Home from "./pages/Home";
import {Route,Routes} from 'react-router-dom'
import Productlist from "./pages/Productlist";
import Productdetail from "./pages/Productdetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Shipping from "./pages/Shipping";
import AdminLogin from "./pages/admin/Login";
import AdminHome from "./pages/admin/Home";
import Usermng from "./pages/admin/Usermng";
import Addproduct from "./pages/admin/Addproduct";
import Showproduct from "./pages/admin/Showproduct";
import Addbannermng  from "./pages/admin/Addbannermng";
import Showbannermng from "./pages/admin/Showbannermng";
import Addcatagorymng from "./pages/admin/Addcatagorymng";
import Showcatagorymng from "./pages/admin/Showcatagorymng";
import Ordermng from "./pages/admin/Ordermng";
import Orderdetail from "./pages/admin/Orderdetail";
import Profile from "./pages/Profile";
import Editprofile from "./pages/Editprofile";
import Orders from "./pages/Orders";
import Address from "./pages/Address";
import Orderdetails from "./pages/Orderdetail";
import AddEditaddress from "./pages/AddEditaddress";
import Addshippingaddress from "./pages/Addshippingaddress";
import Otp from "./pages/Otp";
import Editproduct from "./pages/admin/Editproduct";
import Notfound from "./component/notfound/Notfound";
import CheckoutDetail from "./pages/CheckoutDetail";
import CheckoutSuccess from "./pages/checkoutSuccess";



function App() {

 


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:item" element={<Productlist />} />
        <Route path="/productdetail/:id" element={<Productdetail />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/signup" element={<Registration/>}/>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/accounts/profile" element={<Profile />} />
        <Route path="/accounts/profile/editprofile/:data" element={<Editprofile />} />
        <Route path="/accounts/orders" element={<Orders />} />
        <Route path="/accounts/address" element={<Address />} />
        <Route path="/accounts/order/detail/:id" element={<Orderdetails />} />
        <Route path="/accounts/address/add" element={<AddEditaddress />} />
        <Route path="/accounts/address/add/:addressid" element={<AddEditaddress />} />
        <Route path="/shipping/address/add" element={<Addshippingaddress />} />
        <Route path="/shipping/address/edit/:addressid" element={<Addshippingaddress />} />
        <Route path="/signup/otp" element={<Otp/>} />
        <Route path="/shipping/checkout" element={<CheckoutDetail/>} />
        <Route path="/shipping/checkout/:addressid" element={<CheckoutDetail/>} />
        <Route path="/shipping/checkout/sucsess" element={<CheckoutSuccess/>} />
      
        <Route path="/admin/home" element={<AdminHome/>} />
        <Route path="/admin/usermanagment" element={<Usermng/>} />
        <Route path="/admin/addproduct" element={<Addproduct/>} />
        <Route path="/admin/editproduct/:id" element={<Editproduct/>} />
        <Route path="/admin/showproduct" element={<Showproduct/>} />
        <Route path="/admin/addbanner" element={<Addbannermng />} />
        <Route path="/admin/showbanner" element={<Showbannermng />} />
        <Route path="/admin/editbanner/:id" element={<Addbannermng />} />
        <Route path="/admin/addcatagory" element={<Addcatagorymng />} />
        <Route path="/admin/editcatagory/:id" element={<Addcatagorymng />} />
        <Route path="/admin/showcatagory" element={<Showcatagorymng />} />
        <Route path="/admin/orders" element={<Ordermng />} />
        <Route path="/admin/orders/orderdetail/:orderid" element={<Orderdetail />} />
      
        <Route path="/admin" element={<AdminLogin/>} />

       
        <Route path='*' element={<Notfound/>}/>

      </Routes>
      
    </div>
  );
}

export default App;
