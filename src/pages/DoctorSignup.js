import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import DoctorDetailsForm from '../components/DoctorDetailsForm'
import { baseURL } from '../env'
import '../pages/doctor-signup.css'

export default function DoctorSignup() {

  const [step, setStep] = useState(0)
  const [accountInfo, setAccountInfo] = useState({
    firstName : '',
    lastName : '',
    email : '',
    phone : '',
    birth_year : '',
    gender : 'Male',
    password : '',
    conf_password : '',
    profile_photo : null,
  })



  const createAccountAtBackend = async ({firstName,lastName,email,phone,birth_year,gender,password,conf_password,profile_photo}) => {
    if (firstName === '' || lastName === '' || email === '' || phone === '' || birth_year === '' || gender === '') {
      return 1
    }
    if (password !== conf_password){
      toast('Passwords do not match.', {type:'error', position:"bottom-center"})
      setAccountInfo({...accountInfo, password:'',conf_password:''})
      return 1
    } else if (password.length < 6) {
      toast('Password cannot be smaller than 6 chars.', {type:'error', position:"bottom-center"})
      setAccountInfo({...accountInfo, password:'',conf_password:''})
      return 1
    }

    const formData = new FormData()
    formData.append('name', firstName + ' ' + lastName)
    formData.append('email', email.toString().trim())
    formData.append('phone', phone)
    formData.append('birth_year', birth_year)
    formData.append('gender', gender)
    formData.append('password',password.toString().trim())
    formData.append('is_doctor', true)

    if(profile_photo){
      formData.append('profile_photo', profile_photo)
    }

    axios.post(
      baseURL + 'users/',formData
    ).then(e=>{
      if (e.status === 200) {
        localStorage.setItem('id',e.data.user.id)
        localStorage.setItem('authtoken', e.data.auth_token)
        incrementStep();
      }
    }).catch(e=>{
      if (e.response?.data.ERR === "UNIQUE constraint failed: users_customuser.phone") {
        toast('This Phone is already registered with another account.', {type:'error', position:'bottom-center'})
        setAccountInfo({...accountInfo, phone:""})
        return 1
      }
      if (e.response?.data.ERR === "UNIQUE constraint failed: users_customuser.email") {
        toast('Account with this email already exsists.', {type:'error', position:'bottom-center'})
        setAccountInfo({...accountInfo, email:''})
        return 1
      }
    })
  }

  const incrementStep = () => {
    if (localStorage.getItem('id') && localStorage.getItem('authtoken')) {
      setStep(step+1)
    }
  }

  return (
    <div className='container-fluid loginpage-container'>
    <div></div>
    <h2 className="title">Telehealth - Doctor Signup</h2>

    <div className="card login-card mb-5">
    <span className="login-typo">Create a Doctor Account</span>
    {
      step === 0 ?
    <form onSubmit={e=>e.preventDefault()} className="login-form">
    <div className="form-row">
    <div className="col-md-6 mb-3">
      <label forHTML="validationTooltip01">First name</label>
      <input type="text" className="form-control" onChange={e=>{setAccountInfo({...accountInfo, firstName: e.target.value})}} value={accountInfo.firstName} id="validationTooltip01"  required/>
    </div>
    <div className="col-md-6 mb-3">
      <label forHTML="validationTooltip02">Last name</label>
      <input type="text" className="form-control" onChange={e=>{setAccountInfo({...accountInfo, lastName:e.target.value})}}  value={accountInfo.lastName}id="validationTooltip02"  required/>
      <div className="valid-tooltip">
        Looks good!
      </div>
    </div>
  </div>
  <div className="form-row">
    <div className="col-md-6 mb-3">
      <label forHTML="validationTooltip03">Email</label>
      <input type="text" className="form-control" onChange={e=>{setAccountInfo({...accountInfo, email:e.target.value})}}  value={accountInfo.email}id="validationTooltip03"  required/>
    </div>
    <div className="col-md-6 mb-3">
      <label forHTML="validationTooltip04">Phone no.</label>
      <input type="number" className="form-control" onChange={e=>{setAccountInfo({...accountInfo, phone:e.target.value})}}  value={accountInfo.phone}id="validationTooltip04"  required/>
    </div>
  </div>
  <div className="form-row">
    <div className="col-md-6 mb-3">
      <label forHTML="validationTooltip03">Password</label>
      <input type="password" className="form-control" onChange={e=>{setAccountInfo({...accountInfo, password:e.target.value})}}  value={accountInfo.password}id="validationTooltip03"  required/>
    </div>
    <div className="col-md-6 mb-3">
      <label forHTML="validationTooltip04">Confirm Password</label>
      <input type="password" className="form-control" onChange={e=>{setAccountInfo({...accountInfo, conf_password:e.target.value})}}  value={accountInfo.conf_password}id="validationTooltip04"  required/>
    </div>
  </div>
  <div className="form-row">
    <div className="col-md-4 mb-3">
      <label forHTML="validationTooltip03">DOB : </label>
      <input type="date" className="form-control" onChange={e=>{setAccountInfo({...accountInfo, birth_year:e.target.value})}}  value={accountInfo.birth_year} id="validationTooltip03"  required/>
    </div>
    <div className="form-group col-md-4 mb-3">
  <label forHTML="validationTooltip03">Gender</label>
    <select className="custom-select" onChange={e=>{setAccountInfo({...accountInfo, gender:e.target.value})}}  value={accountInfo.gender} required>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>
    <div className="invalid-feedback">Invalid Response</div>
  </div>
    <div className="col-md-4 mb-3">
      <label forHTML="validationTooltip04">Profile Photo</label>
      <input type="file" className="form-control-file form-control-md" onChange={e=>{setAccountInfo({...accountInfo, profile_photo: e.target.files[0]})}} id="validationTooltip04" />
    </div>
  </div>
  <center><button className="btn btn-outline-primary m-2" onClick={()=>{createAccountAtBackend(accountInfo)}} type="submit">Create Account</button></center>
  </form> : <DoctorDetailsForm/>
    }
  </div>
  <div className="title text-light">Step {step+1} of 2</div>
  <div>Already have account ? <Link to='/login' className='text-light'>Login</Link></div>
  </div>
    )
}
