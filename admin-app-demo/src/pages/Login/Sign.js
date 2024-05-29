// import React, { useState } from 'react';
// import axios from 'axios';
// import  api from '../../api/index'
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import './Login.css'


// function SignUp() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [company, setCompany] = useState('');
//   const [error, setError] = useState('');
//   const navigate=useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/register', { firstName, lastName, email, password, company });
//       // Handle successful registration (e.g., display a success message)
//       console.log(response);
//       if(response.data.message=="User registered successfully"){
//         localStorage.setItem('user', JSON.stringify(response.data.user));
//         navigate("/D")
//       }
//     } catch (err) {
//       setError(err.response.data.message);
//     }
//   };

//   return (
//     <div className='sign'>
//       <h2></h2>
//       {error && <p>{error}</p>}
//      <div className='login-container'>
//      <form onSubmit={handleSubmit}>
//         <div>
//           <label>First Name:</label>
//           <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//         </div>
//         <div>
//           <label>Last Name:</label>
//           <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <div>
//           <label>Company:</label>
//           <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
//         </div>
//         <Link to="/D">
//         <button onClick={handleSubmit}>Sign Up</button>
//         </Link>
//         Already Have an Account?
//         <Link to="/">
//         <button>Login</button>
//         </Link>
//       </form>
//      </div>
//     </div>
//   );
// }

// export default SignUp;


// SignUp.js
import React, { useState } from 'react';
import api from '../../api/index';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/register', { firstName, lastName, email, password, company });
      if (response.data.message === "User registered successfully") {
        localStorage.setItem('initial', firstName);
        navigate("/D");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className='sign'>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <div className='login-container'>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label>Company:</label>
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
          <button type="submit">Sign Up</button>
          <p>Already Have an Account? <Link to="/">Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

