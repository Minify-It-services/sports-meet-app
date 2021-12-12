import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import CustomCard from "../components/CustomCard";
import Layout from "../layout/Layout";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// components:
import Loader from '../components/Loader';
import jsendDestructor from "../utils/api/jsendDestructor";
import Minify from "../components/Minify";

const TeamRegister = () => {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get("sports_app_token");
    const player = JSON.parse(localStorage.getItem('player'))
    const jsendRes = new jsendDestructor({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    });
    const [sports, setSports] = useState([]);
    const [loading, setLoading] = useState(false);
    const getSports = async () => {
        setLoading(true);
        const { data, status, message } = await jsendRes.destructFromApi(
            `/sports?gender=${player.gender}`,
            "GET"
        );
        if (status === "success") {
            setSports(data);
            setLoading(false);
        } else {
            console.log(data, message);
        }
    };
    useEffect(() => {
        if(!player){
            navigate('/register')
        }
        getSports();
      // eslint-disable-next-line
    }, []);

    return (
        <Layout title="Register">
            {loading&&<Loader />}
            <Box sx={{ width: "100%", marginTop:"25px", textAlign:'center' }}>
                <Container
                    sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: "600"}}>
                        Select the sport you want to register in
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent:'center',
                            flexWrap: 'wrap',
                            marginTop:'25px'
                        }}
                    >
                        {sports?.map((sport) => {
                            let type = "solo-registration";
                            if (sport.type === "team") {
                                type = "team-registration";
                            }
                            if (sport.type === "duo") {
                                type = "duo-registration";
                            }
                            return (
                            <Link
                                to={`/teamRegister/${type}/${sport.name}`}
                                key={sport.id}
                                style={{ textDecoration: "none" }}
                            >
                            <CustomCard
                                label={sport.name}
                                image={sport.imageUrl}
                            ></CustomCard>
                            </Link>
                            );
                        })}
                    </Box>
                </Container>
            </Box>
            <Minify />
        </Layout>
    );
};

export default TeamRegister;
