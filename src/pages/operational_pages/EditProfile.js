import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EditDoctor from '../../components/EditDoctor'
import EditUser from '../../components/EditUser'
import IndicateError from '../../components/IndicateError'
import { baseURL } from '../../env'

export default function EditProfile(props) {

    const [isError, setIsError] = useState(false)
    const [doctor_details, set_doctor_details] = useState({})
    const [user, setuser] = useState({})
    const [isLoading, setisLoading] = useState(true)

    const fetchProfileData = async () => {
        const getProfileRequest = axios.create(
            {headers:{'Uid': localStorage.getItem('id'),'Authtoken': localStorage.getItem('authtoken')}, baseURL: baseURL}
        )
        await getProfileRequest.get('users/'+localStorage.getItem('id')+'/').then(e=>{
            set_doctor_details(e.data.doctor_details)
            setuser(e.data.user)
            setisLoading(false)
        }).catch(e=>{setIsError(true)})
    }

    

    useEffect(() => {
        fetchProfileData()
    }, [])

    if (isError) {
        return <IndicateError/>
    }

    return (
        <div className='container'>
            <div className="login-typo m-5">Edit Profile Page</div>
            <div className="row">
                <div className="col-md-6">
                <div id="strong">User</div>
                <hr/>
                  {
                      isLoading ? "Loading..." : <EditUser user={user}/> 
                  }
                </div>
                <div className="col-md-6">
                <div id="strong">Doctor Details</div>
                <hr/>
                    {
                        isLoading ? "Loading..." : <EditDoctor doctor_details={doctor_details}/> 
                    }
                </div> 
            </div>
        </div>
    )
}


