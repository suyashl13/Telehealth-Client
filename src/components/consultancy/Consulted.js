import React from 'react'
import tick from '../../assets/checked.png'
    
export default function Consulted() {
    return (
        <div className='centerbox'>
            <img src={tick} height='150' alt=""/>
            <br/>
            <div className="login-typo" style={{fontSize:'24px'}}>Patient Consulted Successfully!!</div>
            <div style={{fontSize:'20px', fontWeight:'lighter'}}>Continue to <a href='/'>Home</a></div>
        </div>
    )
}
