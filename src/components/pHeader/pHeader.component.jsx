import React from 'react';
import './pHeader.style.scss';

const pHeader = () =>{
    return(
        <div className='nav'>
            <div className="hamburger">
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
            </div>            
            <ul className='navlinks'>
                <li>Student's Profile</li>
                <li>Attendance</li>
                <li>Notice Board</li>
                <li>Examination</li>
                <li>Fee Payment</li>
                <li>Contact Us</li>
            </ul>
        </div>
    )
}


export default pHeader;