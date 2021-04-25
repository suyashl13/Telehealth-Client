import React from 'react'

export default function AppointmentOverview(props) {

  return (
        <div>
            <div style={{textAlign:'center'}} id="strong">Appointment Details</div><br/>
            <table className="table">
              <tbody>
                <tr>
                  <th scope='col'>Symptoms</th>
                  <td>{props.appointment?.patient_symptoms}</td>
                </tr>
                <tr>
                  <th scope='col'>Note</th>
                  <td>{props.appointment?.patient_note ? props.appointment?.patient_note : 'None'}</td>
                </tr>
                <tr>
                  <th scope='col'>Date Expected</th>
                  <td>{props.appointment?.time_posted.split('T')[0]}</td>
                </tr>
                <tr>
                  <th scope='col'>Slot Expected</th>
                  <td>{props.appointment?.patient_slot}</td>
                </tr>
                <tr>
                  <th scope='col'>Time Assigned</th>
                  <td>
                  {props.appointment?.datetime_allocated.split('T')[1].split('+')[0]}
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
    )
}
