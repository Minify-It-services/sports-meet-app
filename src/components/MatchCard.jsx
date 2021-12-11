import React from 'react';
import './MatchCard.scss';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

function MatchCard({match, showDate=false, sportName}) {
    return (
        <div id="match-card" >
            <div className="match" >
                <p className="team1">
                    {match.team1.name}
                </p>
                <p className="time">
                    {
                        match.status==='completed'?(<>{match.score.team1Score} : {match.score.team2Score}</>):(<>
                            {showDate?(<>{match.date.substr(0,10)}</>):(<>Time: {match.time}</>)}
                        </>)
                    }
                </p>
                <p className="team2">
                    {match.team2.name}
                </p>
            </div>
            <div className="match-details">
                {
                match.status==='completed'&&(<>
                        <Typography color="primary" variant="subtitle2" sx={{ textDecoration: 'underline' }}>Score Details</Typography>
                        {
                            match.scores.map(s => (<Typography variant="body2" key={s}>{s}</Typography>))
                        }
                        {
                            match.cards.length>0&&(<>
                                <Typography color="primary" variant="subtitle2" sx={{ textDecoration: 'underline' }}>Card Details</Typography>
                                {
                                    match.cards.map(c => (<Typography variant="body2" key={c}>{c}</Typography>))
                                }
                            </>)
                        }
                    </>)
                }
            </div>
            <Chip variant="outlined" color="error" size="small" label={sportName} sx={{fontSize:'0.5rem', fontWeight:'500'}} />
        </div>
    )
}

export default MatchCard
