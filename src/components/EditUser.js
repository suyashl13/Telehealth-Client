/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { baseURL } from '../env'

export default function EditUser(props) {

  const [profile, setProfile] = useState({email: '', phone:"", profilePhoto: null})
  const {user} = props

  const setPage = () => {
    setProfile({...profile, email:user.email,phone:user.phone})
  }

  useEffect(() => {
    setPage()
  }, [])


  const updateProfile = async () => {
    const formData = new FormData()
    if (profile.email !== user.email) {
      formData.append('email', profile.email)
    }
    if (profile.phone !== user.phone) {
      formData.append('phone', profile.phone)
    }
    if (profile.profilePhoto) {
      formData.append('profile_photo', profile.profilePhoto)
    }
    formData.forEach((k,v)=>{console.log(k,v)})
    await axios.post(
      baseURL + 'users/' + localStorage.getItem('id') + '/',
      formData, {
        headers: {
          'Uid' : localStorage.getItem('id'),
          'Authtoken': localStorage.getItem('authtoken')
        }
      }
    ).then(
      e=>{
        toast('Successfully updated user.',{type:'success', position:"bottom-center"})
      }
    ).catch(
      e=>{
        console.log(e)
        if (e.response.data.ERR.split(': ')[0] === 'UNIQUE constraint failed') {
          toast('Phone or email already used.',{type:'error', position:"bottom-center"})
        } else {
          toast('Unknown Error occoured.',{type:'error', position:"bottom-center"})
        } 
      }
    )
  }

  return (
    <form onSubmit={e=>e.preventDefault()} className="login-form">
        <div className='mt-1'>
          <label forHTML="email">New Email</label>
          <input type="text" class="form-control" required id='email' onChange={e=>{setProfile({...profile,email:e.target.value})}} value={profile.email}/>
        </div>
        <div className='mt-1'>
          <label forHTML="phone">New Phone no.</label>
          <input type="number" class="form-control" id='phone' onChange={e=>{setProfile({...profile,phone:e.target.value})}} value={profile.phone} required/>
        </div>
        <div className='mt-1'>
          <label forHTML="">Profile Photo</label>
          <input type="file" class="form-control-file form-control-md" onChange={e=>{setProfile({...profile,profilePhoto:e.target.files[0]})}} id="" />
        </div>
          <button class="btn btn-primary mt-3" onClick={()=>{updateProfile()}} type="submit">Edit Account</button>
    </form>
    )
}
