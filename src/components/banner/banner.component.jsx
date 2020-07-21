import React from 'react';
import './banner.style.scss';
import { connect } from 'react-redux';
import { removeUser } from '../../redux/user/user.action';

const banner = ({currentUser,removeUser}) =>{
    return(
        <div className='banner'>
            <a href='/'>ERP SYSTEM</a>
            {currentUser?<div className='sign-out' onClick={()=>{removeUser()}}>Sign Out</div>:null}
        </div>
        
    );
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
  })

  const mapDispatchToProps = dispatch => ({
    removeUser: user => dispatch(removeUser(user))
  })

export default connect(mapStateToProps,mapDispatchToProps)(banner);