import React, { useEffect, useState } from "react";
import "./CheckoutDetail.css";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import Chekout from "../checkout/Chekout";

const CheckoutDetail = () => {
  const [address, setAddress] = useState([]);
  const [cartdata, setCartdata] = useState([]);
  const [grandtotal, setGrandtotal] = useState();
  const [error,setError] = useState(true)
  const [isComponentVisible, setComponentVisible] = useState(false);

  const showComponent = () => {
    if(address.name){
      setComponentVisible(true);
    }else{
      setError(false)
    }

  };

  const navigate = useNavigate();
  const params = useParams();

  const userid = localStorage.getItem("userid");
  const userInfo = localStorage.getItem('usertoken')

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  };


  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(`/getuseraddres/${userid}/${params.addressid}`,config);
        console.log(res.data)
        setAddress(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(`/getcartitem/${userid}`,config);
        setCartdata(res.data.cartitem);
        setGrandtotal(res.data.grandtotal);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(()=>{
    if(!cartdata){
      navigate('/')
    }
  },cartdata)

  return (
    <div className="checkoutDetail-container">

      {/* address showing container */}
      <div className="checkoutDetail-left-container">
        {address.name?<div className="checkoutDetail-address-oneaddress">
          <div className="checkoutDetail-address-dsc">
            <div className="checkoutDetail-address-personal">
              <text>{address?.name}</text>
              <text>{address?.mobile}</text>
            </div>
            <div className="checkoutDetail-address-info">
              <text> {address?.buildingname},</text>
              <text>{address?.locality},</text>
              <text>{address?.district},</text>
              <text>{address?.state}</text>-<text>{address?.pin}</text>
            </div>
          </div>
          <div className="checkoutDetail-address-btn" onClick={()=>navigate('/shipping')}>
            <button>Change</button>
            
          </div>
        </div>:<>
     {  error ? <div className="checkoutDetail-address-oneaddress">
        <div className="checkoutDetail-address-selectbtn" onClick={()=>navigate('/shipping')}>
        <button>Select Your Address</button>
        </div>
      </div> :<div className="checkoutDetail-address-oneaddress-error">
        <div className="checkoutDetail-address-selectbtn" onClick={()=>navigate('/shipping')}>
        <button>Select Your Addres</button>
        </div>
      </div>}</>}

        {/* product listing  */}
        <div className="checkoutDetail-box-item-list">
          {cartdata?.map((item) => (
            <div className="checkoutDetail-box-item">
              <div
                className="checkoutDetail-box-item-img"
                onClick={() => navigate(`/productdetail/${item.itemid}`)}
              >
                <img
                  src={item?.image}
                  alt="img"
                />
              </div>
              <div className="checkoutDetail-box-item-des">
                <p className="checkoutDetail-box-item-des-title">{item?.itemname}</p>
                <p className="checkoutDetail-box-item-des-price">₹{item?.price}</p>
                <p>{item.qty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* amount detail */}
      <div className="checkoutDetail-right-container">
        <p className="checkoutDetail-box-total-title">Order Details</p>
        <div className="checkoutDetail-box-total-detail">
          <p>Price</p>
          <p>₹{grandtotal}</p>
        </div>
        <div className="checkoutDetail-box-total-detail">
          <p>Items</p>
          <p>{cartdata.length}</p>
        </div>
        <div className="checkoutDetail-box-total-detail">
          <p>Delivery Charges</p>
          <p>₹40</p>
        </div>

        <div className="checkoutDetail-box-total-detail-amount">
          <p>Total Amount</p>
          <p>₹{grandtotal+40}</p>
        </div>
        <div
          className="checkoutDetail-box-total-detail-btn"
          onClick={showComponent}
        >
          <button>PROCEED TO PAYMENT</button>
        </div>
        {isComponentVisible && <div className="chekout-page-component active"><Chekout /></div>}
      </div>
    </div>
  );
};

export default CheckoutDetail;
