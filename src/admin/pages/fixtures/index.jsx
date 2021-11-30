import React, { useState, useEffect } from "react";

import CustomCard from "../../../components/CustomCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import jsendDestructor from "../../../utils/api/jsendDestructor";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

import DrawerBar from "../../../components/DrawerBar";

const Fixtures = () => {
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
        <Box sx={{ display: "flex" }}>
            <DrawerBar pageName={"Fixture"} pageId={4} />
            <Box sx={{ flexGrow: 1, pt: 12.5, px: { xs: 2, sm: 3, md: 5 } }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>Select Sport</Typography>
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
                                to={`/admin/fixtures/game`}
                                // key={sport.id}
                                // state={sport}
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
            </Box>
        </Box>
    );
};

export default Fixtures;
