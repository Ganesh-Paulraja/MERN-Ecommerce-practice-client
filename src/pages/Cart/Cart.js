import React from 'react'
import './Cart.scss'
import { useSelector } from 'react-redux'
import CartProduct from '../../components/CartProduct/CartProduct'

export default function Cart() {
  const productCartItem = useSelector((state) => state.product.cartItem)
  const totalPrice = productCartItem.reduce((total, item) => {
  return total + (Number(item.qty) * Number(item.price));
}, 0);
  const forTotalPri = totalPrice.toFixed(2);
  const totalQuantity = productCartItem.reduce((total, item) => {
    return total + Number(item.qty);
  }, 0);
  return (
    (productCartItem.length) ? 
    <div className="cart-warap">
      <h1>Your Cart Items</h1>
      <div className="cart-item">
        <div className="left-cart">
          <div className="pro-cart-wrap">
            {productCartItem.map((el, i) => {
              return(
                <div key={el._id + i}>
                <CartProduct val = {el}/>
                </div>
              )
            })}
          </div>
        </div>
        <div className="right-cart">
          <div className="summer-wrap">
            <div className="sum-head">
              Cart Summary
            </div>
            <div className="sum-val">
              <span className='sum-qty-text'>
                Totay Qty:
              </span>
              <span className='sum-Qty'>
                {totalQuantity}
              </span>
            </div>
            <div className="sum-val">
              <span className='sum-qty-text'>
               Total Price:
              </span>
              <span className='sum-Qty'>
                ${forTotalPri}
              </span>
            </div>
            <button className='check-btn'>Checkout</button>
          </div>
        </div>
      </div>
    </div>: 
    <h1 className='cart-empty'>Your Cart Is Empty</h1>
  )
}
