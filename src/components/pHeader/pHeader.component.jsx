import React from 'react';
import './pHeader.style.scss';
import { Link } from 'react-router-dom';
import { removeUser } from '../../redux/user/user.action';

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
                <Link to='/checkAttendance'><li>Attendance</li></Link>
                <Link to='/checkNoticeStudent'><li>Notice Board</li></Link>
                <li>Examination</li>
                <li>Fee Payment</li>
                <Link to='/leaveApplication'><li>Apply for leave</li></Link>
            </ul>
            <a href='/'><div className='sign-out' onClick={()=>{removeUser()}}>Sign Out</div></a>
        </div>
    )
}


export default pHeader;