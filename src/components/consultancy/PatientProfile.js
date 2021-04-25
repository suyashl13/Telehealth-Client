import React from 'react'
import user_img from '../../assets/user.png'

export default function PatientProfile(props) {

    return (
        <div className='p-2'>
            <div style={{textAlign:'center'}} className='mb-2' id="strong">Patient Profile</div>
            <center><img src={props.patient?.profile_photo ? props.patient?.profile_photo : user_img} className="p-4 rounded-circle card-header mb-2" width='206' height='200' alt="user"/></center>
            <div className='profile p-2'>
                <h1 className="fw-bold">{props.patient?.name}</h1>
                    Birth Year : {props.patient?.birth_year} <br/>
                    Gender : {props.patient?.gender} <br/>
                    Email : {props.patient?.email} <br/>
                    Phone : {props.patient?.phone} <br/><br/>
                <hr/>
            </div>
        </div>
    )
}
