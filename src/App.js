import './App.css';
import DoctorLoginPage from './pages/DoctorLoginPage';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import DoctorSignup from './pages/DoctorSignup';
import HomePage from './pages/HomePage';
import { useContext, useState } from 'react';
import { loginContext } from './contexts/LoginContext';
import HeadBar from './components/HeadBar';
import Appointments from './pages/operational_pages/Appointments';
import Consultancy from './pages/operational_pages/Consultancy';
import History from './pages/operational_pages/History';
import Messenging from './pages/operational_pages/Messenging';
import Profile from './pages/operational_pages/Profile';

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
        <Route path='/appointments' component={Appointments}/>
        <Route path='/consultancy' component={Consultancy}/>
        <Route path='/history' component={History} />
        <Route path='/messenging' component={Messenging} />
        <Route path='/profile' component={Profile} />
      </Switch>
    </BrowserRouter>
    </loginContext.Provider>
    </>
  );
}

export default App;
