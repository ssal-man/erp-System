import React from 'react';
import './pHeader.style.scss';
import { Link } from 'react-router-dom';

const pHeader = () =>{
    return(
        <div className='nav'>
            <div className="hamburger">
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
            </div>            
            <ul className='navlinks'>
                <Link to='/'><li>Student's Profile</li></Link>
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