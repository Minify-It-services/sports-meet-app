import React from 'react'
import '../styles/customcard/customcard.scss'
import Typography from '@mui/material/Typography';


function CustomCard(props) {
    return (
        <div id="customcard">
            <div className="img-container"><img src={props.image} alt="icon" /></div>
            <Typography id="label" variant="body1" component="p">{props.label}</Typography>
        </div>
    )
}

export default CustomCard
