import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Menu from './Menu';
import Dashboard from './Dashboard';
import Dashboar from './pages/Dashboar/Dashboar';
import Footer from './Footer';
import { BrowserRouter as Router ,Route, Routes,useLocation} from 'react-router-dom';
// import Allroutes from './Allroutes';

import AddPayee from './pages/AddPayee/AddPayee';
import BatchP from './pages/Batchp/Batchp'
import AddBank from './pages/AddBank/AddBank';
import Report from './pages/Report/Report'
import Calender from './pages/Calender/Calender';
import Settings from './pages/Settings/Settings';
// import Design from './pages/Design/Design'
import Users from './pages/Users/Users';
import Login from './pages/Login/Login'
import SignUp from './pages/Login/Sign';
import Designcheque from './pages/Design/Designcheque';
import Selectcheque from './pages/Select/Selectcheque';



function App() {
  return (
    <div >
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}
function AppContent() {
  // Custom hook to get the current location
  const location = useLocation();

  // Determine whether to show header, menu, and footer based on the route path
  const showHeaderMenuFooter = location.pathname !== '/' && location.pathname !== '/register';

  return (
    <>
      {showHeaderMenuFooter && (
        <>
            <Header /> 
           <Menu />  
        </>
      )}
         <Routes> 
              <Route exact path='/' element={<Login/>}></Route>
              <Route exact path="/D" element={<Dashboard/>}></Route> 
              <Route exact path="/select" element={<Selectcheque/>}></Route>
              <Route exact path='/register' element={<SignUp/>}></Route>
              <Route exact path="/AddP" element={<AddPayee/>}></Route>
              <Route exact path="/BatchP" element={<BatchP/>}></Route> 
              <Route exact path="/AddB" element={<AddBank/>}></Route>
              <Route exact path="/Report" element={<Report/>}></Route>
              <Route exact path="/calender" element={<Calender/>}></Route> 
              <Route exact path="/settings" element={<Settings/>}></Route>
              <Route exact path="/Design" element={<Designcheque/>}></Route>
              <Route exact path="/Users" element={<Users/>}></Route>
              
      </Routes>
   
      {showHeaderMenuFooter && <Footer />}
    </>
  );
}

export default App;



