import React, { useState } from 'react'
import './Login.scss'
import { Link , useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { loginRedux } from '../../Redux/userSlice'
// imgs
import userImg from '../../Images/form-imgs/user.svg'
import showIcon from '../../Images/form-imgs/show.svg'
import hideIcon from '../../Images/form-imgs/hide.svg'

export default function Signup() {
  const [showPass, setshowPass] = useState(false)
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const userData = useSelector(state => state.user.value)
  const dispatch = useDispatch()

  const handlePassShow = () => {
    setshowPass((prev) => !prev)
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
  const handleSubmit = async(e) => {
    e.preventDefault()
    const {email, password} = data
    if(email && password ) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`, {
        method: "post",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
      const dataRes = await fetchData.json()
      if(dataRes.alert) {
        console.log(dataRes);
        dispatch(loginRedux(dataRes.data))
        // console.log(dataRes.)
        setTimeout(() => {
          navigate("/")
          toast(userData.firstName + ' ' + dataRes.message)
        }, 1000) 
        
      }
    } else {
      toast('please enter required field')
    }
  }

  return (
    <div className='login-wrap'>
      <div className="center-box">
        <div className='userimg-wrap'>
          <img src={userImg} alt="user" />
          
        </div>
        <form onSubmit={handleSubmit}>
         
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

          <div className='sign-btn'>
            <button type='submit'>Log in</button>
          </div>
        </form>
        <div className='login-wrap'>
          I don't have account? <Link to='/signup'>SignIn</Link>
        </div>
      </div>
    </div>
  )
}
