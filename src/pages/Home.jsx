import { Typography } from '@mui/material';
import React from 'react';

// components
import Layout from '../layout/Layout';

const Home = () => {
    return (
        <Layout title="Home Page">
            <div className="homeBackground"
                style={{
                backgroundImage: "url(/images/home-bg.gif)",
                height:"70vh",
                width:"100%",
                backgroundPosition:"center",
                backgroundRepeat:"no-repeat",
                backgroundSize:"contain",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
                }}>
                    <div className="bgText"
                        style={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        justifyContent:"center",
                        textAlign:"center",
                        }}>
                        <Typography variant="h3" style={{fontSize:"3rem"}}>Welcome To GCES Sports Meet App </Typography>
                        <Typography variant="h6">Let's play soon</Typography>
                    </div>
            </div>
        </Layout>
    )
}

export default Home;
