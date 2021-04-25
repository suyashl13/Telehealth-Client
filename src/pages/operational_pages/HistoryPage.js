import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import IndicateNotSelected from '../../components/history/IndicateNotSelected'
import TreatmentHistory from '../../components/history/TreatmentHistory'
import { baseURL } from '../../env'

export default function HistoryPage() {

    const [activeIndex, setactiveIndex] = useState(null)
    const [pastTreatments, setPastTreatments] = useState([])

    useEffect(() => {
        getAllTreatments();
    }, [])

    const getAllTreatments = async () => {
        await axios.get(
            baseURL + 'treatments/',
            {
                headers: {
                    'Uid' : localStorage.getItem('id'),
                    'Authtoken' : localStorage.getItem('authtoken')
                }
            }
        ).then(
            e=>{
                setPastTreatments(e.data)
                console.log(e.data)
            }
        ).catch(
            err=>{
                console.log({err})
                toast('Something went wrong.',{position:'bottom-center', type:'error'})
            }
        )
    }


    return (
        <div className="container">
            <br/>
            <div className="row">
                <div className="col-lg-4 col-md-4">
                    <div id="strong" className='mb-3'>History (Treatments)</div>
                    <div className="list-group overflow-control">
                        {
                            pastTreatments.map(
                                (element, index) => {
                                    return (
                                        <span key={index} onClick={e=>{setactiveIndex(index)}} className={activeIndex === index ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>
                                            <div style={{fontWeight:"bolder"}}>{element.patient.name}</div>
                                            <span style={{fontWeight:"lighter"}}>{element.symptoms}</span><br/>
                                            <span className='badge bg-primary text-light' style={{fontWeight:"lighter"}}>{element.date_created}</span>
                                        </span>
                                    )
                                }
                            )
                        }
                    </div>
                </div>
                <div className="col-lg-8 col-md-8">
                    {
                        activeIndex === null ? <IndicateNotSelected /> : 
                        <TreatmentHistory treatment={pastTreatments[activeIndex]}/>
                    }
                </div>
            </div>
        </div>
    )
}
