import admin from "../../models/admin.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import user from "../../models/user.js";
import cloudinary from "../../utils/cloudinary.js";
import product from "../../models/addproduct.js";
import catagory from "../../models/addcatagory.js";
import banner from "../../models/addbanner.js";
import order from "../../models/orders.js";

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingadmin = await admin.findOne({ email });
    if (existingadmin) {
      const hashedPassword = CryptoJS.AES.decrypt(
        existingadmin.password,
        process.env.PASS_KEY
      );
      const orginalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (orginalpassword === password) {
        const jsontoken = jwt.sign( 
          { id: existingadmin._id },
          process.env.JWT_SEC,
          { expiresIn: "3d" }
        );
        const { password, ...others } = existingadmin._doc;
        res.status(200).json({ ...others, jsontoken });
      } else {
        res.status(400).json("Incorrect password");
      }
    } else {
      res.status(400).json("Incorrect email");
    }
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const userlist = async (req, res) => {
  try {
    const alluser = await user.find({});
    res.json(alluser);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const addproduct = async (req, res) => {
  const {
    name,
    detail,
    material,
    color,
    catagory,
    pointone,
    pointtwo,
    stock,
    image1,
    image2,
    image3,
    image4,
    wholesaleprice,
    retailprice
  } = req.body;
  const response1 = await cloudinary.uploader.upload(image1);
  const response2 = await cloudinary.uploader.upload(image2);
  const response3 = await cloudinary.uploader.upload(image3);
  const response4 = await cloudinary.uploader.upload(image4);

  try {
    const newproduct = new product({
      name,
      detail,
      material,
      color,
      catagory,
      pointone,
      pointtwo,
      stock,
      image1: response1.secure_url,
      image2: response2.secure_url,
      image3: response3.secure_url,
      image4: response4.secure_url,
      wholesaleprice,
      retailprice
    });

    const productadded = await newproduct.save();
    res.json(productadded);
  } catch (errror) {
    res.status(500);
    res.json(errror);
  }
};

const getallproduct = async (req, res) => {
  try {
    const allproduct = await product.find({}).sort({ _id: -1 });
    console.log(allproduct);
    res.json(allproduct);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const deleteproduct = async (req, res) => {
  try {
    let data = await product.findByIdAndDelete(req.params.id);
    res.status(200).json("product deleted successfully");
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const updateproduct = async (req, res) => {
  const {
    name,
    detail,
    material,
    color,
    catagory,
    pointone,
    pointtwo,
    stock,
    image1,
    image2,
    image3,
    image4,
    wholesaleprice,
    retailprice
  } = req.body;

  const response1 =
    image1.startsWith("data") && (await cloudinary.uploader.upload(image1));
  const response2 =
    image2.startsWith("data") && (await cloudinary.uploader.upload(image2));
  const response3 =
    image3.startsWith("data") && (await cloudinary.uploader.upload(image3));
  const response4 =
    image4.startsWith("data") && (await cloudinary.uploader.upload(image4));
  try {
    const productUpdate = {
      name,
      detail,
      material,
      color,
      catagory,
      pointone,
      pointtwo,
      stock,
      image1: response1 === false ? image1 : response1.secure_url,
      image2: response2 === false ? image2 : response2.secure_url,
      image3: response3 === false ? image3 : response3.secure_url,
      image4: response4 === false ? image4 : response4.secure_url,
      wholesaleprice,
      retailprice
    };
    const updatedProduct = await product.findByIdAndUpdate(
      { _id: req.params.id },
      productUpdate
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};
const productdata = async (req, res) => {
  try {
    let productdetail = await product.findOne({ _id: req.params.id });
    res.json(productdetail);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const addcatagory = async (req, res) => {
  const { name, image,catbanner } = req.body;
  const response1 = await cloudinary.uploader.upload(image);
  const response2= await cloudinary.uploader.upload(catbanner)
  try {
    const newcatagory = new catagory({
      name,
      image: response1.secure_url,
      catbanner: response2.secure_url
    });

    const catagoryadded = await newcatagory.save();
    res.json(catagoryadded);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const getcatagory = async (req, res) => {
  try {
    let allcatagory = await catagory.find({});
    res.json(allcatagory);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const deletecatagory = async (req, res) => {
  try {
    console.log(req.params.id)
   await catagory.findByIdAndDelete({_id:req.params.id})
      res.status(200).json("catagory deleted successfully");
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const catagorydata = async (req, res) => {
  try {
    let catagorydetail = await catagory.findOne({ _id: req.params.id });
    res.json(catagorydetail);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const updatecatagory = async (req, res) => {
  const { name, image,catbanner } = req.body;
  const user = req.params.id;
  console.log(req.body.image);

  try {
    if (req.body.image.length > 0 && req.body.catbanner.length >0) {
      const response1 = await cloudinary.uploader.upload(image);
      const response2 = await cloudinary.uploader.upload(catbanner);
      const updatedcatagory = await catagory.findByIdAndUpdate(user, {
        name,
        image: response1.secure_url,
        catbanner: response2.secure_url
      });
      res.json(updatedcatagory);
    }else if(req.body.catbanner.length >0){
      const response = await cloudinary.uploader.upload(catbanner);
      const updatedcatagory = await catagory.findByIdAndUpdate(user, {
        name,
        catbanner: response.secure_url,
      });
      res.json(updatedcatagory);
    }else if (req.body.image.length >0 ){
      const response = await cloudinary.uploader.upload(image);
      const updatedcatagory = await catagory.findByIdAndUpdate(user, {
        name,
        image: response.secure_url,
      });
      res.json(updatedcatagory);
    }
     else {
      const updatedcatagory = await catagory.findByIdAndUpdate(user, {
        name,
      });
      res.json(updatedcatagory);
    }
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const addbanner = async (req, res) => {
  console.log(req.body);
  const { title, detail, url, button, image } = req.body;
  try {
    const response = await cloudinary.uploader.upload(image);
    const newbanner = new banner({
      title,
      detail,
      url,
      button,
      image: response.secure_url,
    });

    const banneradded = await newbanner.save();
    res.json(banneradded);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const getallbanner = async (req, res) => {
  try {
    let allbanner = await banner.find({});
    res.json(allbanner);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const deletebaner = async (req, res) => {
  try {
    let data = await banner.findByIdAndDelete(req.params.id);
      res.status(200).json("Banner deleted successfully");
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const getbannerdata = async (req, res) => {
  try {
    let bannerdata = await banner.findOne({ _id: req.params.id });
    res.json(bannerdata);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const updatebanner = async (req, res) => {
  const { title, detail, url, button, image } = req.body;
  const user = req.params.id;
  console.log(req.body.image.length);
  try {
    if (req.body.image.length > 0) {
      const response = await cloudinary.uploader.upload(image);
      const updatedbanner = await banner.findByIdAndUpdate(user, {
        title,
        detail,
        url,
        button,
        image: response.secure_url,
      });
      res.json(updatedbanner);
    } else {
      const updatedbanner = await banner.findByIdAndUpdate(user, {
        title,
        detail,
        url,
        button,
      });
      res.json(updatedbanner);
    }
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const getallorder = async(req,res)=>{
    try{
        let allorder = await order.find().sort({ _id: -1 });
        res.json(allorder)
    }catch(error){
        res.status(500);
        res.json(error);
    }
}

const getoneorder = async(req,res)=>{
    const orderid = req.params.orderid;
    try{
        let orderonedetail = await order.findById({_id:orderid})
        res.json(orderonedetail)
    }catch(error){
        res.status(500);
        res.json(error);
    }
}

const updateorderstatus =async(req,res)=>{
  const orderid = req.params.orderid;
  const {status} = req.body

  try{
    if(status == "Shipped"){
      let updatedorder = await order.findOneAndUpdate({_id:orderid},{"$set":{"date.shipped":new Date(),"orderstatus":"Shipped"}})
  res.json(updatedorder)
    }else if(status == "Out For Delivery"){
      let updatedorder = await order.findOneAndUpdate({_id:orderid},{"$set":{"date.outdelivery":new Date(),"orderstatus":"Out For Delivery"}})
  res.json(updatedorder)
    }else if(status == "Deliverd"){
      let updatedorder = await order.findOneAndUpdate({_id:orderid},{"$set":{"date.deliverd":new Date(),"orderstatus":"Delivered"}})
  res.json(updatedorder)
    }
  }catch(error){
    res.status(500);
    res.json(error);
  }
}

export {
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
};
