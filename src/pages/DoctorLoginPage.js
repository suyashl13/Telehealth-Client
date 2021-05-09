/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DoctorDetailsForm from '../components/DoctorDetailsForm';
import { loginContext } from '../contexts/LoginContext';
import { baseURL } from '../env';
import '../pages/doctor-login-page.css'

export default function DoctorLoginPage() {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const loginCtx = useContext(loginContext)
    const [authorize, setAuthorize] = useState(true)

    const performLogin = async ({email, password}) => {
        if (password.length < 6) {
            setCredentials({...credentials, password:''})
            toast('Password cannot be smaller than 6 chars.', {position:"bottom-center", type:'info'});
            return 0;
        }
        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)
        await axios.post(
            baseURL + 'users/signin/',
            formData
        ).then(
           (e) => {
                if (!e.data.user?.is_doctor) {
                    toast('Only Doctors can access this page.',{type:"error", position:'bottom-center'})
                    return 1
                } else {
                    console.log(e.data)
                    localStorage.setItem('id',e.data.user?.id)
                    localStorage.setItem('authtoken', e.data.auth_token)
                    // eslint-disable-next-line eqeqeq
                    if (e.data?.doctor_details === false) {
                        setAuthorize(false)
                        return 0;
                    }
                    console.log(!e.data.doctor_details.is_authorized)
                    if (!e.data.doctor_details.is_authorized) {
                        toast("Waiting for admin authorization.", {type:'warning', position:'bottom-center'})
                        return 0;               
                    }
                    loginCtx.setIsLoggedIn(true)
                }
            }
        ).catch(
            err => {
                console.log(err)
                if (err.response.data.ERR === 'Invalid auth credentials') {
                    setCredentials({email:'', password:''})
                    toast("Incorrect login credentials.",{type:'error', position:'bottom-center'})   
                }
                if (err.response.data.ERR === 'Account with this email doesnot exsists.') {
                    setCredentials({email:'', password:''})
                    toast("Email not registered.",{type:'error', position:'bottom-center'})   
                }
            }
        )
    }



    useEffect(() => {
        document.addEventListener('keypress', enterToSubmit)
    }, [])

    const enterToSubmit = (e) => {
        if (e.key === "enter") {
            performLogin(credentials)
        }
    }

    if (!authorize) {
        return <DoctorDetailsForm/>
    }

    if(loginCtx.isLoggedIn) {
        return <Redirect to='/' />
    }

    return (
        <div className='container-fluid loginpage-container'>
            <div></div>
            <h2 className="title">Telehealth - Doctor Login</h2>
            {
                authorize ? <div className="card login-card mb-5">
                <span className="login-typo">Login to Doctor Dashboard</span>
                <form onSubmit={e=>e.preventDefault()} className="login-form">
                    <input required value={credentials.email} onChange={(e)=>{setCredentials({...credentials, email: e.target.value})}} type="email" placeholder='Email' className="form-control"/>
                    <input required value={credentials.password} onChange={(e)=>{setCredentials({...credentials, password: e.target.value})}} type="password" placeholder='Password' className="form-control mt-2"/>
                    <center><button id="login" onClick={e=>performLogin(credentials)} className="btn btn-outline-primary mt-3">Login</button></center>
                </form>
            </div> : <div className="card"><DoctorDetailsForm/></div>
            }
            <div>Dont have account ? <Link to='/signup' className='text-light'>Create One</Link></div>
            <div></div>
        </div>
    )
}
