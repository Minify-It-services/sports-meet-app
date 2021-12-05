import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Link } from 'react-router-dom';

// components
import DrawerBar from "../../../components/DrawerBar";

const Fixtures = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <DrawerBar pageName={"Fixture"} pageId={4} />
            <Box sx={{ flexGrow: 1, pt: 12.5, px: { xs: 2, sm: 3, md: 5 } }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>Match Or Result</Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            lg: "repeat(4,1fr)",
                            xs: "repeat(2,1fr)",
                            md: "repeat(4,1fr)",
                        },
                        padding: '2em',
                        gap: '2em'
                    }}
                >
                    <Link to='/admin/fixture/matches' style={{ textDecoration: 'none', }}>
                        <Paper sx={{ padding: '1em', textAlign: 'center' }}>
                            <Typography variant="body">Matches</Typography>
                        </Paper>
                    </Link>
                    <Link to='/admin/fixture/results' style={{ textDecoration: 'none', }}>
                        <Paper sx={{ padding: '1em', textAlign: 'center' }}>
                            <Typography variant="body">Results</Typography>
                        </Paper>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Fixtures;
