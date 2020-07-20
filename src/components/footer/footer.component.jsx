import React from 'react';
import './footer.style.scss';
import {ReactComponent as Insta} from '../../assets/instagram.svg';
import {ReactComponent as Fb} from '../../assets/facebook.svg';
import {ReactComponent as Twitter} from '../../assets/twitter.svg';

const footer = () =>{
    return(
        <div className='footer'>
            <Insta className='logo'/>
            <Fb className='logo'/>
            <Twitter className='logo'/>
        </div>
    );
}

export default footer;