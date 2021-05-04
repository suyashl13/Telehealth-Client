/* eslint-disable no-restricted-globals */
import axios from 'axios'
import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { toast } from 'react-toastify'
import { baseURL } from '../env'

export default function DoctorDetailsForm() {

    const [regDetails, setRegDetails] = useState({
        specializations: 'FAMILY PHYSICIAN',
        certificate: null,
        bio: '',
        open_time_from: '',
        open_time_to: '',
        consultation_fee: 0,
        city: '',
    })

    const [redirectToHome, setredirectToHome] = useState(false)

    const setAccountDetails = async ({specializations,certificate,bio,open_time_from,open_time_to,consultation_fee,city}) => {
        if (specializations === '' || certificate === '' || bio === '' || open_time_from === '' || open_time_to === '' || consultation_fee === '' || city === '') {
            toast('All fields are required.', {type:"error"})
            return 1
        }
        const formData = new FormData()
        
        formData.append('specializations',specializations)
        formData.append('certificate', certificate)
        formData.append('bio', bio)
        formData.append('open_time', `${open_time_from} - ${open_time_to}`)
        formData.append('consultation_fee',consultation_fee)
        formData.append('city',city)


        const custom_req = axios.create({
            baseURL: baseURL,
            headers : {
                'Uid' : localStorage.getItem('id'),
                'Authtoken': localStorage.getItem('authtoken')
            },
        })

        await custom_req.post(
            'users/doctor_details/', formData
        ).then(e=>{
            if(e.status === 200) {
                setredirectToHome(true)
                return <Redirect to='/' />
            }
        }).catch(
            e=> {
                if (e.response?.data.ERR === 'UNIQUE constraint failed: users_doctordetail.doctor_id') {
                    toast('Doctor details of this user already exsist.', {position:'bottom-center', type:"error"})
                    return 1
                }
            }
        )
    }

    if (redirectToHome) {
        return <Redirect to='/' />
    } else {
        return (
        <form onSubmit={e=>e.preventDefault()} className="login-form">
            <div className="form-row">
            <div className="col-md-6 mb-2">
                <label for="validationTooltip01">Specialization</label>
                <select required onChange={e=>{setRegDetails({...regDetails, specializations:e.target.value})}} type="text" name="" id="" placeholder="Specializations" value={regDetails.specializations} className="form-control">
                    <option>FAMILY PHYSICIAN</option>
                    <option>PODIATRIST</option>
                    <option>SPORTS MEDICINE PHYSICIAN</option>
                    <option>RADIOLOGIST</option>
                    <option>PREVENTIVE MEDICINE PHYSICIAN</option>
                    <option>PHYSICAL MEDICINE AND REHABILITATION PHYSICIAN</option>
                    <option>DERMATOLOGIST</option>
                    <option>NUCLEAR MEDICINE PHYSICIAN</option>
                    <option>OPHTHALMOLOGIST</option>
                    <option>HOSPITALIST</option>
                    <option>ALLERGISTS AND IMMUNOLOGIST</option>
                    <option>NEUROLOGIST</option>
                    <option>PATHOLOGIST</option>
                    <option>ANESTHESIOLOGIST</option>
                    <option>SURGEON</option>
                    <option>OBSTETRICIANS AND GYNECOLOGIST</option>
                    <option>PSYCHIATRIST</option>
                    <option>PEDIATRICIA</option>
                </select>
            </div>
            <div className="col-md-6 mb-2">
                <label for="validationTooltip01">Certificate</label>
                <input required onChange={e=>{setRegDetails({...regDetails, certificate:e.target.files[0]})}} type="file" name="" id="" placeholder="Certificate" className="form-control-file"/>
            </div>
            </div>
            <div className="form-row">
            <div className="col-md-6 mb-2">
                <label for="validationTooltip01">Consultation Fee</label>
                <input required onChange={e=>{setRegDetails({...regDetails, consultation_fee: e.target.value})}} type="number" name="" id="" placeholder="Rs." value={regDetails.consultation_fee} className="form-control mb-2"/>
            </div>
            <div className="col-md-3 mb-2">
                <label for="validationTooltip01">Open From</label>
                <input required onChange={e=>{setRegDetails({...regDetails, open_time_from: e.target.value})}} type="time" name="" id="" placeholder="open_time" value={regDetails.open_time_from} className="form-control mb-2"/>
            </div>
            <div className="col-md-3 mb-2">
                <label for="validationTooltip01">To</label>
                <input required onChange={e=>{setRegDetails({...regDetails,open_time_to: e.target.value})}} type="time" name="" id="" placeholder="open_time" value={regDetails.open_time_to} className="form-control mb-2"/>
            </div>
            </div>
            <div className="form-row">
                <div className="col-md-8 mb-2">
                    <label for="validationTooltip01">About</label>
                    <input required onChange={e=>{setRegDetails({...regDetails,bio: e.target.value})}} type="text" name="" id="" placeholder="About" value={regDetails.bio} className="form-control"/>
                </div>
                <div className="col-md-4 mb-2">
                    <label for="validationTooltip01">City</label>
                    <input required onChange={e=>{setRegDetails({...regDetails, city: e.target.value})}} type="text" name="" id="" placeholder="City" value={regDetails.city} className="form-control mb-2"/>
                </div>
            </div>
            <center><button className="btn btn-primary m-1" onClick={e=>{setAccountDetails(regDetails)}}>Submit</button></center>
        </form>
    )}
}
