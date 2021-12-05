import React from 'react';

import { Typography } from '@mui/material';

// components
import Layout from '../layout/Layout';

const Home = () => {
    return (
        <Layout title="Home Page">
            <div className="homeBackground"
                style={{
                height:"80vh",
                width:"100%",
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
                        <Typography variant="h4" style={{fontSize:"1.5rem", fontWeight:'600'}}>
                            Welcome To GCES <br/>Sports Meet 
                        </Typography>
                        <img src="/images/home-bg.gif" alt="" style={{width:'250px'}} />
                        <Typography variant="h6" color='primary' style={{fontSize:"1rem", fontWeight:'500'}}>
                            Let's play soon
                        </Typography>
                    </div>
            </div>
        </Layout>
    )
}

export default Home;
