import React from 'react';
import './MatchCard.scss';
import Chip from '@mui/material/Chip';

function MatchCard({team1,team2,time,sports,status,score1, score2}) {
    return (
        <div id="match-card" >
            <div className="match" >
                <p className="team1">
                    {team1}
                </p>
                <p className="time">
                    {
                        status==='completed'?(<>{score1} : {score2}</>):(<>Time: {time}</>)
                    }
                </p>
                <p className="team2">
                    {team2}
                </p>
            </div>
            <Chip variant="outlined" color="error" size="small" label={sports} sx={{fontSize:'0.5rem', fontWeight:'500'}} />
        </div>
    )
}

export default MatchCard
