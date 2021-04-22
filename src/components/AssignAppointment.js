import React from 'react'

export default function AssignAppointment(props) {
    const {id , setIsAssigningApt} = props

    return (
        <div>
            <center id='strong'>Assign Appointment</center>
            <br/>
            <form>
              <div className="form-group">
                <label forhtml="date">Date Time of Appointment : </label>
                <input type="time" className="form-control" id="date" placeholder="Example input"/>
              </div>
              <div className="form-group">
                <label forhtml="note">Note</label>
                <input type="textfield" className="form-control" id="note" placeholder="Note"/>
              </div>
              <center><div className="btn btn-primary mt-2">Submit</div></center>
              <center><div onClick={()=>{setIsAssigningApt(false)}} className="btn mt-4 text-primary">See Appointment Token</div></center><br/>
            </form>
        </div>
    )
}
