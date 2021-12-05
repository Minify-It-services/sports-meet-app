import React from 'react';
import './MatchCard.scss';
import Chip from '@mui/material/Chip';

function MatchCard({team1,team2,time,sports}) {
    return (
        <div id="match-card" >
            <div className="match" >
                <p className="team1">
                    {/* {team1} */} Software 2018
                </p>
                <p className="time">
                    Time: {/* {time} */} 12:00
                </p>
                <p className="team2">
                    {/* {team2} */} Software 2019
                </p>
            </div>
            {/* label={sports} */}
            <Chip variant="outlined" color="error" size="small" label="Football" sx={{fontSize:'0.5rem', fontWeight:'500'}} />
        </div>
    )
}

export default MatchCard
