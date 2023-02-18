import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'

export default function Contactus() {
  const [fullName,setfullname] = useState(null);
  const [email,setemail] = useState('');
  const [message,setmessage] = useState('');
  const [isAdded,setAdded] = useState(false);
  const onclick = (e) => {
    e.preventDefault();
    const data = {
      fullName,
      email,
      message
    }
    if(fullName !== null || email !== '' || message !== ''){
      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        axios.post('http://localhost:8000/Messages', data)
          .then((res)=>{
            setAdded(true)
          })
          .catch((err)=>(console.log('error detected')))
      } else {
        alert ('Not a valid email')
      }
    } else {
      alert('input cannot be empty')
    }
  }

  return (
    <>
      <Navbar />
    <div className='contact-div'>
     {!isAdded? <div className='form-div'>
        <div className='contact-txt-div'>
            <p className='contact-txt'>Tell us what you think!</p>
        </div>
        <div className='contact-form-div'>
            <h1 className='contact-form-h1'>Contact us</h1>
            <form className='contact-form'
              onSubmit={onclick}
            >
                <label className='contact-form-label' >Full Name:</label>
                <input type='text' className='contact-form-input' onChange={(e)=>{setfullname(e.target.value)}} placeholder='Type full name here*'></input>
                {!fullName && <span className='text-danger'>Fullname is required</span>}
                <label className='contact-form-label' >Email Address:</label>
                <input type='text' className='contact-form-input' onChange={(e)=>{setemail(e.target.value)}} placeholder='email123@example.com'></input>
                <label className='contact-form-label' >Message*</label>
                <textarea type='textarea' maxLength='200' className='contact-form-textarea' onChange={(e)=>{setmessage(e.target.value)}} placeholder='Type your message here...'></textarea>
                <button type='submit' className='contact-form-submit'>Send <i class="bi bi-send"></i></button>
            </form>
        </div>
      </div>:<p>Added succfully</p>}
    </div>
    <Footer />
    </>
  )
}
