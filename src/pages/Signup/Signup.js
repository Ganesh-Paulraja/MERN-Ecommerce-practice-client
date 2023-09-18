import React, { useState } from 'react'
import './Signup.scss'
import { Link, useNavigate } from 'react-router-dom'
import {ImagetoBase64} from '../../Utility/ImageBase64'
import {toast} from "react-hot-toast"
// imgs
import userImg from '../../Images/form-imgs/user.svg'
import showIcon from '../../Images/form-imgs/show.svg'
import hideIcon from '../../Images/form-imgs/hide.svg'

export default function Signup() {
  const navigate = useNavigate();
  const [showPass, setshowPass] = useState(false)
  const [showConfirmPass, setshowConfirmPass] = useState(false)
  const [data, setData] = useState({
    firstName : "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  })

  const handlePassShow = () => {
    setshowPass((prev) => !prev)
  }
  const handleConfirmPassShow = () => {
    setshowConfirmPass((prev) => !prev)
  }

  const handleOnChange = (e) => {
    const {name, value} = e.target
    setData ((prev) => {
      return {
        ...prev,
        [name] : value  
      }
    })
  }
  const handleUploadProfileImage = async(e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    setData((prev) => {
      return {
        ...prev,
        image : data
      }
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    const {firstName, email, password, confirmPassword} = data
    if(firstName && email && password && confirmPassword) {
      if(password === confirmPassword) {
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`, {
          method: "post",
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
        const dataRes = await fetchData.json()
        // console.log(fetchData)
        // console.log(dataRes)
        toast(dataRes.message)
        if(dataRes.alert) {
          navigate("/login")
        }
      } else {
        alert('password and confirm password not equal')
      }
    } else {
      alert('please enter required field')
    }
  }

  return (
    <div className='sign-wrap'>
      <div className="center-box">
        <div className='userimg-wrap'>
          <img src={data.image ? data.image : userImg} alt="user" />
          <div className='upload-text'>
            <p>Upload</p>
            <input type="file" id="profileImage" accept='image/*' onChange={handleUploadProfileImage} />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-opt first-name'>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id='firstName' name='firstName' value={data.firstname} onChange={handleOnChange}/>
          </div>
          <div className='form-opt last-name'>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id='lastName' name='lastName' value={data.lastName} onChange={handleOnChange} />
          </div>
          <div className='form-opt user-email'>
            <label htmlFor="email">email</label>
            <input type="email" id='email' name='email' value={data.email} onChange={handleOnChange}/>
          </div>
          <div className='form-opt user-pass'>
            <label htmlFor="password">Password</label>
            <input type={showPass ? "text" : "password"} id='password' name='password' value={data.password} onChange={handleOnChange}/>
            <div className='icon-box' onClick={handlePassShow}>
              <img src={showPass ? hideIcon : showIcon} className='show-icon' alt="show" />
            </div>
          </div>
          <div className='form-opt confirm-pass'>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type={showConfirmPass ? "text" : "password"} id='confirmPassword' name='confirmPassword' value={data.confirmPassword} onChange={handleOnChange}/>
            <div className='icon-box' onClick={handleConfirmPassShow}>
              <img src={showConfirmPass ? hideIcon : showIcon} className='show-icon' alt="show" />
            </div>
          </div>
          <div className='sign-btn'>
            <button type='submit'>Sing up</button>
          </div>
        </form>
        <div className='login-wrap'>
          Already have account? <Link to='/Login'>Login</Link>
        </div>
      </div>
    </div>
  )
}
