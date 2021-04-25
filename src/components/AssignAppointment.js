/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { baseURL } from '../env'

export default function AssignAppointment(props) {
    const {id , setIsAssigningApt, slot, date_expected, getAppointmentTokens, setActiveIndex} = props

    const [apptData, setApptData] = useState({
      token: id,
      datetime: '',
      note: ''
    })



    useEffect(() => {
      setApptData({...apptData, token: id})
    }, [id])

    const assignAppointment = async () => {

      if (!id) {
        toast('Please select appointment to proceed.', {
          type:'error', position:'bottom-center'
        })
        return 1;
      }

      setApptData({...apptData, token: id})
      const formData = new FormData();
      formData.append('datetime',date_expected + ' ' + apptData.datetime+':00')
      formData.append('note', apptData.note)
      formData.append('token', apptData.token)
      await axios.post(
        baseURL + 'appointments/',
        formData,
        {
          headers:{
            'Uid': localStorage.getItem('id'),
            'Authtoken': localStorage.getItem('authtoken')
          }
        }
      ).catch(
        e=>{
          toast('Oops! An error occoured.', {
            position:'bottom-center', type:'error'
          })
        }
      ).then(
        e=>{
          getAppointmentTokens()
          setActiveIndex(null)
        }
      )
      
    }

    return (
        <div>
            <center id='strong'>Assign Appointment</center>
            <center style={{fontWeight:'lighter', color:'grey'}}>{date_expected} - {slot}</center>
            <br/>
            {
              id?<form onSubmit={e=>{e.preventDefault(); assignAppointment()}}>
              <div className="form-group">
                <label forhtml="date">Assign Time for Appointment : </label>
                <input type="time" className="form-control" id="date" onChange={e=>{setApptData({...apptData, datetime: e.target.value})}} placeholder="Example input" required/>
              </div>
              <div className="form-group">
                <label forhtml="note">Note</label>
                <input type="text" onChange={e=>{setApptData({...apptData, note:e.target.value})}} value={apptData.value} className="form-control" id="note" placeholder="Note"/>
              </div>
              <center><button type='submit' className="btn btn-primary mt-2">Submit</button></center>
              <center><div onClick={(e)=>{setIsAssigningApt(false);}} className="btn mt-4 text-primary">See Appointment Token</div></center><br/>
            </form>: <center className='login-typo m-5'>No Appointment Selected</center>
            }
        </div>
    )
}
