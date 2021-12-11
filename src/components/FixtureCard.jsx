import React from 'react'
import { Link } from 'react-router-dom'

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import './FixtureCard.scss'
function FixtureCard({ gameName, matches }) {
    return (
        <div id="fixture-card">
            <div className="sport-bar">
                {/* <img src={sportImage} alt="sporticon" style={{alignSelf:"center"}} /> */}
                <Typography variant="subtitle2" gutterBottom component="h6" style={{fontWeight:'600' ,margin:0}}>{gameName}</Typography>
            </div>
            <div className="fixture-container">
                <Typography variant="subtitle1" gutterBottom component="div" className="header" sx={{fontWeight:'600'}}>
                    Matches
                </Typography>
                {
                    matches[0]&&(
                        <div className="fixture">
                            <Typography variant="subtitle2" gutterBottom component="div">
                                {matches[0]?.team1?.name}
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom component="div" className="center">
                                {matches[0]?.score.team1Score} VS {matches[0]?.score.team2Score}
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom component="div" className="right">
                                {matches[0]?.team2?.name}
                            </Typography>
                        </div>
                    )
                }
                {
                    matches[1]&&(
                        <div className="fixture">
                            <Typography variant="subtitle2" gutterBottom component="div">
                                {matches[1]?.team1?.name}
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom component="div" className="center">
                                {matches[1]?.score.team1Score} VS {matches[1]?.score.team2Score}
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom component="div" className="right">
                                {matches[1]?.team2?.name}
                            </Typography>
                        </div>
                    )
                }
                <div className="flex">
                    <Link to={`/fixture/details/${matches[0].sport.name}/${matches[0].sport.gameType}`}>
                        <Button variant="contained" size="small" style={{textTransform:"none", fontSize:'0.85rem'}} endIcon={<ArrowForwardIosIcon />}>
                            Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FixtureCard
