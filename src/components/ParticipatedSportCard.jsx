import React from 'react'
import './ParticipatedSportCard.scss'
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';


function ParticipatedSportCard({sport,sportType,role,title}) {
    const type = sportType==='single'?'solo-registration':(sportType==='duo'?'duo-registration':'team-registration');
    return (
        <div id="participated-sport-card">
        <Typography variant="subtitle1" gutterBottom component="div">{title}</Typography>
            <div className="participated-card-content">
                <div className="grid">
                    <div className="flex"><p>Role:</p><Chip variant="outlined" color="primary" size="small" label={role} sx={{minWidth:'120px'}} 
                    className="chip"/></div>
                    <div className="flex"><p>Sport:</p><Chip variant="outlined" color="warning" size="small" label={sport} sx={{minWidth:'120px'}} className="chip"/></div>
                </div>
                <Link to={`/teamRegister/${type}/${sport}`} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" endIcon={<SendIcon />} size="small" sx={{maxWidth:"120px", maxHeight:"35px"}} color="primary" style={{textTransform: 'none'}} >Details</Button>
                </Link>
            </div>
        </div>
    )
}

export default ParticipatedSportCard
