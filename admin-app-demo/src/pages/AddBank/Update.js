import React from "react";
import './AddBank.css'
import { useEffect,useRef } from "react";

const Update=({handleADD,handleEditOnChange,handleClose,rest})=>{

  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current.classList.add("show");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleADD(e);
    handleClose();
  };


    return(

      <div ref={modalRef} className="modal-container">
      <div className="modal-content">
        <div className="add-bank-form">
          <form onSubmit={handleSubmit}>
            {/* Your form inputs here */}
                <label>
                   Bank Name<span style={{ color: 'red' }}>*</span>:
          <input
            type="text" id="bankName" name="bankName"
            value={rest.bankName}
            onChange={handleEditOnChange}
            required
          />
        </label>
        <label>
          Account Number<span style={{ color: 'red' }}>*</span>:
          <input
            type="text" id="accountNumber" name="accountNumber"
            value={rest.accountNumber}
            onChange={handleEditOnChange}
            required
          />
        </label>
        <label>
          IFSC Code:
          <input
            type="text" id="ifscCode" name="ifscCode" value={rest.ifscCode}
            onChange={handleEditOnChange}
        
            
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
            
            onChange={handleEditOnChange}
            required
          />
        </label>
            <button type="submit" className="update-button">Update</button>
            <button onClick={handleClose}>Close</button>
          </form>
        </div>
      </div>
    </div>
    )
}
export default Update;


