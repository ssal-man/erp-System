import React from 'react';
import './homepage.style.scss';
import { Link } from 'react-router-dom';

const homepage = () =>{
    return(
        <div className='homepage'>
        <div className='homepage-alert'>
            <div className='alert'>
            You haven’t signed in yet. Please sign in to continue visiting website.
            </div>
            <div className='b-clicks'>
                <Link to='/teacherSignIn'><button>Sign In as a Teacher</button></Link>
                <Link to='/parentSignIn'><button>Sign In as a Parent/Student</button></Link>
                <Link to='/adminSignIn'><button>Sign In as a Admin</button></Link>
            </div>
        </div>
        </div>
    );
}

export default homepage;