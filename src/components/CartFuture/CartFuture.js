import React, {useState, useEffect} from 'react'
import './CartFuture.scss'
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { addCartItem } from '../../Redux/productSlice';

function CartFuture({val}) {
  const [proName, setproName] = useState('')
  const [proPrice, setproPrice] = useState(null)
  useEffect(() => {
    if (val) {
      const prName =  val.name.length > 12 ? val.name.slice(0, 11) + '...' : val.name
      setproName(prName)
      const price = Number(val.price);
      const forPrice = price.toFixed(2);
      setproPrice(forPrice)
    }
  }, [val])
  const dispatch = useDispatch();
  const handleCartProduct = () => {
    dispatch(addCartItem(val))
  }
  return (
    <div className='product-card-wrap '>
          {val ? <>
            <div className="pro-img">
            <Link to={`/Product/${val._id}`} >
              <img src={val.image} alt={val.name} />
              </Link>
          </div>
          <div className="pro-name">
            <Link to={`/Product/${val._id}`} >
              {proName}
            </Link>
          </div>
          <p className="price">
              ${proPrice}
          </p>
          <button onClick={handleCartProduct}>Add to Cart</button>
          </>: <>
          <p>Loading...</p>
          </>
           
          }
      </div>
  )
}

export default CartFuture