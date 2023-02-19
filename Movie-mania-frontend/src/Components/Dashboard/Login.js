import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';
import { Button, Checkbox, Form, Input } from 'antd';
export default function Login() {
  const { dispatch } = useAuthContext();
  const [email, setEmail] = useState('');
  const [error, seterror] = useState('')
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  let handleClick = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/users/login', {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        const data = response.data;
        let updatedUser = {
          token: data.Token,
          name: data.email
        };
        localStorage.setItem('token', updatedUser.token);
        dispatch({ type: 'LOGIN', payload: updatedUser });
        navigate('/dashboard');
      })
      .catch(error => {
        console.error(error.response.data.error);
        seterror(error.response.data.error)
      });


  }
  return (
    <div className="d-flex align-items-center justify-content-center login" style={{ 'height': '100vh' }}>
      <Form
        name="basic"
        onSubmit={(e) => {

        }}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={(e) => handleClick(e)}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* <div className="card card-primary logind" style={{ 'width': '500px' }}>
        <div className="card-header">
          <h3 className="card-title">Login</h3>
        </div>
        <form
          onSubmit={(e) => {
            handleClick(e);
          }}
        >
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="exampleInputEmail1"
                placeholder="Enter email"
              />
              {error && <span>{error}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </div>
          <div className="card-footer">
            <Link to='/' type="submit" className="btn btn-success w-20">
              Home
            </Link>
          </div>
        </form>
      </div> */}
    </div>
  )
}
