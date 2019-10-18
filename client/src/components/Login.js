import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ history }) => {
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', loginForm)
      .then(({ data: { payload } }) => {
        localStorage.setItem('token', `${payload}`);
        history.push('/bubbles');
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={loginForm.username}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={handleChange}
        />
        <br />
        <input type="submit" />
      </form>
    </>
  );
};

export default Login;
