import React from 'react'

function CustomCard(props) {
    return (
        <div id="customcard">
            <div className="img-container"><img src={props.image} alt="icon" /></div>
            <p id="label">{props.label}</p>
        </div>
    )
}

export default CustomCard
