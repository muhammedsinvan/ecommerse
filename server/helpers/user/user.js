import user from "../../models/user.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import product from "../../models/addproduct.js";
import cart from "../../models/cart.js";
import Stripe from "stripe";
import order from '../../models/orders.js'
import catagory from "../../models/addcatagory.js";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET);

const signupdata = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await user.findOne({ email });
    if (userExists) {
      res.status(400);
      res.json("user already exists");
    }
    const newUser = new user({
      username: username,
      email: email,
      password: CryptoJS.AES.encrypt(password, process.env.PASS_KEY),
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const signindata = async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await user.findOne({ email });
    if (users) {
      const hashedPassword = CryptoJS.AES.decrypt(
        users.password,
        process.env.PASS_KEY
      );
      const orginalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (orginalpassword === password) {
        const jsontoken = jwt.sign({ id: users._id }, process.env.JWT_SEC, {
          expiresIn: "3d",
        });
        const { password, ...others } = users._doc;
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

const getonecatagory = async (req,res)=>{
  try{
    console.log(req.params.type)
    const data = await catagory.findOne({name:req.params.type})
    res.json(data);
  }catch(error){
    res.status(500);
    res.json(error);
  }
}

const getcatagoryproduct = async (req, res) => {
  try {
    const data = await product.find({ catagory: req.params.item });
    res.json(data);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const getproductdetail = async (req, res) => {
  try {
    const data = await product.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const addtocart = async (req, res) => {
  console.log("hey");
  const userid = req.params.userid;
  const productid = req.body.productid;
  const qty = 1;
  try {
    let [data] = await cart.find({ userid });
    let productdata = await product.findById(productid);
    console.log("data");

    if (data) {
      const totalamount = data.grandtotal + productdata.retailprice;
      console.log(totalamount);
      const additem = await cart.findOneAndUpdate(
        { userid },
        {
          $push: {
            cartitem: {
              itemid: productid,
              itemname: productdata.name,
              image:productdata.image1,
              qty,
              price: productdata.retailprice,
              subtotal: productdata.retailprice,
            },
          },
          grandtotal: totalamount,
        },
        { safe: true }
      );
      console.log(additem);
      res.json(additem);
      console.log("additem");
    } else {
      console.log("user does not cart already exist");
      const newcart = new cart({
        userid,
        grandtotal: productdata.retailprice,
        cartitem: [
          {
            itemid: productid,
            itemname: productdata.name,
            image:productdata.image1,
            qty,
            price: productdata.retailprice,
            subtotal: productdata.retailprice,
          },
        ],
      });

      let addnewcartuser = await newcart.save();
      console.log("addnewcartuser");
      res.json(addnewcartuser);
    }
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const getcartitem = async (req, res) => {
  const userid = req.params.userid;
  console.log(userid);
  try {
    let [usercart] = await cart.find({ userid });
    console.log(usercart)
    res.json(usercart);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const removecartitem = async (req, res) => {
  const userid = req.params.userid;
  const { itemid } = req.body;
  try {
    let usercart = await cart.findOne({ userid });
    console.log(usercart);
    if (usercart) {
      let itemindex = usercart.cartitem.findIndex((p) => p.itemid == itemid);
      console.log(itemindex);
      let productItem = usercart.cartitem[itemindex];
      console.log(productItem);
      usercart.grandtotal = usercart.grandtotal - productItem.subtotal;
      usercart.cartitem.pull(productItem);
      let removeitem = await usercart.save();
      res.json(removeitem);
    }

    //const removeitem = await cart.findOneAndUpdate({userid},{"$pull":{"cartitem":{"_id":itemid}}},{safe:true})
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const getsortedproduct = async (req, res) => {
  try {
    let recentuplodedproduct = await product
      .find({})
      .sort({ _id: -1 })
      .limit(12);
    res.json(recentuplodedproduct);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const updatecartqty = async (req, res) => {
  const userid = req.params.userid;
  const { itemid } = req.body;
  console.log("hey");
  try {
    let usercart = await cart.findOne({ userid });
    if (usercart) {
      let itemindex = usercart.cartitem.findIndex((p) => p.itemid == itemid);
      console.log(itemindex);
      if (itemindex > -1) {
        let productItem = usercart.cartitem[itemindex];
        productItem.qty++;
        productItem.subtotal = productItem.subtotal + productItem.price;
        usercart.grandtotal = usercart.grandtotal + productItem.price;
        console.log(productItem);
        usercart.cartitem[itemindex] = productItem;
      }
      let updatedCart = await usercart.save();
      res.json(updatedCart);
    }
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

const lesscartqty = async (req, res) => {
  let userid = req.params.userid;
  let { itemid } = req.body;
  try {
    let usercart = await cart.findOne({ userid });
    if (usercart) {
      let itemindex = usercart.cartitem.findIndex((p) => p.itemid == itemid);
      let productitem = usercart.cartitem[itemindex];
      if (productitem.qty == 1) {
        usercart.grandtotal = usercart.grandtotal - productitem.price;
        usercart.cartitem.pull(productitem);
      } else {
        productitem.qty--;
        productitem.subtotal = productitem.subtotal - productitem.price;
        usercart.grandtotal = usercart.grandtotal - productitem.price;
      }
      console.log(usercart);
      let updatedcart = await usercart.save();
      res.json(updatedcart);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const addshippingaddress = async (req, res) => {
  const { values } = req.body;
  const userid = req.params.userid;
  try {
    let userdata = await user.findOne({ _id: userid });
    console.log(userdata.address)
    if (userdata) {
      let newdata = userdata.address.push(values);
      console.log(newdata);
    }
    let addaddress = await userdata.save(); 
    res.json(addaddress);
  } catch (error) {
    res.status(500).json(error);
  }
};

const editshippingaddress = async (req, res) => {
  const { values } = req.body;
  const { userid, addressid } = req.params;
  try {
    let updateshippingaddress = await user.findOneAndUpdate(
      { _id: userid, "address._id": addressid },
      { $set: { "address.$.name": values.name ,
     "address.$.mobile":values.mobile,
     "address.$.pin":values.pin,
     "address.$.locality":values.locality,
     "address.$.buildingname":values.buildingname,
     "address.$.landmark":values.landmark,
     "address.$.district":values.district,
     "address.$.state":values.state,} }
    );
    res.json(updateshippingaddress);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getshippingaddress = async (req, res) => {
  const userid = req.params.userid;
  try {
    let useraddress = await user.findOne({ _id: userid }).sort({ _id: -1 });
    res.json(useraddress.address);
  } catch (error) {
    res.status(500).json(error);
  }
};

const removeaddress = async (req, res) => {
  const userid = req.params.userid;
  const { addressid } = req.body;
  console.log(addressid);
  try {
    let userdata = await user.findOne({ _id: userid });
    if (userdata) {
      let itemindex = userdata.address.findIndex((p) => p._id == addressid);
      let useraddress = userdata.address[itemindex];
      userdata.address.pull(useraddress);
    }
    let removedaddress = await userdata.save();
    res.json(removedaddress);
  } catch (error) {
    res.status(500).json(error);
  }
};

const userdata = async (req, res) => {
  const userid = req.params.userid;
  try {
    let userdetail = await user.findOne({ _id: userid });
    res.json(userdetail);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateprofile = async (req, res) => {
  const userid = req.params.userid;
  const data = req.body;
  console.log(data);
  try {
    let updatedprofile = await user.findByIdAndUpdate(
      { _id: userid },
      { data } 
    );
    console.log(updatedprofile);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getuseraddres = async (req, res) => {
  const userid = req.params.userid;
  const addressid = req.params.addressid;
  try {
    let getuseroneaddress = await user.findOne(
      { _id: userid, "address._id": addressid },
      { "address.$": 1 }
    );
    res.json(getuseroneaddress.address[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};


const stripepayment =async(req,res)=>{
  let {amount, id,userid,address,cartdata} = req.body;
  console.log(cartdata._id)
  const newamount = amount+40
  console.log("one")
  try {
    const payment = await stripe.paymentIntents.create({
      payment_method:id,
      description:"Product purchased successful",
      amount: newamount*100, // USD*100
      currency: 'inr',
      confirm: true,
      payment_method_types: ['card'],
    })

    console.log("Payment", payment)
    if(payment){
      const neworder = new order({
        userid,
        paymentid:id,
        paymenttype:'card',
        paymentstatus:'Success',
        orderstatus:'Confirmed',
        grandtotal:newamount,
        date:{confirmed:new Date()},
        products:cartdata,
        address:address
      })

      const addorder = await neworder.save()
      if(addorder){
        const deletecart = await cart.findOneAndRemove({userid:userid})
      }
    }
    res.json({ 
        message: "Payment was successful",
        success: true
    })
} catch (error) {
    console.log("Error", error)   
    res.json({
        message: "Payment Failed",
        success: false
    })
}

}


const checktoken =(req,res)=>{
  res.json({
    message: "token success",
    success: true
})
}


const getorders =async(req,res)=>{
  const userid = req.params.userid;
  try{
    let orders = await order.find({userid}).sort({ _id: -1 })
    console.log(orders)
    res.json(orders)
  }catch(error){
    res.status(500).json(error);
  }
}

const orderdetail = async (req,res)=>{
  const orderid = req.params.orderid;
  try{
    let orderonedetail = await order.findById({_id:orderid})
    res.json(orderonedetail)
  }catch(error){
    res.status(500).json(error);
  }
}

const checkmail = async(req,res)=>{
  const {email} = req.body;
  try{
let response = await user.findOne({email})
if(response){
  const token = jwt.sign({id:response._id},process.env.JWT_SEC, {
    expiresIn:"1d"
  });
  var transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
      user: "verdeelifeshop@gmail.com",
      pass:"quiqziwfxywnvmeq"
    },
  });
  var mailOptions = {
    from: "verdeelifeshop@gmail.com",
    to: response.email,
    subject: "Reset your password",
    text: `http://13.53.125.152/forgotpassword/newpassword/${response._id}/${token}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json(info.response);
    }
  });
}else {
  res.status(400).json("Email does not exist");
}
  }catch(error){
    res.status(500).json(error);
  }
}

const newpassword = async(req,res)=>{
  const {data} = req.body;
  const {id,token} = req.params;
  jwt.verify(token,process.env.JWT_SEC,(err,decoded)=>{
    if(err){
      res.status(400).json('Token invalid')
    }
  })
  try{
    if (data.password === data.confirmpassword){
      const encryptpass =""+CryptoJS.AES.encrypt(data.password,process.env.PASS_KEY);
      const updatepassword = await user.findByIdAndUpdate({_id:id},{password:encryptpass});
     res.json(updatepassword);
    }else{
      res.status(400).json("Incorrect Password")
    }
  }catch(error){
    res.status(500).json(error);
  }
}

export {
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
  stripepayment,
  checktoken,
  getorders,
  orderdetail,
  checkmail,
  newpassword
};