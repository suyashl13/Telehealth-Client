/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AppointmentOverview from '../../components/consultancy/AppointmentOverview'
import Consulted from '../../components/consultancy/Consulted'
import MakePrescription from '../../components/consultancy/MakePrescription'
import NotAuthorized from '../../components/consultancy/NotAuthorized'
import PatientProfile from '../../components/consultancy/PatientProfile'
import { baseURL } from '../../env'

export default function Consultancy(props) {
    const {id} = props.match.params

    const [isConsulted, setIsConsulted] = useState(false)
    const [resData, setResData] = useState({})
    const [isUnAuthorized, setIsUnAuthorized] = useState(false)

    const getAppointment = async () => {
        await axios.get(
            baseURL + `appointments/${id}/`,
            {
                headers:{
                    'Uid' : localStorage.getItem('id'),
                    'Authtoken' : localStorage.getItem('authtoken')
                }
            }
        ).then(
            e=>{
                setResData(e.data)
                setIsConsulted(e.data.appointment?.is_treated)
            }
        ).catch(
            e=>{console.log("ERR",{e})
            console.log(e.response.data.ERR === "Unauthorized access to this route.")
                if (e.response.data.ERR === "Unauthorized access to this route.") {
                    setIsUnAuthorized(true)
                }                
            }
        )
    }

    useEffect(
        ()=>{
            getAppointment()
        },[]
    )

    if (isUnAuthorized) {
        return <NotAuthorized/>
    }

    if (isConsulted) {
        return <Consulted/>
    }

    return (
        <div className='container-fluid'>
            <br/><br/>
            <div className="row">
            <div className="col-md-1 col-lg-1"></div>
                <div className="col-md-4 col-lg-4">
                    <PatientProfile patient={resData?.patient} />
                    <AppointmentOverview appointment={resData?.appointment} />
                </div>
                <div className="col-md-6 col-lg-6">
                    <MakePrescription appointment_id={resData?.appointment} setIsConsulted={setIsConsulted}/>
                </div>
            </div>
        </div>
    )
}
