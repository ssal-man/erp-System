import React from 'react';
import './sprofile.style.scss';

const sprofile = () =>{
    return(
        <div className='p-page'>
        <div className='s-profile'>
            <div className='pic'>
                <img src={require('../../assets/Student.jpg')} alt='profile pic'/>
            </div>
            <div className='details'>
                <span>Name:</span>
                <span>Class:</span>
                <span>Admission Number:</span>
                <span>Roll Number:</span>
                <span>Parent's Name:</span>
                <span>Email:</span>
                <span>Phone Number:</span>
            </div>
        </div>
        </div>
    )
}

export default sprofile;