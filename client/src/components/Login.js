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
    <div
      style={{
        backgroundImage: "url('image.png')",
        width: '100vw',
        height: '100vh',
        margin: 0,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit}
        style={{ marginTop: '100px', width: '350px' }}
        className="login"
      >
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
    </div>
  );
};

export default Login;
