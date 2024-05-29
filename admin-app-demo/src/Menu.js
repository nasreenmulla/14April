import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
export default class Menu extends Component {
  render() {
    return (
      <div>
         <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* Brand Logo */}
    <a href="index3.html" className="brand-link">
  
      <span className="brand-text font-weight-light">  Cheque Printing</span>
    </a>
    {/* Sidebar */}
    <div className="sidebar">
    
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
          <li className="nav-item has-treeview menu-open">
            {/* <a href="#" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt" />
              <p>
                Dashboard
              
              </p>
            </a> */}
            <Link to="/" className='nav-link active'>
            <i className="nav-icon fas fa-tachometer-alt" />
              <p>
                Dashboard
              
              </p>
            </Link>
           
          </li>
        
        <li className="nav-item">
          
          <Link to="/select" className="nav-link">
<i className="nav-icon fas fa-university" />
<p>SelectBank</p>
</Link>

</li>
        
          <li className="nav-item has-treeview">
            {/* <a href="#" className="nav-link">
              <i className="nav-icon fas fa-plus-circle" />
              <p>
                 AddPaye
                
              </p>
            </a> */}
            <Link to="/AddP" className='nav-link'>
            <i className="nav-icon fas fa-plus-circle" />
              <p>
                 AddPaye
                
              </p>
            </Link>
           
          </li>
          <li className="nav-item has-treeview">
            {/* <a href="#" className="nav-link">
              <i className="nav-icon fas fa-print" />
              <p>
                BatchPrinting
              </p>
            </a> */}
             <Link to="/BatchP" className='nav-link'>
             <i className="nav-icon fas fa-print" />
              <p>
                 BatchPrinting
                
              </p>
            </Link>
           
          </li>
        
          <li className="nav-item has-treeview">
            {/* <a href="#" className="nav-link">
              <i className="nav-icon fas fa-piggy-bank" />
              <p>
                AddBank
                
              </p>
            </a> */}
            <Link to="/AddB" className="nav-link" >
            <i className="nav-icon fas fa-piggy-bank" />
              <p>
                AddBank
                
              </p>
            </Link>
           
          </li>
          <li className="nav-item has-treeview">
            {/* <a href="#" className="nav-link">
              <i className="nav-icon fas fa-chart-line" />
              <p>
                Report
                
              </p>
            </a> */}
            <Link to="/Report" className="nav-link">
            <i className="nav-icon fas fa-chart-line" />
              <p>
                Report
                </p>
            </Link>
           
          </li>
        
          <li className="nav-item">
            {/* <a href="pages/calendar.html" className="nav-link">
              <i className="nav-icon far fa-calendar-alt" />
              <p>
                Calendar
                
              </p>
            </a> */}
            <Link to="/calender" className='nav-link'>
            <i className="nav-icon far fa-calendar-alt" />
              <p>
                Calendar
                
              </p>
            </Link>
          </li>
          <li className="nav-item">
            {/* <a href="pages/gallery.html" className="nav-link">
              <i className="nav-icon fas fa-cog" />
              <p>
                Settings
              </p>
            </a> */}
            <Link to="/settings" className='nav-link'>
            <i className="nav-icon fas fa-cog" />
              <p>
                Settings
              </p>
            </Link>
          </li>
          <li className="nav-item">
            {/* <a href="pages/gallery.html" className="nav-link">
              <i className="nav-icon fas fa-money-check" />
              <p>
                DesignCheque
              </p>
            </a> */}
            <Link to="/Design" className='nav-link'>
            <i className="nav-icon fas fa-money-check" />
              <p>
                DesignCheque
              </p>
            </Link>
          </li>
          <li className="nav-item">
            {/* <a href="pages/gallery.html" className="nav-link">
              <i className="nav-icon fas fa-user" />
              <p>
                Users
              </p>
            </a> */}
            <Link to="/Users" className='nav-link'>
            <i className="nav-icon fas fa-user" />
              <p>
                Users
              </p>
            </Link>
          </li>
          <li className="nav-item">
            {/* <a href="pages/gallery.html" className="nav-link">
              <i className="nav-icon fas fa-door-open" />
              <p>
                Logout
              </p>
            </a> */}
            <Link to="/" className='nav-link'>
            <i className="nav-icon fas fa-door-open" />
              <p>
                Logout
              </p>
            </Link>
          </li>
         
     
          
        </ul>
      </nav>
   
    </div>
  
  </aside>
      </div>
    )
  }
}
