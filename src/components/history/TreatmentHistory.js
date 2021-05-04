import React from 'react'
import { tConvert } from '../../env'

export default function TreatmentHistory(props) {

    const {treatment} = props
    console.log(treatment)

    return (
        <div className='brdr-right overflow-control'>
            <span style={{fontWeight:"bold", fontSize:"34px"}}>Treatment Details</span>
            <br/><br/>
            <table className="table table-sm">
              <tbody>
                <tr>
                  <th>Patient Name</th>
                  <td>{treatment.patient.name}</td>
                </tr>
                <tr>
                  <th>Patient Birth Year</th>
                  <td>{treatment.patient.birth_year}</td>
                </tr>
                <tr>
                  <th>Symptoms</th>
                  <td>{treatment.symptoms}</td>
                </tr>
                <tr>
                  <th>Date treated</th>
                  <td>{treatment.date_created}</td>
                </tr>
              </tbody>
            </table>
            <hr className='mt-4'/>
            <span style={{fontWeight:"bold", fontSize:"34px"}}>Medicines</span>
            <br/><br/>
            <table className="table">
            <thead>
                <tr>
                  <th className='bg-primary text-light' scope="col">Medicine Name</th>
                  <th className='bg-primary text-light' scope="col">Intake Quantity</th>
                  <th className='bg-primary text-light' scope="col">Intake Timings</th>
                  <th className='bg-primary text-light' scope="col">Duration (Days)</th>
                  <th className='bg-primary text-light' scope="col">Note</th>
                  <th className='bg-primary text-light' scope="col"></th>
                </tr>
              </thead>
              <tbody>
                    {
                        treatment.medecines.map(
                            (e,i)=>{
                                console.log(e,i)
                                return(
                                    <tr>
                                    <td>{e.medicine}</td>
                                    <td>
                                      {e.intake_quantity} <br/>                       
                                    </td>
                                    <td>
                                      {e.intake_time_1 ? tConvert(e.intake_time_1) : e.intake_time_1} <br/>
                                      {e.intake_time_2 ? tConvert(e.intake_time_2) : e.intake_time_2} <br/>
                                      {e.intake_time_3 ? tConvert(e.intake_time_3) : e.intake_time_3} <br/>
                                      {e.intake_time_4 ? tConvert(e.intake_time_4) : e.intake_time_4} <br/>
                                    </td>
                                    <td>
                                      {e.duration}
                                    </td>
                                    <td>
                                      {e.note}
                                    </td>
                                    </tr>
                                )
                            }
                        )
                    }
              </tbody>
            </table>
        </div>
    )
}
