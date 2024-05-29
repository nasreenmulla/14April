// import React, { Component } from 'react'

// export default class Settings extends Component {
//   render() {
//     return (
//       <div className='wrapper'>
//         <div className='centered-component'>
//              settings page
//         </div>
        
//       </div>
//     )
//   }
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../api/index';

const Settings = () => {
  const [printerName, setPrinterName] = useState('');
  const [printOrientation, setPrintOrientation] = useState('');

  useEffect(() => {
    // Fetch settings from backend
    api.get('/api/settings')
      .then(response => {
        const { printerName, printOrientation } = response.data;
        setPrinterName(printerName);
        setPrintOrientation(printOrientation);
      })
      .catch(error => console.error('Error fetching settings:', error));
  }, []);

  const saveSettings = () => {
    const data = { printerName, printOrientation };
    api.put('/api/settings', data)
      .then(response => console.log('Settings saved:', response.data))
      .catch(error => console.error('Error saving settings:', error));
  };

  return (
    <div className='wrapper'>
      <div className='centered-component'>
        <h2>Settings Page</h2>
        <label>Printer Name:</label>
        <select value={printerName} onChange={e => setPrinterName(e.target.value)}>
          <option value='Microsoft Print to pdf'>Microsoft Print to pdf</option>
          <option value='Microsoft XPS Document Writer'>Microsoft XPS Document Writer</option>
          <option value='Fax'>Fax</option>
          <option value='Send To OneNote16'>Send To OneNote16</option>
          <option value='HP laser 103 107 108'>HP laser 103 107 108</option>
          <option value='OneNote(Desktop)'>OneNote(Desktop)</option>
          <option value='OneNote for Windows 10'>OneNote for Windows 10</option>
        </select>
        <label>Print Orientation:</label>
        <select value={printOrientation} onChange={e => setPrintOrientation(e.target.value)}>
          <option value='portrait'>Portrait</option>
          <option value='landscape'>Landscape</option>
          
          
          <option value='landscape-center'>Landscape Center</option>
          <option value='ex-landscape-center'>Ex-Landscape Center</option>
          
        </select>
        <button onClick={saveSettings}>Save Settings</button>
      </div>
    </div>
  );
};

export default Settings;
