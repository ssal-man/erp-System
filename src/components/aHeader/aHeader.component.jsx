import React from 'react';
import './aHeader.style.scss';
import { Link } from 'react-router-dom';
import { removeUser } from '../../redux/user/user.action';

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
                <Link to='/addStudent'><li>Add Student</li></Link>
                <Link to='/addTeacher'><li>Add Teacher</li></Link>
                {/* <li>Contact Us</li> */}
            </ul>
            <a href='/'><div className='sign-out' onClick={()=>{removeUser()}}>Sign Out</div></a>
        </div>
    )
}


export default aHeader;