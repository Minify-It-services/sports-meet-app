import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import ListSubheader from "@mui/material/ListSubheader";
import MatchCard from "../components/MatchCard";
import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";

import Loader from '../components/Loader'
import jsendDestructor from '../utils/api/jsendDestructor'

function MatchDetails() {
  const jsendRes = new jsendDestructor()
  const { sport, sportType } = useParams()
  const [loading, setLoading] = useState(false)
  const [ matchDetails, setMatchDetails ] = useState()

  const getDetails = async () => {
    setLoading(true)
    const { data, status, message } = await jsendRes.destructFromApi(`/fixtures/${sport}/${sportType}`, 'GET')

    if(status === 'success'){
      setMatchDetails(data);
    }else{
      console.log(data, message);
    }
    setLoading(false)
  }

  useEffect(() => {
    getDetails();
  // eslint-disable-next-line
  }, [])

  return (
    <Layout title="Match Details" isSecondPage>
      {loading&&<Loader />}
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
          src={matchDetails?.sport[0]?.imageUrl}
          alt="sport-icon"
          width="40px"
          height="40px"
          style={{ backgroundColor: "", marginRight: "1em" }}
        />{" "}
        {sport}
      </Typography>

      <Stack spacing={1}>
        <ListSubheader sx={{ paddingX: "0px", zIndex: '-1' }}>Todays Matches</ListSubheader>
        {
          matchDetails?.todaysMatches.length===0?(
            <Typography color='primary' sx={{fontSize:'1rem', fontWeight: '500', padding:'10px 0px', textAlign: 'center'}}>No Matches Today</Typography>
          ):(<>{matchDetails?.todaysMatches?.map(m => (<MatchCard key={m.id} match={m} sportName={sport} />))}</>)
        }
      </Stack>

      <Stack spacing={1}>
        <ListSubheader sx={{ paddingX: "0px", zIndex: '-1' }}>Upcoming Matches</ListSubheader>
        {matchDetails?.upcomingMatches?.map(m => (<MatchCard key={m.id} match={m} showDate sportName={sport} />))}
      </Stack>
      <Stack spacing={1}>
        <ListSubheader sx={{ paddingX: "0px", zIndex: '-1' }}>
          Completed Matches
        </ListSubheader>
        {
          matchDetails?.completedMatches?.map(m => (<MatchCard key={m.id} match={m} showDate sportName={sport} />))
        }
      </Stack>
    </Container>
    </Layout>
  );
}

export default MatchDetails
