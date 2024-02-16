import express from "express";
const router = express.Router();
import {
  signupdata,
  signindata,
  getonecatagory,
  getcatagoryproduct,
  getproductdetail,
  addtocart,
  getcartitem,
  getsortedproduct,
  removecartitem,
  updatecartqty,
  lesscartqty,
  addshippingaddress,
  getshippingaddress,
  removeaddress,
  userdata,
  updateprofile,
  getuseraddres,
  editshippingaddress,
  confirmorder,
  checktoken,
  getorders,
  orderdetail,
  checkmail,
  newpassword
} from "../helpers/user/user.js";
import { getallbanner, getcatagory } from "../helpers/admin/admin.js";
import { protect } from "../helpers/admin/authadmin.js";

router.post("/signup", signupdata);

router.post("/signin", signindata);

router.get("/getbanner", getallbanner);

router.get("/getcatagory", getcatagory);

router.get("/getonecatagory/:type",getonecatagory)

router.get("/getcatagoryproducts/:item", getcatagoryproduct);

router.get("/getproductdetail/:id", getproductdetail);

router.post("/addtocart/:userid/:qty", addtocart);

router.get("/getcartitem/:userid", protect, getcartitem);

router.get("/getsortedproduct", getsortedproduct);

router.post("/removecartitem/:userid", removecartitem);

router.post("/updatecartqty/:userid", updatecartqty);

router.post("/lesscartqty/:userid", lesscartqty);

router.post("/addshippingaddress/:userid", addshippingaddress);

router.post("/editshippingaddress/:userid/:addressid", editshippingaddress);

router.get("/getshippingaddress/:userid", protect, getshippingaddress);

router.post("/removeaddress/:userid", removeaddress);

router.get("/userdata/:userid", protect, userdata);

router.post("/updateprofile/:userid", updateprofile);

router.get("/getuseraddres/:userid/:addressid", protect, getuseraddres);

router.post("/paymentsuccess/confirmorder",confirmorder);

router.get("/checktoken", protect, checktoken);

router.get("/getorders/:userid",protect,getorders)

router.get("/order/detail/:orderid",protect,orderdetail)

router.post("/checkmail",checkmail)

router.post("/newpassword/:id/:token",newpassword)


export default router;
