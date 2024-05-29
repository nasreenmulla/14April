import React from "react";
import './AddPayee.css'

const Formtable=({handleADD,handleOnChange,handleClose,rest})=>{
    return(
        <div className="add-bank-form">
        <form onSubmit={handleADD}>
  
         
          <label>
          PayeeName<span style={{ color: 'red' }}>*</span>:
          <input
            type="text" id="PayeeName" name="PayeeName"
            value={rest.PayeeName}
            onChange={handleOnChange}
            required
          />
        </label>
        <label>
          Contact Number<span style={{ color: 'red' }}>*</span>:
          <input
            type="text" id="ContactNo" name="ContactNo"
            value={rest.ContactNo}
            onChange={handleOnChange}
            required
          />
        </label>
       <label>
         Add Payee City or Location:
          <input
            type="text" id="City" name="City" value={rest.City}
            onChange={handleOnChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            id="Address"
            name="Address"
            value={rest.Address}
            
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