import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'
import { Button, Form, Input, Result } from 'antd';
import { Link } from 'react-router-dom';

export default function Contactus() {
  const [isAdded, setAdded] = useState(false);
  const [fullname, setfullname] = useState('')
  const [email, setEmail] = useState('')
  const [socialmedia, setsocialmedia] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    console.log(fullname, email, socialmedia, description)
    e.preventDefault();
    axios
      .post('http://localhost:8000/contactus', {
        fullname,
        email,
        socialmedia,
        description
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        setAdded(true)
      })
      .catch(error => {
        console.log(error.response.data.error)
      })
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  return (
    <>
      <Navbar />
      <div className='contact-div'>
        {!isAdded ? (<div className='form-div'>
          <div className='contact-txt-div'>
            <p className='contact-txt'>Tell us what you think!</p>
          </div>
          <div className='contact-form-div'>
            <h1 className='contact-form-h1'>Contact us</h1>
            <Form
              {...layout}
              name="nest-messages"
              style={{ maxWidth: 600 }}
              validateMessages={validateMessages}
              onSubmitCapture={handleSubmit}
            >
              <Form.Item name={['fullname']} label={<span style={{color: '#d7d7d7'}} >fullname</span>} rules={[{ required: true }]}>
                <Input onChange={(e) => { setfullname(e.target.value) }} />
              </Form.Item>
              <Form.Item name={['email']} label={<span style={{color: '#d7d7d7'}} >email</span>} rules={[{ required: true, type: 'email' }]}>
                <Input onChange={(e) => { setEmail(e.target.value) }} placeholder='john@example.com' />
              </Form.Item>
              <Form.Item name={['social media']} label={<span style={{color: '#d7d7d7'}} >social media</span>} rules={[{required: true},{type:'url'}]}>
                <Input onChange={(e) => { setsocialmedia(e.target.value) }} placeholder='URL' />
              </Form.Item>
              <Form.Item name={['introduction']} label={<span style={{color: '#d7d7d7'}} >introduction</span>} rules={[{ required: true , min: 25}]}>
                <Input.TextArea onChange={(e) => { setDescription(e.target.value) }} showCount maxLength={100} />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>) : (
          <Result
            status="success"
            style={{color:'white'}}
            title={<span style={{ color: 'white' }}>Message Added Successfully</span>}
            extra={[
              <Button key="buy"><Link to='/'>Go to Homepage</Link></Button>,
            ]}
          />)}
      </div>
      <Footer />
    </>
  )
}
