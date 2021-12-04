import React from 'react';
import './MatchCard.scss';
import Chip from '@mui/material/Chip';

function MatchCard({team1,team2,time,sports}) {
    return (
        <div id="match-card" >
            <div className="match" >
                <p className="team1">{team1}</p>
                <p className="time">Time: {time}</p>
                <p className="team2">{team2}</p>
            </div>
            <Chip variant="outlined" color="error" size="small" label={sports}/>
        </div>
    )
}

export default MatchCard
