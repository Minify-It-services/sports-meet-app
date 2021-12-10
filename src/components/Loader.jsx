import React from 'react'
import './Loader.scss'

const Loader = () => {
    const choice = Math.floor(Math.random() * 1)+1;

    return (
        <>
            <div className="loader-bg"></div>
            <div className="loader">
                <img src={`/images/loader${choice}.gif`} alt="loading gif" />
            </div>   
        </>
    )
}

export default Loader
