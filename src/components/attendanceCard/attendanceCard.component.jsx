import React from 'react';
import './attendanceCard.style.scss';

export const AttendanceCard = (props) =>{
    var t = new Date(1970, 0, 1);
    t.setSeconds(props.detail.createdAt.seconds)
    return(
        <div className='a-card'>
            <div className='date'>{t.getDate()}</div>
    <div className='status'>{props.detail.present?`P`:`A`}</div>
        </div>
    );
}

