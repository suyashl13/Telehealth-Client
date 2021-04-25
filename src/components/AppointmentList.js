import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { baseURL, tConvert } from '../env'

export default function AppointmentList() {

    const [apptList, setApptList] = useState([])

    const fetchAppointments = async () => {
        await axios.get(baseURL+'appointments/',
        {
            headers:{
                'Uid' : localStorage.getItem('id'),
                'Authtoken' : localStorage.getItem('authtoken')
            }
        }).then(e=>{
            const unTreatedAppointents = e.data.filter(
                (element) => element.is_treated === false
            )
            setApptList(unTreatedAppointents)
        }).catch(
            e=>{
                console.log({e})
            }
        )
    }

    useEffect(() => {
        fetchAppointments();
    }, [])

    const yourDate = new Date()
    const todaysDate = yourDate.toISOString().split('T')[0]

    return (
        <div className='container'>
            <div id="strong"> Appointments</div>
            <div className="row">
            {
                apptList.length === 0 ? <span className='center-box' style={{fontSize:'30px', textAlign:'center', paddingBottom:'400px'}}>
                    <center>No Appointments So Far.</center></span>
                :apptList.map((element, key)=>{
                    return <div className="col-lg-6 col-lg-6 col-sm-12" key={key}>
                        <div className={element.datetime_allocated.split('T')[0] === todaysDate ? "bg-danger card custom-card mt-2 text-light" : 'card custom-card mt-2'}>
                        <div style={{fontSize:"26px", fontWeight:'bold'}} className="card-header">{element.patient_name}</div>
                        <div className={"card-body"} >
                            Age : {element.patient_age} <br/>
                            Symptoms : {element.patient_symptoms} <br/>
                            Patient Note : {element.patient_note ? element.patient_note : "None"}<br/>
                            Appointment Date : {element.datetime_allocated.split('T')[0]} <br/>
                            Appointment Time : {tConvert(element.datetime_allocated.split('T')[1].split('+')[0])}<br/>
                            {
                                element.datetime_allocated.split('T')[0] === todaysDate ? <span className="badge bg-light mt-3 p-2 text-dark">Today</span> : <span className="badge bg-success text-light mt-3 p-2">Upcomming</span>
                            }{
                                element.datetime_allocated.split('T')[0] === todaysDate ? <><hr/>
                                <div style={{textAlign:"end"}}>
                                    <Link to={`consultancy/${element.id}`} className={element.datetime_allocated.split('T')[0] === todaysDate ? "btn btn-light text-danger btn-sm" : 'btn btn-primary btn-sm'}>Consult Patient</Link>
                                </div></> : null}
                        </div>
                    </div>
                    </div>
                })
            }
            </div>
        </div>
    )
}
