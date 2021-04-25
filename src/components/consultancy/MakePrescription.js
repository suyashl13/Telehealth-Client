import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { baseURL, tConvert } from '../../env'
import Treatment from './Treatment'

export default function MakePrescription(props) {

  const [treatment, setTreatment] = useState("")
  const [allMeds, setAllMeds] = useState([])
  const [currentMed, setCurrentMed] = useState({
    medicine_name:'',
    intake_quantity:'',
    intake_time_1: '',
    intake_time_2: '',
    intake_time_3: '',
    intake_time_4: '',
    duration:'',
    note:'',
  })

  const addMed = ({medicine_name,intake_quantity,duration,note, intake_time_1, intake_time_2, intake_time_3, intake_time_4}) => {
    if (!(medicine_name || intake_quantity || duration || note)) {
      toast('All fields are required.', {type:'error',position:'bottom-center'})
      return 1;
    }
    if (!(intake_time_1 || intake_time_2 || intake_time_3)) {
      toast('All fields are required.', {type:'error',position:'bottom-center'})
      return 1;
    }
    setAllMeds([...allMeds, currentMed])
    setCurrentMed({
      medicine_name:'',
      intake_quantity:'',
      intake_time_1: '',
      intake_time_2: '',
      intake_time_3: '',
      intake_time_4: '',
      duration:'',
      note:'',
    })
  }

  const deleteMed = (element) => {
    let myAllMeds = allMeds
    myAllMeds = myAllMeds.filter(
      (e) =>  e !== element
    )
    setAllMeds(myAllMeds)
  }

  const sendToBackend = async () => {
    let treatment_id = null;
    const appointmentData = new FormData();
    appointmentData.append('appointment', props.appointment_id?.id)
    if (treatment) {
      appointmentData.append('treatment', treatment)
    }
    await axios.post(
      baseURL + 'treatments/',
      appointmentData,
      {
        headers:{
          'Uid': localStorage.getItem('id'),
          'Authtoken': localStorage.getItem('authtoken')
        }
      }
    ).then(
      e=>{
        treatment_id = e.data.id
      }
    ).catch(
      e=>{console.log(e)}
    )
    if (treatment_id) {
      allMeds.forEach(async (element) => {
        const medMap = objectToMap(element);
        const medData = new FormData()
        medMap.forEach(
          async (value,key)=>{
            if (key === 'intake_time_4') {
              if (value) {
                medData.append(key, value)
              }
            } else {
              medData.append(key, value)
            }
          }  
        )
        await axios.post(
          baseURL + `treatments/medicine/${treatment_id}/`,
          medData,{
            headers:{
              'Uid': localStorage.getItem('id'),
              'Authtoken' : localStorage.getItem('authtoken')
            }
          }
        ).catch(
          e=>{console.log(e)}
        )
      })
    } else {
      toast('Something Went Wrong!!', {type:'error',position:"bottom-center"})
      return 1;
    }
    toast('Successfully Consulted!', {type:'success',position:"bottom-center"})
    props.setIsConsulted(true);
  }

  const objectToMap = obj => {
    const keys = Object.keys(obj);
    const map = new Map();
    for(let i = 0; i < keys.length; i++){
      map.set(keys[i], obj[keys[i]]);
    }
    return map;
 };
  
  return (
        <div className='brdr-right'>
          <Treatment treatment={treatment} setTreatment={setTreatment} />
            <div id="strong">
            Medicines
            </div>
            <br/>
            <table className="table table-md overflow-control" id='prtTable'>
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
                  allMeds.map((e,i) => { 
              
                    return <tr key={i}>
                      <th>{e.medicine_name}</th>
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
                      <td>
                        <button onClick={()=>{deleteMed(e)}} className="btn btn-sm btn-danger">Delete</button>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
            <br/>
            <table className="table table-md overflow-control" id='addTable'>
              <thead>
                <tr>
                  <th className='' scope="col">Add a Medicine</th>
                  <th className='' scope="col"></th>
                  <th className='' scope="col"></th>
                  <th className='' scope="col"></th>
                  <th className='' scope="col"></th>
                  <th className='' scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr className='remove'>
                  <th scope="row"><input placeholder='Medicine Name' value={currentMed.medicine_name} onChange={e=>{setCurrentMed({...currentMed, medicine_name:e.target.value})}} type="text" className='form-control col-12 form-control-sm'/></th>
                  <td><input placeholder='Intake Quantity (e.x. 5ml)' value={currentMed.intake_quantity} onChange={e=>{setCurrentMed({...currentMed, intake_quantity:e.target.value})}} type="text" className='form-control col-12 form-control-sm'/></td>
                  <td>
                    <input type="time" placeholder='Intake Timing 1' value={currentMed.intake_time_1} onChange={e=>{setCurrentMed({...currentMed,intake_time_1:e.target.value})}} className='form-control col-12 form-control-sm'/>
                    <input type="time" placeholder='Intake Timing 2' value={currentMed.intake_time_2} onChange={e=>{setCurrentMed({...currentMed,intake_time_2:e.target.value})}} className='form-control col-12 form-control-sm mt-2'/>
                    <input type="time" placeholder='Intake Timing 3' value={currentMed.intake_time_3} onChange={e=>{setCurrentMed({...currentMed,intake_time_3:e.target.value})}} className='form-control col-12 form-control-sm mt-2'/>
                    <input type="time" placeholder='Intake Timing 4' value={currentMed.intake_time_4} onChange={e=>{setCurrentMed({...currentMed,intake_time_4:e.target.value})}} className='form-control col-12 form-control-sm mt-2'/>
                  </td>
                  <td><input type="number" placeholder='Duration (In Days)' value={currentMed.duration} onChange={e=>{setCurrentMed({...currentMed,duration:e.target.value})}} className='form-control col-12 form-control-sm'/></td>
                  <td><textarea type="text" placeholder='Note : E.x. Consume After Meal' value={currentMed.note} onChange={e=>{setCurrentMed({...currentMed,note:e.target.value})}} className='form-control col-12 form-control-sm'/></td>
                  <td><button onClick={e=>{addMed(currentMed)}} className="btn btn-primary btn-sm justify-content-end">Add Entry</button><br/></td>
                </tr>
              </tbody>
            </table>
            <br/>
            <center><button onClick={e=>{sendToBackend()}} className="btn btn-primary btn-md justify-content-end">Submit</button></center>
        </div>
    )
}
