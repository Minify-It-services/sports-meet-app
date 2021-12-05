import React from 'react';
import Chip from '@mui/material/Chip';
import './NoticeCard.scss'

function NoticeCard({title,status,desc}) {
    return (
        <div id="notice-card">
            <div className="notice-card-header">
                <div className="title">
                    {/* {title} */}Match Delayed
                </div>
                {/* label={status} */}
                <Chip variant="outlined" color="warning" size="small" label="delayed" sx={{minWidth:'120px'}} className="chip"/>
            </div>
            <p>
                {/* {desc} */}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum repudiandae facilis rem, neque quam saepe at totam vero placeat eius!
            </p>
        </div>
    )
}

export default NoticeCard
