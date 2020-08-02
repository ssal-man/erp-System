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
                <Link to='/examination'><li>Examination</li></Link>
                <Link to='/feePayment'><li>Fee Payment</li></Link>
                <Link to='/leaveApplication'><li>Apply for leave</li></Link>
            </ul>
            <a href='/'><div className='sign-out' onClick={()=>{removeUser()}}>Sign Out</div></a>
        </div>
    )
}


export default pHeader;