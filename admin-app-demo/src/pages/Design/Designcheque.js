


import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import api from '../../api/index';
import cheque from './cheque.webp'
import './Design.css'

const Designcheque = () => {
  const [datePosition, setDatePosition] = useState(null);
  const [payeeNamePosition, setPayeeNamePosition] = useState(null);
  const [amountInWordsPosition, setAmountInWordsPosition] = useState(null);
  const [amountPosition, setAmountPosition] = useState(null);
  const [selectedBank, setSelectedBank] = useState('');
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const response = await api.get('/getbank');
      setBanks(response.data.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching banks:', error);
    }
  };

  const handleDragStop = (field, event) => {
    const container = document.querySelector('.design-cheque-container');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const relativeX = event.pageX - containerRect.left;
    const relativeY = event.pageY - containerRect.top;

    switch (field) {
      case 'date':
        setDatePosition({ x: relativeX, y: relativeY });
        break;
      case 'payeeName':
        setPayeeNamePosition({ x: relativeX, y: relativeY });
        break;
      case 'amountInWords':
        setAmountInWordsPosition({ x: relativeX, y: relativeY });
        break;
      case 'amount':
        setAmountPosition({ x: relativeX, y: relativeY });
        break;
      default:
        break;
    }
  };

  const handleSavePositions = async () => {
    try {
      // Save positions to the database for the selected bank
      const positionsData = {
        bank: selectedBank,
        datePosition,
        payeeNamePosition,
        amountInWordsPosition,
        amountPosition,
      };
      await api.post('/po', positionsData);
      alert('Positions saved successfully');
    } catch (error) {
      console.error('Error saving positions:', error);
      alert('Error saving positions');
    }
  };

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  return (
    <div className='Dwrapper'>
      <div className="design-cheque-container" style={containerStyle}>
     <div style={dd}>
     <h1 > Design Your cheque</h1>{/*  */}
     </div>
      <div>
        <label>Select Bank:</label>
        <select value={selectedBank} onChange={handleBankChange}>
          <option value="">Select Bank</option>
          {banks.map((bank) => (
            <option key={bank.id} value={bank.id}>{bank.bankName}</option>
          ))}
        </select>
      </div>
      <div >
      <div className="input-fields " >
        <Draggable 
          defaultPosition={datePosition || { x: 0, y: 0 }}
          onStop={(event, ui) => handleDragStop('date', event, ui)}
        >
          <input type="text" placeholder="Date" style={Input} />
        </Draggable>
        <Draggable  
          defaultPosition={payeeNamePosition || { x: 0, y: 0 }}
          onStop={(event, ui) => handleDragStop('payeeName', event, ui)}
        >
          <input type="text" placeholder="Payee Name" style={Input} />
        </Draggable>
        <Draggable  
          defaultPosition={amountInWordsPosition || { x: 0, y: 0 }}
          onStop={(event, ui) => handleDragStop('amountInWords', event, ui)}
        >
          <input type="text" placeholder="Amount in Words" style={Input} />
        </Draggable>
        <Draggable  
          defaultPosition={amountPosition || { x: 0, y: 0 }}
          onStop={(event, ui) => handleDragStop('amount', event, ui)}
        >
          <input type="text" placeholder="Amount" style={Input} />
        </Draggable>
      </div>
      </div>
      <button onClick={handleSavePositions}>Save Positions</button>
    </div>
    </div>
  );
};

const containerStyle = {
  border: '2px solid #ccc',
  padding: '20px',
  backgroundColor: 'rgba(249, 249, 249, 0.5)', // Light gray with 90% opacity
  width: '1100px', // Example width
  height: '600px', // Example height
  margin: '0 auto', // Centers the container horizontally
  marginLeft: '350px', // Example left margin
  marginTop: '120px',
  
  
};
const Input = {
  width: '200px',
};
const Drag={
  // border: '2px solid #ccc',
  // padding: '20px',
  // backgroundColor: '#f9f9f9',
  // width: '700px', // Example width
  // height: '420px', // Example height
  // margin: '0 auto', // Centers the container horizontally
  // marginLeft: '375px', // Example left margin
  // marginTop: '40px',
  // backgroundImage: `url(${cheque})`, // Replace "path_to_your_image.jpg" with the actual path to your image
  // backgroundSize: 'cover', // Adjusts the size of the background image to cover the entire container
  // backgroundPosition: 'center',
}
const inputfields={
  //  width:'600px',
  //  height:'500px',
  //  marginLeft:'200px',
  //  marginBottom:'20px',
  //  border: '2px solid #ccc',
  //  padding: '20px',
  //  backgroundColor: '#f9f9f9',
}
const dd = {
  marginLeft: '50px',
  backgroundColor: 'lightblue',
  border: '2px solid #ccc',
  height: '150px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
export default Designcheque;
// import React, { useState, useEffect } from 'react';
// import Draggable from 'react-draggable';
// import api from '../../api/index';
// import cheque from './cheque.webp';

// const Designcheque = () => {
//   const [datePosition, setDatePosition] = useState({ x: '0%', y: '0%' });
//   const [payeeNamePosition, setPayeeNamePosition] = useState({ x: '0%', y: '0%' });
//   const [amountInWordsPosition, setAmountInWordsPosition] = useState({ x: '0%', y: '0%' });
//   const [amountPosition, setAmountPosition] = useState({ x: '0%', y: '0%' });
//   const [selectedBank, setSelectedBank] = useState('');
//   const [banks, setBanks] = useState([]);

//   useEffect(() => {
//     fetchBanks();
//   }, []);

//   const fetchBanks = async () => {
//     try {
//       const response = await api.get('/getbank');
//       setBanks(response.data.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error fetching banks:', error);
//     }
//   };

//   const handleDragStop = (field, event, ui) => {
//     const container = document.querySelector('.design-cheque-container');
//     if (!container) return;

//     const containerRect = container.getBoundingClientRect();
//     const relativeX = (ui.x / containerRect.width) * 100;
//     const relativeY = (ui.y / containerRect.height) * 100;

//     switch (field) {
//       case 'date':
//         setDatePosition({ x: `${relativeX}%`, y: `${relativeY}%` });
//         break;
//       case 'payeeName':
//         setPayeeNamePosition({ x: `${relativeX}%`, y: `${relativeY}%` });
//         break;
//       case 'amountInWords':
//         setAmountInWordsPosition({ x: `${relativeX}%`, y: `${relativeY}%` });
//         break;
//       case 'amount':
//         setAmountPosition({ x: `${relativeX}%`, y: `${relativeY}%` });
//         break;
//       default:
//         break;
//     }
//   };

//   const handleSavePositions = async () => {
//     try {
//       const positionsData = {
//         bank: selectedBank,
//         datePosition,
//         payeeNamePosition,
//         amountInWordsPosition,
//         amountPosition,
//       };
//       await api.post('/po', positionsData);
//       alert('Positions saved successfully');
//     } catch (error) {
//       console.error('Error saving positions:', error);
//       alert('Error saving positions');
//     }
//   };

//   const handleBankChange = (event) => {
//     setSelectedBank(event.target.value);
//   };

//   return (
//     <div>
//       <div className="design-cheque-container" style={containerStyle}>
//         <div style={headerStyle}>
//           <h1>Design Your Cheque</h1>
//         </div>
//         <div>
//           <label>Select Bank:</label>
//           <select value={selectedBank} onChange={handleBankChange}>
//             <option value="">Select Bank</option>
//             {banks.map((bank) => (
//               <option key={bank.id} value={bank.id}>{bank.bankName}</option>
//             ))}
//           </select>
//         </div>
//         <div className="input-fields">
//           <Draggable
//             defaultPosition={{ x: 0, y: 0 }}
//             onStop={(event, ui) => handleDragStop('date', event, ui)}
//           >
//             <input type="text" placeholder="Date" style={Input} />
//           </Draggable>
//           <Draggable
//             defaultPosition={{ x: 0, y: 0 }}
//             onStop={(event, ui) => handleDragStop('payeeName', event, ui)}
//           >
//             <input type="text" placeholder="Payee Name" style={Input} />
//           </Draggable>
//           <Draggable
//             defaultPosition={{ x: 0, y: 0 }}
//             onStop={(event, ui) => handleDragStop('amountInWords', event, ui)}
//           >
//             <input type="text" placeholder="Amount in Words" style={Input} />
//           </Draggable>
//           <Draggable
//             defaultPosition={{ x: 0, y: 0 }}
//             onStop={(event, ui) => handleDragStop('amount', event, ui)}
//           >
//             <input type="text" placeholder="Amount" style={Input} />
//           </Draggable>
//         </div>
//         <button onClick={handleSavePositions}>Save Positions</button>
//       </div>
//     </div>
//   );
// };

// const containerStyle = {
//   // border: '2px solid #ccc',
//   // padding: '20px',
//   // backgroundColor: '#f9f9f9',
//   // width: '100%',
//   // height: '100vh',
//   // margin: '0 auto',
//     border: '2px solid #ccc',
//   padding: '20px',
//   backgroundColor: '#f9f9f9',
//   width: '1100px', // Example width
//   height: '600px', // Example height
//   margin: '0 auto', // Centers the container horizontally
//   marginLeft: '350px', // Example left margin
//   marginTop: '120px',
// };

// const Input = {
//   width: '200px',
// };

// const headerStyle = {
//   marginBottom: '20px',
//   backgroundColor: 'lightblue',
//   border: '2px solid #ccc',
//   height: '100px',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
// };

// export default Designcheque;





