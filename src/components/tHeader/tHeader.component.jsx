import React from 'react';
import './tHeader.style.scss';
import { Link } from 'react-router-dom';
import { removeUser } from '../../redux/user/user.action';

const tHeader = () =>{
    return(
        <div className='nav'>
            <div className="hamburger">
                <div className='line'></div>
                <div className='line'></div>
                <div className='line'></div>
            </div>            
            <ul className='navlinks'>
                <Link to='/teacherHomepage'><li>DashBoard</li></Link>
                <Link to='/teacherAttendance'><li>Attendance</li></Link>
                <Link to='/noticeTeacher'><li>Notice Board</li></Link>
                <li>Examination</li>
                {/* <li>Fee Payment</li>
                <li>Contact Us</li> */}
            </ul>
            <a href='/'><div className='sign-out' onClick={()=>{removeUser()}}>Sign Out</div></a>
        </div>
    )
}


export default tHeader;