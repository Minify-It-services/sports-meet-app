import React from 'react';

const Home = () => {
    return (
        <div className="homeBackground"
            style={{
            backgroundImage: "url(/images/home-bg.gif)",
            height:"100vh",
            width:"100vw",
            backgroundPosition:"center",
            backgroundRepeat:"no-repeat",
            backgroundSize:"contain",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
                }}
            >
        <div className="bgText"
            style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            textAlign:"center",
                }}
            >
            <h3 style={{fontSize:"3rem"}}>Welcome To GCES Sports Meet App </h3>
            <h4>We are working on it!! We’ll be there soon</h4>
            </div>
        </div>
    )
}

export default Home;
