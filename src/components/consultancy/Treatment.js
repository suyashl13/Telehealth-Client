import React from 'react'

export default function Treatment(props) {
    const {setTreatment, treatment} = props
    return (
        <div>
            <div id="strong">Precautions</div>
            <form onSubmit={e=>e.preventDefault()}>
                <textarea name="" id="" cols="30" value={treatment} onChange={e=>{setTreatment(e.target.value)}} rows="4" placeholder="Precautions to be taken during treatment." className="form-control mt-3 mb-3"></textarea>
                <hr className='mt-4'/>
            </form>
        </div>
    )
}
