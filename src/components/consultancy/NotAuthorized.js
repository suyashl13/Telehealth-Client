import React from 'react'
import cross from '../../assets/cross.png'

export default function NotAuthorized() {
    return (
        <div className='centerbox'>
            <img src={cross} height='150' alt=""/>
            <br/>
            <div className="login-typo" style={{fontSize:'24px'}}>Unauthorized Access!</div>
            <div style={{fontSize:'20px', fontWeight:'lighter'}}>You are not authorized to this route.</div>
        </div>
    )
}
