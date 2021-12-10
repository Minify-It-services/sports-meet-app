import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import ListSubheader from "@mui/material/ListSubheader";
import sportImg from "../assets/img/cricket.png";
import MatchCard from "../components/MatchCard";
import FixtureCard from "../components/FixtureCard";
import Layout from "../layout/Layout";

function MatchDetails() {
  return (
    <Layout title="Match Details">
    <Container>
      <Typography
        color="primary"
        sx={{
          fontSize: "1rem",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          borderBottom: "2px dashed #00000050",
          marginBottom: "25px",
          padding: "10px 0px",
        }}
      >
        <img
          src={sportImg}
          alt="sport-icon"
          width="40px"
          height="40px"
          style={{ backgroundColor: "", marginRight: "1em" }}
        />{" "}
        sportNames
      </Typography>

      <Typography variant="h6">Software A 2019 VS Software B 2018</Typography>
      <Typography variant="body2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias totam
        rem error facere vero tempora. Animi omnis eligendi doloremque autem!
      </Typography>

      <Stack spacing={1}>
        <ListSubheader sx={{ paddingX: "0px" }}>Upcoming Matches</ListSubheader>
        <MatchCard team1="Nepal" team2="India" sports="Football" time="4PM" />
        <MatchCard team1="Nepal" team2="India" sports="Football" />
        <MatchCard team1="Nepal" team2="India" sports="Football" />
      </Stack>
      <Stack spacing={1}>
        <ListSubheader sx={{ paddingX: "0px" }}>
          Completed Matches
        </ListSubheader>
        {/* //TODO: add fixture card here */}
        {/* <FixtureCard gameName='Cricket' matches={['a','b','c']}/> */}
      </Stack>
    </Container>
    </Layout>
  );
}

export default MatchDetails
