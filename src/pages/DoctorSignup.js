import axios from 'axios'
import React, { useState } from 'react'
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
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('birth_year', birth_year)
    formData.append('gender', gender)
    formData.append('password',password)
    formData.append('is_doctor', true)

    if(profile_photo){
      formData.append('profile_photo', profile_photo)
    }

    axios.post(
      baseURL + 'users/',formData
    ).then(e=>{
      if (e.status === 200) {
        localStorage.setItem('id',e.data.id)
        localStorage.setItem('authtoken', e.data.auth_token)
        console.log(`localStorage(Token) : `, localStorage.getItem('authtoken'))
        incrementStep();
      }
    }).catch(e=>{
      console.log({e})
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
    console.log(formData)
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
    <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="validationTooltip01">First name</label>
      <input type="text" class="form-control" onChange={e=>{setAccountInfo({...accountInfo, firstName: e.target.value})}} value={accountInfo.firstName} id="validationTooltip01"  required/>
    </div>
    <div class="col-md-6 mb-3">
      <label for="validationTooltip02">Last name</label>
      <input type="text" class="form-control" onChange={e=>{setAccountInfo({...accountInfo, lastName:e.target.value})}}  value={accountInfo.lastName}id="validationTooltip02"  required/>
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="validationTooltip03">Email</label>
      <input type="text" class="form-control" onChange={e=>{setAccountInfo({...accountInfo, email:e.target.value})}}  value={accountInfo.email}id="validationTooltip03"  required/>
    </div>
    <div class="col-md-6 mb-3">
      <label for="validationTooltip04">Phone no.</label>
      <input type="number" class="form-control" onChange={e=>{setAccountInfo({...accountInfo, phone:e.target.value})}}  value={accountInfo.phone}id="validationTooltip04"  required/>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="validationTooltip03">Password</label>
      <input type="password" class="form-control" onChange={e=>{setAccountInfo({...accountInfo, password:e.target.value})}}  value={accountInfo.password}id="validationTooltip03"  required/>
    </div>
    <div class="col-md-6 mb-3">
      <label for="validationTooltip04">Confirm Password</label>
      <input type="password" class="form-control" onChange={e=>{setAccountInfo({...accountInfo, conf_password:e.target.value})}}  value={accountInfo.conf_password}id="validationTooltip04"  required/>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-4 mb-3">
      <label for="validationTooltip03">DOB : </label>
      <input type="date" class="form-control" onChange={e=>{setAccountInfo({...accountInfo, birth_year:e.target.value})}}  value={accountInfo.birth_year} id="validationTooltip03"  required/>
    </div>
    <div class="form-group col-md-4 mb-3">
  <label for="validationTooltip03">Gender</label>
    <select class="custom-select" onChange={e=>{setAccountInfo({...accountInfo, gender:e.target.value})}}  value={accountInfo.gender} required>
      <option value="1">Male</option>
      <option value="2">Female</option>
      <option value="3">Other</option>
    </select>
    <div class="invalid-feedback">Invalid Response</div>
  </div>
    <div class="col-md-4 mb-3">
      <label for="validationTooltip04">Profile Photo</label>
      <input type="file" class="form-control-file form-control-md" onChange={e=>{setAccountInfo({...accountInfo, profile_photo: e.target.files[0]})}} id="validationTooltip04" />
    </div>
  </div>
  <center><button class="btn btn-outline-primary m-2" onClick={()=>{createAccountAtBackend(accountInfo)}} type="submit">Create Account</button></center>
  </form> : <DoctorDetailsForm/>
    }
  </div>
  <div className="title text-light">Step {step+1} of 2</div>
  <div></div>
  </div>
    )
}
