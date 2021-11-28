import React, { useState, useEffect } from "react";

import CustomCard from "../components/CustomCard";
import Layout from "../layout/Layout";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import jsendDestructor from "../utils/api/jsendDestructor";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

// const Item = styled(Paper)(() => ({
//     textAlign: "center",
//     height: 60,
//     lineHeight: "60px",
// }));

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
    }, []);

    return (
        <Layout title="Team Register">
            <Box sx={{ width: "100%" }}>
                <Container
                    sx={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        Select sport you want to participate
                    </Typography>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                lg: "repeat(4,1fr)",
                                xs: "repeat(2,1fr)",
                                md: "repeat(4,1fr)",
                            },
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
                                to={`/teamRegister/${type}`}
                                key={sport.id}
                                state={sport}
                                style={{ textDecoration: "none" }}
                            >
                            <CustomCard
                                label={sport.name}
                                image="https://www.pngkit.com/png/full/481-4812605_playing-cricket-cartoon-clipart-cricket-royalty-free-cricket.png"
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
