import  api from '../../api/index'
import axios from 'axios';

import './AddBank.css'
import React, { useState,useEffect } from 'react';
import Formtable from './Form';
import Update from './Update';


const AddBankForm = ({ addBank }) => {
  const [addSection,setAddSection]=useState(false)
  const [editSection,setEditsection]=useState(false)
  
  const [bankDetails, setBankDetails] = useState([]); 
 
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState([]);

 
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [bankEntries, setBankEntries] = useState([]);

  useEffect(() => {
    fetchBankEntries();
  }, [pageSize, searchQuery]);

  const fetchBankEntries = async () => {
    try {
      const response = await api.get(`/api/bankEntries?pageSize=${pageSize}&searchQuery=${searchQuery}`);
      setBankEntries(response.data);
    } catch (error) {
      console.error('Error fetching bank entries:', error);
    }
  };

  const [formData,setFormData]=useState({
    
    bankName:"",
  
    accountNumber:"",
    ifscCode:"",
    branchName:"",
  })
  const [formDataEdit,setFormDataEdit]=useState({
    bankName:"",
  
    accountNumber:"",
    ifscCode:"",
    branchName:"",
    _id:""
  
  })

  const [dataList,setDataList]=useState([])

  const handleOnChange=(e)=>{
         const {value,name}=e.target
         setFormData((preve)=>{
          return {
            ...preve,
            [name]:value
          }
         })
  }


  const handleADD = async (e) => {
    e.preventDefault();
    try {
        const data = await api.post("/createB", formData);
        console.log(data);
        if (data.data.success) {
            setAddSection(false);
            alert(data.data.message);
            fetchBankEntries();
            setFormData({
                bankName: "",
                accountNumber: "",
                ifscCode: "",
                branchName: ""
            });
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // Duplicate entry error
            alert("Bank with the same account number already exists. Please search.");
        } else {
            // Other errors
            console.error('Error adding bank entry:', error);
            alert('An error occurred while adding the bank entry. Please try again later.');
        }
    }
};


  const handleDelete=async(id)=>{
    const data=await api.delete("/deleteB/"+id)
    // alert(data.data.message)
    if(data.data.success){
      fetchBankEntries();
      alert(data.data.message)
    }
  }

  const handleUpdate=async(e)=>{
    e.preventDefault();
    const data=await api.put("/updateB/",formDataEdit)
    if(data.data.success){
      fetchBankEntries();
      alert(data.data.message)
      setEditsection(false)
    }
    console.log()
  }
  const handleEditOnChange=async(e)=>{
    const {value,name}=e.target
    setFormDataEdit((preve)=>{
     return {
       ...preve,
       [name]:value
     }
    })
  }

  const handleEdit=(el)=>{
    setFormDataEdit(el)
    setEditsection(true)
  }
  return (
  <div className='Awrapper'>
      <Formtable

      handleADD={handleADD}
      handleOnChange={handleOnChange}
      handleClose={()=>setAddSection(false)}

      rest={formData}
      />
    {
      editSection &&(
        <Update
       handleADD={handleUpdate}
      handleEditOnChange={handleEditOnChange}
      handleClose={()=>setEditsection(false)}
      rest={formDataEdit}
      />

        
      )
    }  
  

<div className="table-container">
  <div className="table-header">
    <div className='Entry'>
      <label>Show entries:</label>
      <select  value={pageSize} onChange={(e) => setPageSize(e.target.value)} >
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="all">All</option>
      </select>
    </div>
    <div className='Search'>
    
    <label>Search...</label><input type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by bank name, IFSC code, or account number"/>
       
      
      
    </div>
  </div>

 <div>
   <table className="bank-table">
    <thead>
      <tr>
        <th>Bank Name</th>
        <th>Account Number</th>
        <th>IFSC Code</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    { 
            bankEntries.map((el)=>{
              return(
                <tr>
                  <td>{el.bankName}</td>
                  <td>{el.accountNumber}</td>
                  <td>{el.ifscCode}</td>
                  <td>
                    <button className='btn btn-edit' onClick={()=>handleEdit(el)} >Edit</button>
                    <button className='btn btn-delete' onClick={()=>handleDelete(el._id)}>Delete</button>

                  </td>
                </tr>
              )
              
            })
           
            
            
            
          }

      {/* Static Rows */}
     
   
    </tbody>
  </table>
 </div>
 </div>

    
</div>
  );
};

export default AddBankForm;



