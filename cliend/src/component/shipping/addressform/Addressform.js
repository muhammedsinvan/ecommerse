import React, { useEffect, useState } from "react";
import "../shipping.css";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

const Addressform = (props) => {
  const userid = localStorage.getItem("userid");

  const userInfo = localStorage.getItem('usertoken')

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo}`,
    },
  };

  const navigate = useNavigate();

  const params = useParams();

  const [data, setData] = useState({});

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const addressSchema = Yup.object().shape({
    name: Yup.string().required("Enter your name"),
    mobile: Yup.string()
      .min(10)
      .max(10)
      .matches(phoneRegExp, "Phone number is not valid"),
    pin: Yup.string().min(6).max(6).required("Enter valid pincode"),
    locality: Yup.string().required("Enter your locality"),
    buildingname: Yup.string().required("Enter your Building/Flat name"),
    landmark: Yup.string().required("Enter your landmark"),
    district: Yup.string().required("Enter your district"),
    state: Yup.string().required("Enter your state"),
  });

  const formik = useFormik({
    initialValues: {
      name: data ? data.name : "",
      mobile: data ? data.mobile : "",
      pin: data ? data.pin : "",
      locality: data ? data.locality : "",
      buildingname: data ? data.buildingname : "",
      landmark: data ? data.landmark : "",
      district: data ? data.district : "",
      state: data ? data.state : "",
    },
    enableReinitialize: true,
    validationSchema: addressSchema,
    onSubmit: (values) => {
      (async () => {
        try {
          if (params.addressid) {
            let res = await axios.post(`/editshippingaddress/${userid}/${params.addressid}`,{values})
            if (res.data) {
              if (props.type == "accounts") {
                navigate("/accounts/address");
              } else {
                navigate("/shipping");
              }
            }
          } else {
            let res = await axios.post(`/addshippingaddress/${userid}`, {
              values,
            });
            if (res.data) {
              if (props.type == "accounts") {
                navigate("/accounts/address");
              } else {
                navigate("/shipping");
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      })();
    },
  });

  useEffect(() => {
    if (params.addressid) {
      (async () => {
        try {
          let res = await axios.get(
            `/getuseraddres/${userid}/${params.addressid}`,config
          );
          setData(res.data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} auto>
        <p className="shipping-left-container-title">Add new address</p>
        <div className="shipping-left-container-field">
          <text>Name*</text>
          <input
            className="shipping-left-container-field-text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && (
            <p className="shipping-error-message">{formik.errors.name}</p>
          )}
        </div>
        <div className="shipping-left-container-field">
          <text>Mobile*</text>
          <input
            className="shipping-left-container-field-text"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
          />
          {formik.errors.mobile && (
            <p className="shipping-error-message">{formik.errors.mobile}</p>
          )}
        </div>
        <div className="shipping-left-container-field">
          <text>Pin Code*</text>
          <input
            name="pin"
            className="shipping-left-container-field-text"
            value={formik.values.pin}
            onChange={formik.handleChange}
          />
          {formik.errors.pin && (
            <p className="shipping-error-message">{formik.errors.pin}</p>
          )}
        </div>
        <div className="shipping-left-container-field">
          <text>Locality/Area/Street*</text>
          <input
            name="locality"
            className="shipping-left-container-field-text"
            value={formik.values.locality}
            onChange={formik.handleChange}
          />
          {formik.errors.locality && (
            <p className="shipping-error-message">{formik.errors.locality}</p>
          )}
        </div>
        <div className="shipping-left-container-field">
          <text>Flat Number / Building Name*</text>
          <input
            name="buildingname"
            className="shipping-left-container-field-text"
            value={formik.values.buildingname}
            onChange={formik.handleChange}
          />
          {formik.errors.buildingname && (
            <p className="shipping-error-message">
              {formik.errors.buildingname}
            </p>
          )}
        </div>
        <div className="shipping-left-container-field">
          <text>Landmark*</text>
          <input
            name="landmark"
            className="shipping-left-container-field-text"
            value={formik.values.landmark}
            onChange={formik.handleChange}
          />
          {formik.errors.landmark && (
            <p className="shipping-error-message">{formik.errors.landmark}</p>
          )}
        </div>
        <div className="shipping-left-container-field">
          <text>District/City*</text>
          <input
            name="district"
            className="shipping-left-container-field-text"
            value={formik.values.district}
            onChange={formik.handleChange}
          />
          {formik.errors.district && (
            <p className="shipping-error-message">{formik.errors.district}</p>
          )}
        </div>
        <div className="shipping-left-container-field">
          <text>State*</text>
          <input
            name="state"
            className="shipping-left-container-field-text"
            value={formik.values.state}
            onChange={formik.handleChange}
          />
          {formik.errors.state && (
            <p className="shipping-error-message">{formik.errors.state}</p>
          )}
        </div>
        <div className="shipping-left-container-savebutton">
          <button type="submit">SAVE</button>
        </div>
      </form> 
    </div>
  );
};

export default Addressform;