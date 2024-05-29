


// Login.js
// import React, { useState } from 'react';
// import api from '../../api/index';
// import { Link, useNavigate } from 'react-router-dom';
// import './Login.css';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/login', { email, password });
//       if (response.data.success) {
//         localStorage.setItem('initial', response.data.initial);
//         navigate("/D");
//       }
//     } catch (err) {
//       setError(err.response.data.message);
//     }
//   };

//   return (
//     <div className='ody'>
//       <h2>Welcome to Easy Cheque Printing</h2>
//       {error && <p>{error}</p>}
//       <div className='login-container'>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Email:</label>
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           </div>
//           <button type="submit">Login</button>
//           <p>Don't have an account? <Link to="/register">Register here</Link></p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState, useEffect } from 'react';
import api from '../../api/index';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Code to handle background image change after 5 seconds
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('initial', response.data.initial);
        navigate("/D");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className='ody'>
      <h2>Welcome to Easy Cheque Printing</h2>
      {error && <p>{error}</p>}
      <div className='login-container'>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;


