import React from 'react';
import './sprofile.style.scss';
import { connect } from 'react-redux';

const sprofile = ({currentUser}) =>{
    return(
        <div className='p-page'>
        <div className='s-profile'>
            <div className='pic'>
                <img src='' alt='profile pic'/>
            </div>
            <div className='details'>
                <span>Name:{currentUser.displayName}</span>
                <span>Class:{currentUser.Class}</span>
                <span>Admission Number:{currentUser.admissionNo}</span>
                <span>Parent's Name:{currentUser.parentName}</span>
                <span>Email:{currentUser.parentEmail}</span>
                <span>Phone Number:{currentUser.parentPhNo}</span>
            </div>
        </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

export default connect(mapStateToProps)(sprofile);