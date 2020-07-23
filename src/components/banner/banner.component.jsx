import React from 'react';
import './banner.style.scss';
import { connect } from 'react-redux';
import { removeUser } from '../../redux/user/user.action';

const banner = ({currentUser,removeUser}) =>{
    return(
        <div className='banner'>
            <div className='banr'>ERP SYSTEM</div>
            {currentUser?<a href='/'><div className='sign-out' onClick={()=>{removeUser()}}>Sign Out</div></a>:null}
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