import React from 'react';
import './aHeader.style.scss';
import { Link } from 'react-router-dom';

const aHeader = () =>{
    return(
        <div className='nav'>
            <div className="hamburger">
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
            </div>            
            <ul className='navlinks'>
                <Link to='/adminHome'><li>Student's Profile</li></Link>
                <Link to='/changeAttendance'><li>Attendance</li></Link>
                <Link to='/noticeAdmin'><li>Notice Board</li></Link>
                {/* <li>Examination</li>
                <li>Fee Payment</li>
                <li>Contact Us</li> */}
            </ul>
        </div>
    )
}


export default aHeader;