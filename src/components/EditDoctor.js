/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { baseURL } from '../env'

export default function EditDoctor(props) {

    const {doctor_details} = props

    const [profile, setProfile] = useState({
        bio: '',
        city: "",
        consultation_fee: '',
        open_time_from: "",
        open_time_to: "",
        specializations: "",
    })

    useEffect(() => {
        setPage(doctor_details)
        
    },[])

    const setPage = ({bio,city,consultation_fee,open_time,specializations}) => {
        setProfile({
            bio:bio,
            city:city,
            consultation_fee:consultation_fee,
            open_time_from: open_time.split(' - ')[0],
            open_time_to: open_time.split(' - ')[1],
            specializations: specializations
        })
    }

    const updateDoctorAtBackend = async () => {
        const formData = new FormData();
        formData.append('bio',profile.bio)
        formData.append('city', profile.city)
        formData.append('consultation_fee', profile.consultation_fee)
        formData.append('open_time', profile.open_time_from + ' - ' + profile.open_time_to)
        formData.append('specializations', profile.specializations)
        await axios.post(
            baseURL + 'users/doctor_details/' + doctor_details.id + '/',
            formData,
            {
                headers: {
                    'Uid' : localStorage.getItem('id'),
                    'Authtoken': localStorage.getItem('authtoken')
                  }    
            }
        ).then(
            e=>{
                toast(
                    'Updated Successfully.',{position:'bottom-center', type:'success'}
                )
            }
        ).catch(
            e=>{
                toast('Something went wrong.',{position:'bottom-center', type:'error'})
            }
        )
    }

    return (
        <form onSubmit={e=>e.preventDefault()} className="login-form">
            
            <div className="mb-2">
                <label forHTML="">Specialization</label>
                <input required type="text" placeholder="Specializations" className="form-control" value={profile.specializations} onChange={e=>{setProfile({...profile,specializations:e.target.value})}} />
            </div>
            
            
            <div className="mb-2">
                <label forHTML="">Consultation Fee</label>
                <input required  type="number" placeholder="Rs." className="form-control mb-2" value={profile.consultation_fee} onChange={e=>{setProfile({...profile,consultation_fee:e.target.value})}} />
            </div>
            <div className="mb-2">
                <label forHTML="">Open From</label>
                <input required type="time" placeholder="open_time" className="form-control mb-2" value={profile.open_time_from} onChange={e=>{setProfile({...profile,open_time_from:e.target.value})}} />
            </div>
            <div className="mb-2">
                <label forHTML="">To</label>
                <input required type="time" placeholder="open_time" className="form-control mb-2" value={profile.open_time_to} onChange={e=>{setProfile({...profile,open_time_to:e.target.value})}} />
            </div>
            
            <div className="mb-2">
                    <label forHTML="">About</label>
                    <textarea required  placeholder="About" className="form-control mb-2" value={profile.bio} onChange={e=>{setProfile({...profile,bio:e.target.value})}} />
            </div>
            <div className="mb-2">
                    <label forHTML="">City</label>
                    <input required type="text" placeholder="City" className="form-control mb-2" value={profile.city} onChange={e=>{setProfile({...profile,city:e.target.value})}} />
            </div>
            
            <button className="btn btn-primary m-1" onClick={e=>{updateDoctorAtBackend()}}>Edit Details</button>
        </form>
    )
}
