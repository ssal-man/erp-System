import React from 'react';
import './tHeader.style.scss';
import { Link } from 'react-router-dom';

const tHeader = () =>{
    return(
        <div className='nav'>
            <div className="hamburger">
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
            </div>            
            <ul className='navlinks'>
                <Link to='/teacherHomepage'><li>Student's Profile</li></Link>
                <Link to='/giveAttendance'><li>Attendance</li></Link>
                <li>Notice Board</li>
                <li>Examination</li>
                {/* <li>Fee Payment</li>
                <li>Contact Us</li> */}
            </ul>
        </div>
    )
}


export default tHeader;