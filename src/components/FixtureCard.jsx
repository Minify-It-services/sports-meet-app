import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SportImage from '../assets/img/cricket.png'

import './FixtureCard.scss'
function FixtureCard() {
    return (
        <div id="fixture-card">
            <div className="sport-bar">
                <img src={SportImage} alt="sporticon" style={{alignSelf:"center"}} />
                <Typography variant="subtitle2" gutterBottom component="h6" style={{fontWeight:'600' ,margin:0}}>Cricket</Typography>
            </div>
            <div className="fixture-container">
            <Typography variant="subtitle1" gutterBottom component="div" className="header">Matches</Typography>
            {/* //map div.fixtures for fixtures  */}
            <div className="fixture">
                <Typography variant="subtitle2" gutterBottom component="div">Team1</Typography>
                <Typography variant="subtitle2" gutterBottom component="div" className="center">VS</Typography>
                <Typography variant="subtitle2" gutterBottom component="div"className="right">Team2</Typography>
            </div>
            <div className="fixture">
                <Typography variant="subtitle2" gutterBottom component="div">Team1</Typography>
                <Typography variant="subtitle2" gutterBottom component="div" className="center">VS</Typography>
                <Typography variant="subtitle2" gutterBottom component="div"className="right">Team2</Typography>
            </div>
            <div className="flex">
                <Button variant="contained" size="small" style={{textTransform:"none"}} endIcon={<ArrowForwardIosIcon />}>Details</Button>
            </div>
            </div>
        </div>
    )
}

export default FixtureCard
