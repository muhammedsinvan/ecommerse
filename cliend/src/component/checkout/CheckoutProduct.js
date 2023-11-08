
import React from 'react'

const CheckoutProduct = (props) => {

 

  const cartdata = props.data.cartdata;
  const grandtotal = props.data.grandtotal;
  const address = props.data.address;


  return (
    <div >
       <div className="checkoutProduct-address-oneaddress">
          <div className="checkoutProduct-address-dsc">
            <div className="checkoutProduct-address-personal">
              <text>{address?.name}</text>
              <text>{address?.mobile}</text>
            </div>
            <div className="checkoutProduct-address-info">
              <text> {address?.buildingname},</text>
              <text>{address?.locality},</text>
              <text>{address?.district},</text>
              <text>{address?.state}</text>-<text>{address?.pin}</text>
            </div>
          </div>
          </div>
      <div className='checkoutProduct-amount-container'>
<p className='checkoutProduct-box-total-title'>Order Details</p>
<div className='checkoutProduct-box-total-detail'>
    <p>Price</p>
    {grandtotal&&<p>₹{grandtotal}</p>}
</div>
<div className='checkoutProduct-box-total-detail'>
    <p>Items</p>
   { cartdata&&<p>{cartdata.length}</p>}
</div>
<div className='checkoutProduct-box-total-detail'>
    <p>Delivery Charges</p>
    <p>₹40</p>
</div>

<div className='checkoutProduct-box-total-detail-amount'>
    <p>Total Amount</p>
    {grandtotal&&<p>₹{grandtotal+40}</p>}
</div>

      </div>
    </div>
  )
}

export default CheckoutProduct
