import React from "react";
import './AddPayee.css'
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
                   PayeeName<span style={{ color: 'red' }}>*</span>:
          <input
            type="text" id="PayeeName" name="PayeeName"
            value={rest.PayeeName}
            onChange={handleEditOnChange}
            required
          />
        </label>
        <label>
          ContactNumber<span style={{ color: 'red' }}>*</span>:
          <input
            type="text" id="ContactNo" name="ContactNo"
            value={rest.ContactNo}
            onChange={handleEditOnChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text" id="City" name="City" value={rest.City}
            onChange={handleEditOnChange}
        
            
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


