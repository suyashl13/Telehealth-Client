/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IndicateError from '../../components/IndicateError'
import { baseURL } from '../../env'
import '../operational_pages/home.css'


export default function Home() {

    const [profileData, setProfileData] = useState({
        name : '',
        specialization: '',
        consultation_fee: '',
        authorization: '',
        open_time: '',
        phone: '',
        email : '',
        profile_photo: '',
        bio: '',
        certificate:  ''

    })

    const [isError, setIsError] = useState(false)
    const [editProfileData, setEditProfileData] = useState({})

    useEffect(() => {
        fetchProfileData()
    }, [])

    const fetchProfileData = async () => {
        const getProfileRequest = axios.create(
            {headers:{'Uid': localStorage.getItem('id'),'Authtoken': localStorage.getItem('authtoken')}, baseURL: baseURL}
        )
        await getProfileRequest.get('users/'+localStorage.getItem('id')+'/').then(e=>{
            setEditProfileData({user: e.data.user,
            doctor_details:e.data.doctor_details})
            setProfileData({...profileData,
                name :e.data.user.name,
                specialization: e.data.doctor_details.specializations,
                consultation_fee: e.data.doctor_details.consultation_fee,
                authorization: e.data.doctor_details.is_authorized,
                open_time: e.data.doctor_details.open_time,
                phone: e.data.user.phone,
                email : e.data.user.email,
                profile_photo: e.data.user.profile_photo,
                bio: e.data.doctor_details.bio,
                certificate:  e.data.doctor_details.certificate
            })
        }).catch(e=>{setIsError(true)})
    }

    if (isError) {
        return <IndicateError/>
    }

    return (
        <div className='home-container'>
            <div className="container-fluid mb-5">
            <div className="row mb-5">
                <div className="col-md-6 center-content">
                    <center>
                    
                    <img src={
                        profileData.profile_photo ? profileData.profile_photo :
                        "https://i.pinimg.com/736x/cc/9b/3b/cc9b3b4f000047d3830eb98c9c630ccc.jpg"} className='rounded-circle' height='400' width='400' alt=""/>
                    <div className="profile-icon">
                    </div>
                    </center>
                </div>
                <div className="col-md-4">
                <div className="differentiate">
                    <span id='strong'>Your Profile</span>
                    {isError ? null : <Link to={{pathname:'/edit_profile',editProfileData}}>Edit Profile</Link>}
                </div>
                    <hr/>
                    <div className="card mb-2 profile-tile">
                        <div className="profile-icon">
                        <i className="fas fa-user-nurse"></i>
                        </div>
                        <span className='profile-col'>{profileData.name}</span>

                    </div>
                    <div className="card mb-2 profile-tile">
                        <div className="profile-icon">
                        <i className="fas fa-star-of-life"></i>
                        </div>
                        <span className='profile-col'>{profileData.specialization}</span>
                    </div>
                    <div className="card mb-2 profile-tile">
                        <div className="profile-icon">
                        <i className="fas fa-money-bill-alt"></i>
                        </div>
                        <span className='profile-col'>Rs.{profileData.consultation_fee}</span>
                    </div>
                    <div className="card mb-2 profile-tile">
                        <div className="profile-icon">
                        <i className="far fa-check-circle"></i>
                        </div>
                        <span className='profile-col'>{profileData.authorization ? "Authorized Doctor" : <span className='text-danger'>Not Authorized</span>}</span>
                    </div>
                    <div className="card mb-2 profile-tile">
                        <div className="profile-icon">
                        <i className="fas fa-phone-alt"></i>
                        </div>
                        <span className='profile-col'>+91 {profileData.phone}</span>
                    </div>
                    <div className="card mb-2 profile-tile">
                        <div className="profile-icon">
                        <i className="far fa-envelope"></i>
                        </div>
                        <span className='profile-col'>{profileData.email}</span>
                    </div>
                    <div className="card mb-2 profile-tile">
                        <div className="profile-icon">
                        <i className="fas fa-file"></i>
                        </div>
                        <span className='profile-col text-primary'><a target="_blank" rel="noopener noreferrer" href={profileData.certificate}>Certificate</a></span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
