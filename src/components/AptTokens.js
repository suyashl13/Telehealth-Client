/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { baseURL } from '../env'
import AssignAppointment from './AssignAppointment'


export default function AptTokens() {

    const [apptTokens, setApptTokens] = useState([])
    const [activeIndex, setActiveIndex] = useState(null)
    const [isAssigningApt, setIsAssigningApt] = useState(false)

    
    const getAppointmentTokens = () => {
        axios.get(
            baseURL + 'appointments/appt_token/',{
                headers:{
                    'Uid' : localStorage.getItem('id'),
                    'Authtoken' : localStorage.getItem('authtoken')
                }
            }
        ).then(
            e=>{
                setApptTokens(e.data)
            }
        ).catch(
            e=>{
                console.log(e)
            }
        )
    }

    useEffect(() => {
        getAppointmentTokens()
    }, [])

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-4">
                    <div id="strong" className=' mb-3'>Appointment Tokens</div>
                    <div class="list-group">
                      { apptTokens.length === 0 ? <span className='login-typo'>No Appointment Tokens.</span>
                      : apptTokens.map((e,i)=>{
                            return <a key={i} onClick={()=>{setActiveIndex(i)}} to="#"
                            class={activeIndex === i ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} aria-current="true">
                                <span className='fw-bold'>{e.patient_name}</span><br/>
                                <span style={{fontWeight:"lighter", textOverflow:'ellipsis'}}>{e.symptoms}</span><br/>
                                <span style={{fontWeight:"lighter", textOverflow:'ellipsis'}}>Consultancy Date : {e.date_expected}</span><br/>
                            </a>
                        })                          
                      }
                    </div>
                    
                </div>
                {
                  activeIndex == null ? 
                  <div className="col-md-8"><div className='m-5 alert alert-warning'>No Token Selected</div></div> : <div className="col-md-8">
                  <div className="card mt-5 mt-5">
                  <div className="card-header"><center className='fw-bold'>
                  {apptTokens[activeIndex]?.patient_name} <br/>
                  </center>
                  <center style={{fontWeight:'lighter',color:'grey'}}>{apptTokens[activeIndex]?.symptoms}</center>
                  </div>

                  <div className="card-body pl-5 pr-5">
                  {
                    !isAssigningApt ? <><center><div className="text-info mb-4 text-lg">Patient Details</div></center>
                    <table class="table">
                        <tbody>
                          <tr>
                            <th>Name</th>
                            <td>{apptTokens[activeIndex]?.patient_name}</td>
                          </tr>
                          <tr>
                            <th>Age</th>
                            <td>{apptTokens[activeIndex]?.patient_age} Y/O</td>
                          </tr>
                          <tr>
                            <th>Gender</th>
                            <td>{apptTokens[activeIndex]?.patient_gender}</td>
                          </tr>
                          <tr>
                            <th>Note</th>
                            <td>{apptTokens[activeIndex]?.note ? apptTokens[activeIndex]?.note : "None"}</td>
                          </tr>
                          <tr>
                            <th>Symptoms</th>
                            <td>{apptTokens[activeIndex]?.symptoms}</td>
                          </tr>
                          <tr>
                            <th>Slot</th>
                            <td>{apptTokens[activeIndex]?.slot}</td>
                          </tr>
                          <tr>
                            <th>Date Expected</th>
                            <td>{apptTokens[activeIndex]?.date_expected}</td>
                          </tr>
                          <tr>
                            <th>Posted Date</th>
                            <td>{apptTokens[activeIndex]?.time_posted.split('T')[0]}</td>
                          </tr>
                          <tr>
                            <th>Posted Time</th>
                            <td>{apptTokens[activeIndex]?.time_posted.split('T')[1].split('.')[0]}</td>
                          </tr>
                        </tbody>
                      </table>
                      <hr/>
                      <center><div className="btn btn-primary btn-sm mb-2 mt-1" onClick={()=>{
                        if (activeIndex !== null) {
                          setIsAssigningApt(true)
                        }else {
                          toast('Please select valid appointment.', {
                            type:'error',position:'bottom-center'
                          })
                        }
                      }}>
                          Assign Appointment
                      </div></center></> : <AssignAppointment setActiveIndex={setActiveIndex} id={apptTokens[activeIndex]?.id} setIsAssigningApt={setIsAssigningApt} getAppointmentTokens={getAppointmentTokens} slot={apptTokens[activeIndex]?.slot} date_expected={apptTokens[activeIndex]?.date_expected} />
                  }
                  </div>
                  </div>
            </div>
                }
            </div>
        </div>
    )
}
