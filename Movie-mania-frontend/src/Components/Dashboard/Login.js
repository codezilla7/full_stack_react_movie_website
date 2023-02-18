import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';
export default function Login() {
  const { dispatch } = useAuthContext();
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
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
        console.log(data)
        let updatedUser = {
          token: data.Token,
          name: data.email
        };
        localStorage.setItem('token', data.accessToken);
        dispatch({ type: 'LOGIN', payload: updatedUser });
        navigate('/dashboard');
      })
      .catch(error => {
        console.error(error.message);
      });

  }
  return (
    <div className="d-flex align-items-center justify-content-center login" style={{ 'height': '100vh' }}>
      <div className="card card-primary logind" style={{ 'width': '500px' }}>
        <div className="card-header">
          <h3 className="card-title">Login</h3>
        </div>
        {/* /.card-header */}
        {/* form start */}
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
          {/* /.card-body */}
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
      </div>
    </div>
  )
}
