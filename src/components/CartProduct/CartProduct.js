import React from 'react'
import plusIcon from '../../Images/payment-icons/plus.png'
import minusIcon from '../../Images/payment-icons/minus.png'
import deleteIcon from '../../Images/payment-icons/delete.png'
import { useDispatch } from 'react-redux';
import { deleteCartItem, increaseQty, decreseQty } from '../../Redux/productSlice';

function CartProduct({val}) {
  const price = Number(val.price);
  const forPrice = price.toFixed(2);
  const totalPri = Number(val.price * val.qty)
  const fortotalPri = totalPri.toFixed(2)
  const dispatch = useDispatch()
  return (
    <div className='single-pro-wrap'>
      <div className="pro-delete" onClick={() => {
        dispatch(deleteCartItem(val._id))
      }}>
        <img src={deleteIcon} alt="delete" />
      </div>
      <div className="cart-img">
        <img src={val.image} alt={val.name} />
      </div>
      <div className="cart-pro-detail-wrap">
        <div className="cr-pro-name">
          {val.name}
        </div>
        <div className="cr-pro-price">
          ${forPrice}
        </div>
        <div className="cr-pro-calc">
          <span className='pro-plus' onClick={() => {
            dispatch(increaseQty(val._id))
          }}>
            <img src={plusIcon} alt="plus" />
          </span>
          <span className='pro-count'>{val.qty}</span>
          <span className='pro-minus' onClick={() => {
            dispatch(decreseQty(val._id))
          }}>
            <img src={minusIcon} alt="minus" />
          </span>
        </div>
      </div>
      <div className="single-total">
        Total: <span>${fortotalPri}</span>
      </div>
    </div>
  )
}

export default CartProduct