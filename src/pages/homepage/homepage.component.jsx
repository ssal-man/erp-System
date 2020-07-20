import React from 'react';
import './homepage.style.scss';

const homepage = () =>{
    return(
        <div className='homepage'>
        <div className='homepage-alert'>
            <div className='alert'>
            You haven’t signed in yet. Please sign in to continue visiting website.
            </div>
            <div className='b-clicks'>
                <button>Sign In as a Teacher</button>
                <button>Sign In as a Parent/Student</button>
                <button>Sign In as a Admin</button>
            </div>
        </div>
        </div>
    );
}

export default homepage;