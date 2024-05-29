import React from "react";
import './AddBank.css'

const Formtable=({handleADD,handleOnChange,handleClose,rest})=>{
    return(
        <div className="add-bank-form">
        <form onSubmit={handleADD}>
  
         
          <label>
          Bank Name<span style={{ color: 'red' }}>*</span>:
          <input
            type="text" id="bankName" name="bankName"
            value={rest.bankName}
            onChange={handleOnChange}
            required
          />
        </label>
        <label>
          Account Number<span style={{ color: 'red' }}>*</span>:
          <input
            type="text" id="accountNumber" name="accountNumber"
            value={rest.accountNumber}
            onChange={handleOnChange}
            required
          />
        </label>
        <label>
          IFSC Code:
          <input
            type="text" id="ifscCode" name="ifscCode" value={rest.ifscCode}
            onChange={handleOnChange}
        
            
            required
          />
        </label>
        <label>
          Branch Name:
          <input
            type="text"
            id="branchName"
            name="branchName"
            value={rest.branchName}
            
            onChange={handleOnChange}
            required
          />
        </label>
        <button type="submit">Add Bank</button>
        
        
        </form>
  
      </div>
    )
}
export default Formtable;