import './App.css';
import DoctorLoginPage from './pages/DoctorLoginPage';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import DoctorSignup from './pages/DoctorSignup';
import HomePage from './pages/HomePage';
import { useState } from 'react';
import { loginContext } from './contexts/LoginContext';
import HeadBar from './components/HeadBar';
import Appointments from './pages/operational_pages/Appointments';
import Consultancy from './pages/operational_pages/Consultancy';
import Messenging from './pages/operational_pages/Messenging';
import EditProfile from './pages/operational_pages/EditProfile';
import HistoryPage from './pages/operational_pages/HistoryPage';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <>
    <ToastContainer/>
    <loginContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
    <BrowserRouter>
    <HeadBar/>
      <Switch>
        <Route path='/login' component={DoctorLoginPage}/>
        <Route path='/signup' component={DoctorSignup}/>
        <Route exact path='/' component={HomePage} />
        {/* Operational Pages */}
        <Route exact path='/history' component={HistoryPage}/>
        <Route path='/appointments' component={Appointments}/>
        <Route path='/consultancy/:id' component={Consultancy}/>
        <Route path='/messenging' component={Messenging} />
        <Route path='/edit_profile' component={EditProfile}/>
      </Switch>
    </BrowserRouter>
    </loginContext.Provider>
    </>
  );
}

export default App;
