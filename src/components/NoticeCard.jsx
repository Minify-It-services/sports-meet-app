import React from 'react';
import Chip from '@mui/material/Chip';
import './NoticeCard.scss'

function NoticeCard({title,status,desc}) {
    return (
        <div id="notice-card">
            <div className="notice-card-header">
                <div className="title">
                    {title}
                </div>
                <Chip variant="outlined" color="warning" size="small" label={status} sx={{minWidth:'120px'}} className="chip"/>
            </div>
            <p>
                {desc}
            </p>
        </div>
    )
}

export default NoticeCard
