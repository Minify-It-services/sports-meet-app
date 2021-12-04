import React from 'react'
import './ParticipatedSportCard.scss'
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';


function ParticipatedSportCard({sport,role,title}) {
    return (
        <div id="participated-sport-card">
            <h3>{title}</h3>
            <div className="participated-card-content">
                <div className="grid">
                    <div className="flex"><p>Role:</p><Chip variant="outlined" color="warning" size="small" label={role} sx={{minWidth:'120px'}} className="chip"/></div>
                    <div className="flex"><p>Sport:</p><Chip variant="outlined" color="warning" size="small" label={sport} sx={{minWidth:'120px'}} className="chip"/></div>
                </div>
                <Button variant="contained" endIcon={<SendIcon />} size="small" sx={{maxWidth:"120px", maxHeight:"35px"}}>Details</Button>
            </div>
        </div>
    )
}

export default ParticipatedSportCard
