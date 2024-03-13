import React, {useRef, useState} from 'react'
import './NewProduct.scss'
import {ImagetoBase64} from '../../Utility/ImageBase64'

// images
import uploadIcon from '../../Images/newProduct/upload-img.svg'
import toast from 'react-hot-toast'

export default function NewProduct() {
  const [data, setData]  = useState({
    name: "",
    category: "Fruits",
    image: "",
    price: "",
    description: "",
  })
  const handleOnchange = (e) => {
    const {name, value} = e.target
    setData((prev) => {
      return{
      ...prev,
      [name] : value
    }
    })
  }
  const buttonRef = useRef(null);
  const handleClick = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };
  const uploadImage = async(e) => {
    const data = await ImagetoBase64(e.target.files[0]) 
    setData((prev) => {
      return{
      ...prev,
      image : data
    }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, image, category, price } = data;
    if (name && image && category && price) {
      try {
        const fetchData = await fetch(`http://127.0.0.1:8000/uploadProduct`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // 'Content-Type' should be capitalized
          },
          body: JSON.stringify(data)
        });
        console.log(data)
        const fetchRes = await fetchData.json();
        toast(fetchRes.message)
        setData(() => {
          return {
            name: "",
            category: "Fruits",
            image: "",
            price: "",
            description: "",
          }
        })
      } catch (error) {
        // Handle fetch error here
        console.error('Error:', error);
      }
    } else {
      toast('Enter required fields');
      console.log(data);
    }
  };
  return (
    <div className='newProduct-wrap'>
      <form onSubmit={handleSubmit}>
        <div className="opt-box">
        <label style={{ paddingTop: '2px', }} htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleOnchange} value={data.name} />
        </div>
        <div className="opt-box">
          <label htmlFor="Category">Category</label>
         <select  id="category" name="category" onChange={handleOnchange} value={data.category}>
          <option defaultValue="Fruits" >Fruits</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Icream">Icream</option>
          <option value="Cake">Cake</option>
          <option value="Burger">Burger</option>
          <option value="Rice">Rice</option>
          <option value="Dosa">Dosa</option>
          <option value="Piza">Pizza</option>
         </select>
        </div>
         <div className="opt-box">
           <label htmlFor="image">Image</label>
            <div onClick={handleClick} className="img-wrap" id='image'> 
              <span className='img-ele'>
                <img src={uploadIcon} alt="data" className={data.image ? 'product-img-none': 'upload-img'} />
              </span>
              <img src={data.image && data.image } className={data.image ? 'product-img': 'product-img-none'} alt="" />
              <input ref={buttonRef} className='upload-input' accept='image/*' type="file" onChange={uploadImage} style={{display: 'none'}}  />
            </div>
         </div>
         <div className="opt-box">
          <label htmlFor="price">Price</label>
          <input type="text" id='price' name='price' onChange={handleOnchange} value={data.price}/>
         </div>
         <div className='opt-box'> 
            <label htmlFor="description">Description</label>
            <textarea name="description" id="" cols="30" rows="10" onChange={handleOnchange} value={data.description}></textarea>
         </div>
         <div className="submit-wrap"><button type='submit'>Save</button>
         </div>
        
       </form> 
    </div>
  )
}
