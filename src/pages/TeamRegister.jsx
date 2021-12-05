import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

import CustomCard from "../components/CustomCard";
import Layout from "../layout/Layout";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// components:
import jsendDestructor from "../utils/api/jsendDestructor";

const TeamRegister = () => {
    const cookies = new Cookies();
    const token = cookies.get("sports_app_token");
    const jsendRes = new jsendDestructor({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    });
    const [sports, setSports] = useState([]);
    const getSports = async () => {
        const { data, status, message } = await jsendRes.destructFromApi(
            "/sports",
            "GET"
        );
        if (status === "success") {
            setSports(data);
        } else {
            console.log(data, message);
        }
    };
    useEffect(() => {
        getSports();
      // eslint-disable-next-line
    }, []);

    return (
        <Layout title="Register">
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
                    <Typography variant="h6" sx={{ fontWeight: "bold"}}>
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
        </Layout>
    );
};

export default TeamRegister;
