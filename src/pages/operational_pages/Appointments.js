import React, { useState } from 'react'
import AppointmentList from '../../components/AppointmentList'
import AptTokens from '../../components/AptTokens'

export default function Appointments() {

    const [toggler, setToggler] = useState(0)

    return (
        <>
            <center className='tab-container container'>
                <button onClick={()=>{setToggler(0)}} className={toggler === 0 ? "tab-button active-btn": "tab-button"}>Appointment Tokens</button>
                <button onClick={()=>{setToggler(1)}} className={toggler === 1 ? "tab-button active-btn": "tab-button"}>Appointments</button>
            </center>
            <div className="container mt-4">
                {
                    toggler === 0 ?  <AptTokens/> : <AppointmentList/> 
                }
            </div>
        </>
    )
}
