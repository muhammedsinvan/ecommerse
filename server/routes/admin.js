import express from "express";
const router = express.Router();
import {
  signin,
  userlist,
  addproduct,
  getallproduct,
  deleteproduct,
  productdata,
  addcatagory,
  getcatagory,
  deletecatagory,
  catagorydata,
  updatecatagory,
  addbanner,
  getallbanner,
  deletebaner,
  getbannerdata,
  updatebanner,
  updateproduct,
  getallorder,
  getoneorder,
  updateorderstatus
} from "../helpers/admin/admin.js";
import { protect } from "../helpers/admin/authadmin.js";

router.post("/signin", signin);

router.get("/userlist", protect, userlist);

router.post("/addproduct", addproduct);

router.get("/getallproduct", protect, getallproduct);

router.post("/deleteproduct/:id", deleteproduct);

router.get("/productdata/:id", productdata);

router.post("/addcatagory", addcatagory);

router.get("/getcatagory", protect, getcatagory);

router.post("/deletecatagory/:id", deletecatagory);

router.get("/catagorydata/:id", catagorydata);

router.post("/updatecatagory/:id", updatecatagory);

router.post("/addbanner", addbanner);

router.get("/getallbanner", protect, getallbanner);

router.post("/deletebaner/:id", deletebaner);

router.get("/getbannerdata/:id", protect, getbannerdata);

router.post("/updatebanner/:id", updatebanner);

router.post("/updateproduct/:id", updateproduct);

router.get("/getallorder", protect ,getallorder);

router.get("/getoneorder/:orderid",protect,getoneorder);

router.post("/updateorderstatus/:orderid",updateorderstatus);

export default router;
