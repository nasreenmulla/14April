
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Draggable from 'react-draggable';
import api from '../../api/index';
import numberToWords from 'number-to-words';
import Ac from './Acc.jpeg';
import cheque from './b.webp';
import './Select.css'

const Select = () => {
  const [bselect,setBselect]=useState('');
  const [dselect,setDselect]=useState('');
  const [pselect,setPselect]=useState('');
  const [aselect,setAselect]=useState('');
  const [wselect,setWselect]=useState('');
  const [datePosition, setDatePosition] = useState(null);
  const [payeeNamePosition, setPayeeNamePosition] = useState(null);
  const [amountInWordsPosition, setAmountInWordsPosition] = useState(null);
  const [amountPosition, setAmountPosition] = useState(null);
  const [selectedBank, setSelectedBank] = useState('');
  const [banks, setBanks] = useState([]);
  const [payees, setPayees] = useState([]);
  const [selectedPayee, setSelectedPayee] = useState('');
  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState('');
  const [amountInWords, setAmountInWords] = useState('');
  const [isSecurityCheque, setIsSecurityCheque] = useState(false);
  const [isAc, setIsAc] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
    const [settings, setSettings] = useState({ printerName: 'Microsoft Print to PDF',  printOrientation: 'portrait' });

  const [printedBank, setPrintedBank] = useState('');
const [printedPayee, setPrintedPayee] = useState('');

// Update the state whenever dropdown values change
const handleBankChange = (event) => {
  setSelectedBank(event.target.value);
  setPrintedBank(event.target.value); // Update printed bank value
};

const handlePayeeChange = (event) => {
  setSelectedPayee(event.target.value);
  setPrintedPayee(event.target.value);
  setPselect(event.target.value) // Update printed payee value
};

  useEffect(() => {
    fetchBanks();
    fetchSettings();
  }, []);

  const fetchBanks = async () => {
    try {
      const response = await api.get('/getbank');
      setBanks(response.data.data);
    } catch (error) {
      console.error('Error fetching banks:', error);
    }
  };

  useEffect(() => {
    if (selectedBank) {
      fetchData();
    }
  }, [selectedBank]);

  useEffect(() => {
    fetchPayees();
  }, []);

  const fetchPayees = async () => {
    try {
      const response = await api.get('/getpayee');
      setPayees(response.data.data);
    } catch (error) {
      console.error('Error fetching payees:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await api.get('/api/cheques', {
        params: {
          bank: selectedBank,
        },
      });
      const { datePosition, payeeNamePosition, amountInWordsPosition, amountPosition } = response.data;
      setDatePosition(datePosition);
      setPayeeNamePosition(payeeNamePosition);
      setAmountInWordsPosition(amountInWordsPosition);
      setAmountPosition(amountPosition);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleDateChange = (date) => {
    setDate(date);
    setDselect(date)
  };

  const handleAmountChange = (event) => {
    const inputAmount = event.target.value;
    setAmount(inputAmount);
    setAselect(event.target.value)

    // Convert amount to words
    const amountInWords = numberToWords.toWords(inputAmount) + ' only';
    setAmountInWords(amountInWords);
    setWselect(event.target.value);
  };

  const handleSecurityChequeChange = () => {
    setIsSecurityCheque(!isSecurityCheque);
    // Reset date when security cheque is toggled
    setDate(null);
  };

  const handleAc = () => {
    setIsAc(!isAc);
  };
  const handlePrint = () => {
    setIsPrinting(true);
    const printableElement = document.querySelector('.container');
    if (printableElement) {
      // Clone the content of the printable element
      const copiedContent = printableElement.cloneNode(true);
  
      // Hide checkboxes and labels for printing
      const checkboxes = copiedContent.querySelectorAll('input[type="checkbox"]');
      const labels = copiedContent.querySelectorAll('label');
      checkboxes.forEach((checkbox) => {
        checkbox.style.display = 'none';
      });
      labels.forEach((label) => {
        label.style.display = 'none';
      });
  
      // Inject print styles into the document head
      const style = document.createElement('style');
      style.textContent = printStyles;
      document.head.appendChild(style);
  
      // Open a new window for printing
      const printWindow = window.open('', '_blank');
      printWindow.document.write(copiedContent.outerHTML);
      printWindow.document.close();
  
      // Apply print orientation and scaling
      const printBody = printWindow.document.body;
      let transformStyle = '';
  
      if (settings.printOrientation === 'landscape') {
        transformStyle = 'rotate(90deg) translateY(-100%)';
        printBody.style.width = '100vh';
        printBody.style.height = '100vw';
      } else if (settings.printOrientation === 'ex-landscape-center') {
        transformStyle = 'rotate(270deg) translateY(100%)';
        printBody.style.width = '100vh';
        printBody.style.height = '100vw';
      } else if (settings.printOrientation === 'landscape-center') {
        transformStyle = 'rotate(90deg) translateX(-50%) translateY(-50%)';
        printBody.style.width = '100vh';
        printBody.style.height = '100vw';
      } else if (settings.printOrientation === 'portrait') {
        transformStyle = 'rotate(0deg) translateY(0)';
        printBody.style.width = '100vw';
        printBody.style.height = '100vh';
      }
  
      // Apply the transform and scaling
      printBody.style.transform = `${transformStyle} scale(0.7)`; // Adjust the scale value as needed
      printBody.style.transformOrigin = 'center center';
      printBody.style.margin = '0';
      printBody.style.padding = '0';
      printBody.style.overflow = 'hidden';
  
      // Minimize page margins
      const printStyle = document.createElement('style');
      printStyle.textContent = `
        @page {
          size: auto;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
        }
      `;
      printWindow.document.head.appendChild(printStyle);
  
      // Print the window
      printWindow.print();
  
      printWindow.onafterprint = () => {
        setIsPrinting(false);
        checkboxes.forEach((checkbox) => {
          checkbox.style.display = 'inline-block';
        });
        labels.forEach((label) => {
          label.style.display = 'inline-block';
        });
        // Remove the print styles after printing
        style.remove();
        printStyle.remove();
      };
    } else {
      console.error('Printable element not found.');
    }
  };
  
 
  // const handlePrint = () => {
  //   setIsPrinting(true);
  //   const printableElement = document.querySelector('.container');
  //   if (printableElement) {
  //     // Clone the content of the printable element
  //     const copiedContent = printableElement.cloneNode(true);
  
  //     // Hide checkboxes and labels for printing
  //     const checkboxes = copiedContent.querySelectorAll('input[type="checkbox"]');
  //     const labels = copiedContent.querySelectorAll('label');
  //     checkboxes.forEach((checkbox) => {
  //       checkbox.style.display = 'none';
  //     });
  //     labels.forEach((label) => {
  //       label.style.display = 'none';
  //     });
  
  //     // Inject print styles into the document head
  //     const style = document.createElement('style');
  //     style.textContent = printStyles;
  //     document.head.appendChild(style);
  
  //     // Open a new window for printing
  //     const printWindow = window.open('', '_blank');
  //     printWindow.document.write(copiedContent.outerHTML);
  //     printWindow.document.close();
  
  //     // Apply print orientation and scaling
   
  //     const printBody = printWindow.document.body;
  //     let transformStyle = '';
  
  //     if (settings.printOrientation === 'landscape') {
  //       transformStyle = 'rotate(90deg) translateY(-100%)';
  //       printBody.style.width = '100vh';
  //       printBody.style.height = '100vw';
  //     } else if (settings.printOrientation === 'ex-landscape-center') {
  //       transformStyle = 'rotate(270deg) translateY(100%)';
  //       printBody.style.width = '100vh';
  //       printBody.style.height = '100vw';
  //     } else if (settings.printOrientation === 'landscape-center') {
  //       transformStyle = 'rotate(90deg) translateX(-50%) translateY(-50%)';
  //       printBody.style.width = '100vh';
  //       printBody.style.height = '100vw';
  //     } else if (settings.printOrientation === 'portrait') {
  //       transformStyle = 'rotate(0deg) translateY(0)';
  //       printBody.style.width = '100vw';
  //       printBody.style.height = '100vh';
  //     }
  
  //     printBody.style.transform = transformStyle;
  //     printBody.style.transformOrigin = 'center center';
  //     printBody.style.margin = '0';
  //     printBody.style.padding = '0';
  //     printBody.style.overflow = 'hidden';
  
  //     // Scale down content to fit a single page
  //     printBody.style.transform += ' scale(0.8)'; // Adjust the scale value as needed
  
  //     // Print the window
  //     printWindow.print();
  
  //     printWindow.onafterprint = () => {
  //       setIsPrinting(false);
  //       checkboxes.forEach((checkbox) => {
  //         checkbox.style.display = 'inline-block';
  //       });
  //       labels.forEach((label) => {
  //         label.style.display = 'inline-block';
  //       });
  //       // Remove the print styles after printing
  //       style.remove();
  //     };
  //   } else {
  //     console.error('Printable element not found.');
  //   }
  // };
  
  
    const fetchSettings = async () => {
    try {
      const response = await api.get('/api/settings'); // Adjust the endpoint as needed
      setSettings(response.data);
      console.log(response.data.printOrientation)

    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const setInputWidth = (inputValue) => {
    const inputLength = inputValue ? inputValue.length : 0;
    const minWidth = 100;
    const width = Math.max(minWidth, inputLength * 8);
    return {
      width: `${width}px`,
    };
  };
  const handleubmit = async () => {
    try {
      // Save positions to the database for the selected bank
      const sData = {
        bselect,
        dselect,
        pselect,
        aselect,
        wselect,
      };
      await api.post('/registerSelect', sData);
      alert('Positions saved successfully');
    } catch (error) {
      console.error('Error saving positions:', error);
      alert('Error saving positions');
    }
  };


  return (
    <div >
      <div className="container" style={containerStyle}>
        <div>
          <h1 style={dd}>Selected cheque</h1>
          <select onChange={handleBankChange}  value={bselect}  name='selectedBank'>
            
            <option value="" >Select Bank</option>
            {/* <input value={selectedBank} ></input> */}
            {banks.map((bank) => (
              <option key={bank.id} value={bank.id}>
                {bank.bankName}
              </option>
            ))}
          </select>
        </div>
        <div  style={cheo}>
          <label>SecurityCheque:</label>
          <input type="checkbox" checked={isSecurityCheque} onChange={handleSecurityChequeChange} />
        </div>
        <br />
        <div style={chet}>
          <label>AccountPayee:</label>
          <input type="checkbox" checked={isAc} onChange={handleAc} />
        </div>
       

        {selectedBank && (
          <div className="Drag" >
            <div style={{ display: 'inline-block', Left: '150px',bottom:'40px' }}>
              {isAc && (
                <div>
                  <img src={Ac} alt="Accountpayee" width="89px" />
                </div>
              )}
            </div>
            <Draggable>
              <div
                style={{
                  position: 'absolute',
                  left: `${payeeNamePosition?.x}px`,
                  // left: `${(payeeNamePosition?.x ?? 0) + 200}px`,
                  marginLeft:'190px',
                  // marginTop:'40px',
                  top: `${payeeNamePosition?.y}px`,
                  width: '450px',//it was 250
                }}>
                <h4> PayeeName:</h4>
                <select value={pselect} onChange={handlePayeeChange} name='selectedPayee'>
                  <option value="">Select Payee</option>
                  {/* <input value={selectedPayee}></input> */}
                  {payees.map((payee) => (
                    <option key={payee.id} value={payee.id}>
                      {payee.PayeeName}
                    </option>
                  ))}
                </select>
              </div>
            </Draggable>
            {!isSecurityCheque && (
              <Draggable>
                <div style={{ position: 'absolute',
                 left: `${datePosition?.x}px`, 
                 marginLeft:'190px',
                //  marginTop:'40px',
                // left: `${(payeeNamePosition?.x ?? 0) + 200}px`,
                 top: `${datePosition?.y}px`, width: '250px' }}>
                  <h4>Date:</h4>
                  <DatePicker selected={date} onChange={handleDateChange} dateFormat="yyyy-MM-dd" />
                </div>
              </Draggable>
            )}
            <Draggable>
              <div
                style={{
                  position: 'absolute',
                  left: `${amountInWordsPosition?.x}px`,
                  // left: `${(payeeNamePosition?.x ?? 0) + 200}px`,
                  marginLeft:'190px',
                  // marginTop:'40px',
                  top: `${amountInWordsPosition?.y}px`,
                  ...setInputWidth(amountInWords),
                }}>
                <h4>AmountinWords:</h4>
                <input value={amountInWords} type="text" readOnly style={setInputWidth(amountInWords)} />
              </div>
            </Draggable>
            <Draggable>
              <div
                style={{
                  position: 'absolute',
                  left: `${amountPosition?.x}px`,
                  //  left: `${(payeeNamePosition?.x ?? 0) + 200}px`
                  marginLeft:'190px',
                  // marginTop:'40px',
                  top: `${amountPosition?.y}px`,
                  ...setInputWidth(amount),
                }}>
                <h4>Amount:</h4>
                <input placeholder="Enter Amount" value={amount} onChange={handleAmountChange} type="text" style={setInputWidth(amount)} />
              </div>
            </Draggable>
            <div style={chett}>
         <label>No:</label>
         <input placeholder='enterchequenumber' style={{width:'150px',height:'40px'}}></input>
        </div>
           <button onClick={handleubmit}> submit</button>
            <button style={pp} onClick={handlePrint}>Print</button>
          </div>
        )}

             
      </div>

    </div>
  );
};




const containerStyle = {
  border: '2px solid #ccc',
  padding: '40px',
  backgroundColor: 'light gray',
  width: '1750px',//1100
  height: '600px',
  margin: '0 auto',
  // marginLeft: '350px',
  marginLeft:'270px',
  marginTop: '140px',
};

const dd = {};
// const che={
//    display: 'inline-block', Left: '150px',bottom:'40px'
// }
const cheo = {
  // width:'10px',
  position: 'fixed',
  bottom: '40px',
  left: '25%',
  transform: 'translateX(-50%)',
};
const chet = {
  // width:'10px',
  position: 'fixed',
  bottom: '40px',
  left: '90%',
  transform: 'translateX(-50%)',
};
const chett = {
  // width:'10px',
  position: 'fixed',
  bottom: '40px',
  left: '36%',
  transform: 'translateX(-50%)',
};
const pp={
  position: 'fixed',
  bottom: '25px',
  left: '55%',
  transform: 'translateX(-50%)',
}
const printStyles = `
  @media print {
    .container {
      width: auto !important; // Allow container to expand to fit the page
      border: none !important; // Remove border for printing
      background-color: white !important; // Set background color to white for printing
      padding: 0 !important; // Remove padding for printing
    }
    .Drag {
      overflow: hidden !important; /* Ensure no overflow issues */
    }
    input[type="checkbox"] {
      display: none !important; // Hide checkboxes when printing
    }
    label {
      display: none !important; // Hide labels when printing
    }
  }
`;


export default Select;


// import React, { useState, useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Draggable from 'react-draggable';
// import api from '../../api/index';
// import numberToWords from 'number-to-words';
// import Ac from './Acc.jpeg';
// import cheque from './b.webp';
// import Settings from '../Settings/Settings.js';

// const Select = () => {
//   const [bselect, setBselect] = useState('');
//   const [dselect, setDselect] = useState('');
//   const [pselect, setPselect] = useState('');
//   const [aselect, setAselect] = useState('');
//   const [wselect, setWselect] = useState('');
//   const [datePosition, setDatePosition] = useState(null);
//   const [payeeNamePosition, setPayeeNamePosition] = useState(null);
//   const [amountInWordsPosition, setAmountInWordsPosition] = useState(null);
//   const [amountPosition, setAmountPosition] = useState(null);
//   const [selectedBank, setSelectedBank] = useState('');
//   const [banks, setBanks] = useState([]);
//   const [payees, setPayees] = useState([]);
//   const [selectedPayee, setSelectedPayee] = useState('');
//   const [date, setDate] = useState(null);
//   const [amount, setAmount] = useState('');
//   const [amountInWords, setAmountInWords] = useState('');
//   const [isSecurityCheque, setIsSecurityCheque] = useState(false);
//   const [isAc, setIsAc] = useState(false);
//   const [isPrinting, setIsPrinting] = useState(false);
//   const [settings, setSettings] = useState({ printerName: 'Microsoft Print to PDF', orientation: 'Portrait' });

//   const [printedBank, setPrintedBank] = useState('');
//   const [printedPayee, setPrintedPayee] = useState('');

//   useEffect(() => {
//     fetchBanks();
//     fetchSettings();
//   }, []);

//   const fetchBanks = async () => {
//     try {
//       const response = await api.get('/getbank');
//       setBanks(response.data.data);
//     } catch (error) {
//       console.error('Error fetching banks:', error);
//     }
//   };

//   useEffect(() => {
//     if (selectedBank) {
//       fetchData();
//     }
//   }, [selectedBank]);

//   const fetchSettings = async () => {
//     try {
//       const response = await api.get('/api/settings'); // Adjust the endpoint as needed
//       setSettings(response.data);
//     } catch (error) {
//       console.error('Error fetching settings:', error);
//     }
//   };

//   const fetchPayees = async () => {
//     try {
//       const response = await api.get('/getpayee');
//       setPayees(response.data.data);
//     } catch (error) {
//       console.error('Error fetching payees:', error);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const response = await api.get('/api/cheques', {
//         params: {
//           bank: selectedBank,
//         },
//       });
//       const { datePosition, payeeNamePosition, amountInWordsPosition, amountPosition } = response.data;
//       setDatePosition(datePosition);
//       setPayeeNamePosition(payeeNamePosition);
//       setAmountInWordsPosition(amountInWordsPosition);
//       setAmountPosition(amountPosition);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleBankChange = (event) => {
//     setSelectedBank(event.target.value);
//     setPrintedBank(event.target.value);
//   };

//   const handlePayeeChange = (event) => {
//     setSelectedPayee(event.target.value);
//     setPrintedPayee(event.target.value);
//   };

//   const handleDateChange = (date) => {
//     setDate(date);
//     setDselect(date);
//   };

//   const handleAmountChange = (event) => {
//     const inputAmount = event.target.value;
//     setAmount(inputAmount);
//     setAselect(event.target.value);

//     const amountInWords = numberToWords.toWords(inputAmount) + ' only';
//     setAmountInWords(amountInWords);
//     setWselect(event.target.value);
//   };

//   const handleSecurityChequeChange = () => {
//     setIsSecurityCheque(!isSecurityCheque);
//     setDate(null);
//   };

//   const handleAc = () => {
//     setIsAc(!isAc);
//   };

//   const handlePrint = () => {
//     setIsPrinting(true);
//     const printableElement = document.querySelector('.container');
//     if (printableElement) {
//       const selectedBankValue = printedBank;
//       const selectedPayeeValue = printedPayee;

//       const copiedContent = printableElement.cloneNode(true);

//       const bankSelectElement = copiedContent.querySelector('select[name="selectedBank"]');
//       if (bankSelectElement) {
//         bankSelectElement.value = selectedBank;
//       }

//       const payeeSelectElement = copiedContent.querySelector('select[name="selectedPayee"]');
//       if (payeeSelectElement) {
//         payeeSelectElement.value = selectedPayee;
//       }

//       const checkboxes = copiedContent.querySelectorAll('input[type="checkbox"]');
//       const labels = copiedContent.querySelectorAll('label');
//       checkboxes.forEach((checkbox) => {
//         checkbox.style.display = 'none';
//       });
//       labels.forEach((label) => {
//         label.style.display = 'none';
//       });

//       const style = document.createElement('style');
//       style.textContent = printStyles;
//       document.head.appendChild(style);

//       const printWindow = window.open('', '_blank');
//       printWindow.document.write(copiedContent.outerHTML);
//       printWindow.document.close();

//       // Apply orientation
//       if (settings.orientation === 'Landscape') {
//         printWindow.document.body.style.transform = 'rotate(90deg)';
//         printWindow.document.body.style.transformOrigin = 'left top';
//         printWindow.document.body.style.width = '100vh';
//         printWindow.document.body.style.height = '100vw';
//       } else if (settings.orientation === 'Ex-Landscape') {
//         printWindow.document.body.style.transform = 'rotate(270deg)';
//         printWindow.document.body.style.transformOrigin = 'right bottom';
//         printWindow.document.body.style.width = '100vh';
//         printWindow.document.body.style.height = '100vw';
//       } else if (settings.orientation === 'Landscape Center') {
//         printWindow.document.body.style.transform = 'rotate(90deg) translateX(-50%)';
//         printWindow.document.body.style.transformOrigin = 'center top';
//         printWindow.document.body.style.width = '100vh';
//         printWindow.document.body.style.height = '100vw';
//       }

//       printWindow.print();

//       printWindow.onafterprint = () => {
//         setIsPrinting(false);
//         checkboxes.forEach((checkbox) => {
//           checkbox.style.display = 'inline-block';
//         });
//         labels.forEach((label) => {
//           label.style.display = 'inline-block';
//         });
//         style.remove();
//       };
//     } else {
//       console.error('Printable element not found.');
//     }
//   };

//   return (
//     <div className="container">
//       <div>
//         <label>Select Bank:</label>
//         <select name="selectedBank" value={selectedBank} onChange={handleBankChange}>
//           <option value="">Select Bank</option>
//           {banks.map((bank) => (
//             <option key={bank._id} value={bank.name}>
//               {bank.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label>Select Payee:</label>
//         <select name="selectedPayee" value={selectedPayee} onChange={handlePayeeChange}>
//           <option value="">Select Payee</option>
//           {payees.map((payee) => (
//             <option key={payee._id} value={payee.name}>
//               {payee.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label>Select Date:</label>
//         <DatePicker selected={date} onChange={handleDateChange} />
//       </div>
//       <div>
//         <label>Enter Amount:</label>
//         <input type="number" value={amount} onChange={handleAmountChange} />
//       </div>
//       <div>
//         <label>Amount in Words:</label>
//         <input type="text" value={amountInWords} readOnly />
//       </div>
//       <div>
//         <label>Is Security Cheque:</label>
//         <input type="checkbox" checked={isSecurityCheque} onChange={handleSecurityChequeChange} />
//       </div>
//       <div>
//         <label>Is A/C Payee Only:</label>
//         <input type="checkbox" checked={isAc} onChange={handleAc} />
//       </div>
//       <button onClick={handlePrint} disabled={isPrinting}>
//         {isPrinting ? 'Printing...' : 'Print'}
//       </button>
//       <Settings onSave={setSettings} />
//       <div className="cheque-image-container">
//         <img src={cheque} alt="Cheque" className="cheque-image" />
//         {datePosition && (
//           <Draggable position={datePosition} onStop={(e, data) => setDatePosition({ x: data.x, y: data.y })}>
//             <div className="draggable-element">
//               <DatePicker selected={date} onChange={handleDateChange} />
//             </div>
//           </Draggable>
//         )}
//         {payeeNamePosition && (
//           <Draggable position={payeeNamePosition} onStop={(e, data) => setPayeeNamePosition({ x: data.x, y: data.y })}>
//             <div className="draggable-element">
//               <select name="payee" value={selectedPayee} onChange={handlePayeeChange}>
//                 <option value="">Select Payee</option>
//                 {payees.map((payee) => (
//                   <option key={payee._id} value={payee.name}>
//                     {payee.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </Draggable>
//         )}
//         {amountInWordsPosition && (
//           <Draggable position={amountInWordsPosition} onStop={(e, data) => setAmountInWordsPosition({ x: data.x, y: data.y })}>
//             <div className="draggable-element">
//               <input type="text" value={amountInWords} readOnly />
//             </div>
//           </Draggable>
//         )}
//         {amountPosition && (
//           <Draggable position={amountPosition} onStop={(e, data) => setAmountPosition({ x: data.x, y: data.y })}>
//             <div className="draggable-element">
//               <input type="number" value={amount} onChange={handleAmountChange} />
//             </div>
//           </Draggable>
//         )}
//         {isAc && (
//           <img
//             src={Ac}
//             alt="A/C Payee Only"
//             style={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Select;
// const printStyles = `
//   @media print {
//     .container {
//       width: auto !important; // Allow container to expand to fit the page
//       border: none !important; // Remove border for printing
//       background-color: white !important; // Set background color to white for printing
//       padding: 0 !important; // Remove padding for printing
//     }
//     input[type="checkbox"] {
//       display: none !important; // Hide checkboxes when printing
//     }
//     label {
//       display: none !important; // Hide labels when printing
//     }
//   }
// `;



