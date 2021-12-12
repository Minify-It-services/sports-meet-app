import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom'

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Cookies from 'universal-cookie';
import LinearProgress from '@mui/material/LinearProgress';

import jsendDestructor from '../utils/api/jsendDestructor'
import NoTeam from '../components/NoTeam'
import { getSport } from '../utils/helpers/getSport'
import Layout from "../layout/Layout";
import RegisterUp from "../components/RegisterUp";

const TeamRegistration = () => {

  const managerRef = useRef()
  const coachRef = useRef()
  const captainRef = useRef()
  const playerRef = useRef()
  const { sportName } = useParams()
  const [sport, setSport] = useState({})
  const cookies = new Cookies()
  const [isRegisterTimeUp, setIsRegisterTimeUp] = useState(false)

  const token = cookies.get('sports_app_token')
  const player = JSON.parse(localStorage.getItem('player'))

  const jsendRes = new jsendDestructor({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  })

  const [teamData, setTeamData] = useState({
    registered: false,
    hasError: false,
    displayMessage: '',
    hasTeamSlot: true,
    teamId: '',
    memberIds: [],
    coach: null,
    manager: null,
    captain: null,
    selectedOptions: [],
    role: ''
  })
  const [members, setMembers] = useState([])
  const [allMembers, setAllMembers] = useState([])
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  
  const getPlayers = async () => {
    const { data, status, message } = await jsendRes.destructFromApi(`/users?year=${player.year}&userId=${player.id}&faculty=${player.faculty}&sport=${sportName}&sportType=team&gender=${player.gender}`, 'GET')
    if(status === 'success'){
      setMembers(data)
    }else{
      console.log(data, message);
    }
  }

  const getAllPlayers = async () => {
    const { data, status, message } = await jsendRes.destructFromApi(`/users?year=${player.year}&userId=${player.id}&faculty=${player.faculty}&sport=${sportName}&sportType=team`, 'GET')
    if(status === 'success'){
      setAllMembers(data)
    }else{
      console.log(data, message);
    }
    setLoading(false)
  }

  const checkForAvailability = async () => {
    setLoading(true);
    const { data } = await jsendRes.destructFromApi(
      `/teams/check?sport=${sportName}&sportType=team&year=${player.year}&faculty=${player.faculty}&playerId=${player.id}`, 
      'GET'
    )
    if(data.message === 'Team full'){
      setTeamData(prevState => {
        return {
          ...prevState,
          hasTeamSlot: false,
        }
      })
    }
    if(data.message === 'Already in a team'){
      setTeamData(prevState => {
        return {
          ...prevState,
          memberIds: data.teamMembers,
          coach: data.coach,
          manager: data.manager,
          captain: data.captain,
          registered: true,
          teamId: data.teamId,
          selectedOptions: [data.manager],
          role: data.role,
        }
      })
    }
  }

  useEffect(() => {
    getSport(sportName, jsendRes).then(res => {
      setSport(res.sport)
      setIsRegisterTimeUp(res.isRegisterTimeUp)
    })
    checkForAvailability();
    getPlayers();
    getAllPlayers();
  // eslint-disable-next-line
  }, [teamData.registered])

  const getYear = (year) => {
    switch(year) {
      case '2018':
        return '3rd year'
      case '2017':
        return '4th year'
      case '2019':
        return '2nd year'
      case '2020':
        return '1st year'
      default: return ''
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    if(teamData.memberIds.length === ((parseInt(sport.playerLimit)-1)+parseInt(sport.extraLimit))){
      let response = {}
      if(teamData.registered){
        const teamToSend = {
          coach: teamData.coach.id,
          captain: teamData.captain.id,
          memberIds: teamData.memberIds.map(member => member.id)
        }

        response = await jsendRes.destructFromApi(`/teams/${teamData.teamId}`, 'PATCH', teamToSend)
      }else{
        const teamToSend = {
          name: `${player.faculty} ${getYear(player.year)} Team A`,
          year: player.year,
          semester: player.semester,
          faculty: player.faculty,
          sport: {
            name: sport.name,
            gameType: sport.type,
          },
          coach: teamData.coach.id,
          captain: teamData.captain.id,
          manager: teamData.manager.id,
          memberIds: teamData.memberIds.map(member => member.id)
        }

        response = await jsendRes.destructFromApi('/teams', 'POST', teamToSend)
      }

      const { data, status, message } = response

      if(status === 'success'){
        if(teamData.registered){
          setTeamData(prevState => {
            return {
              ...prevState,
              displayMessage: 'Successfully updated your team',
            }
          })
        }else{
          setTeamData(prevState => {
            return {
              ...prevState,
              registered: true,
              hasError: false,
              displayMessage: `Successfully registered in ${sport.name}`,
            }
          })
        }
        setOpen(true);
      }else{
        console.log(data, message);
      }
    }else{
      setTeamData(prevState => ({
        ...prevState,
        hasError: true,
        displayMessage: 'Please select required players'
      }))
      setOpen(true);
    }

    setLoading(false);
  };

  const handleChange = (e, value, ref) => {
    const name = ref.current.getAttribute('name')
    if(value){
      if(name === 'memberIds'){
        if(teamData[name].length === 0 || (teamData[name].length <= value.length)){
          setTeamData(prevState => {
            return {
              ...prevState,
              [name]: [...value],
              selectedOptions: [...prevState.selectedOptions, ...value]
            }
          })
        }else{
          setTeamData(prevState => {
            return {
              ...prevState,
              [name]: [...value],
              selectedOptions: [teamData.manager, teamData.coach, teamData.captain, ...value]
            }
          })
        }
      }else{
        setTeamData(prevState => ({
            ...prevState,
            [name]: value,
            selectedOptions: [...prevState.selectedOptions, value]
          })
        )
      }
    }else{
      setTeamData(prevState => ({
        ...prevState,
        [name]: null,
        selectedOptions: prevState.selectedOptions.filter(val => JSON.stringify(val)!==JSON.stringify(teamData[name])),
      }))
    }
  }

  const handleRemoveTeam = async () => {
    const response = await jsendRes.destructFromApi(`/teams/${teamData.teamId}`, 'DELETE')

    if(response.status === 'success'){
      setTeamData(prevState => ({
        ...prevState,
        registered: false,
        displayMessage: 'Team deleted successfully',
        hasError: false,
        hasTeamSlot: true,
      }))
      setOpen(!open)
    }else{
      console.log(response);
    }
  }

  return (
    <Layout title="Team Register" isSecondPage>
      <Container sx={{ marginTop: 5 }}>
        <Stack spacing={3}>
          <Typography color='primary' sx={{fontSize:'1rem', fontWeight:'600', display: 'flex', alignItems: 'center', borderBottom:'2px dashed #00000050', marginBottom:'25px', padding:'10px 0px'}}>
            <img src={sport.imageUrl} alt="" width="50px" style={{ backgroundColor:'', marginRight: '1em'}} />  { sportName }
          </Typography>
          <p>
            Coordinators: {sport?.coordinators?.join(', ')}
          </p>
          {isRegisterTimeUp&&<RegisterUp />}
          {
            loading?<LinearProgress color="inherit" />:(
              <>
                {
                  teamData.hasTeamSlot?(
                    <>
                      <Stack spacing={{ xs: 2, md: 4 }}>
                        <form id="team-form" onSubmit={handleRegister}>
                          <div>
                            <Autocomplete
                              getOptionLabel={(option) => option.name ? option.name : ''}
                              isOptionEqualToValue={(option, value) =>
                                option.label === value.name
                              }
                              disablePortal
                              name="manager"
                              ref={managerRef}
                              options={allMembers}
                              disabled={(teamData.registered || isRegisterTimeUp)}
                              value={teamData.manager}
                              onChange={(e, value) => handleChange(e, value, managerRef)}
                              getOptionDisabled={(option) => (teamData.selectedOptions.includes(option)?true:false)}
                              renderInput={(params) => (
                                <TextField {...params} label="Manager" variant="standard" required={true} />
                              )}
                            />
                          </div>
                          <div>
                            <Autocomplete
                              getOptionLabel={(option) => option.name ? option.name : ''}
                              isOptionEqualToValue={(option, value) =>
                                option.label === value.name
                              }
                              disablePortal
                              name="coach"
                              ref={coachRef}
                              disabled={(teamData.registered&&(teamData.role!=='manager'&&teamData.role!=='coach'))||isRegisterTimeUp}
                              onChange={(e, value) => handleChange(e, value, coachRef)}
                              options={allMembers}
                              value={teamData.coach}
                              getOptionDisabled={(option) => (teamData.selectedOptions.includes(option)?true:false)}
                              renderInput={(params) => (
                                <TextField {...params} label="Coach" variant="standard" required={true} />
                              )}
                            />
                          </div>
                          <div>
                            <Autocomplete
                              getOptionLabel={(option) => option.name ? option.name : ''}
                              isOptionEqualToValue={(option, value) =>
                                option.label === value.name
                              }
                              disablePortal
                              name="captain"
                              ref={captainRef}
                              options={members}
                              disabled={(teamData.registered&&(teamData.role!=='manager'&&teamData.role!=='coach'))||isRegisterTimeUp}
                              value={teamData.captain}
                              onChange={(e, value) => handleChange(e, value, captainRef)}
                              getOptionDisabled={(option) => (teamData.selectedOptions.includes(option)?true:false)}
                              renderInput={(params) => (
                                <TextField {...params} label="Captain" variant="standard" required={true} />
                              )}
                            />
                          </div>
                          <div>
                            <Autocomplete
                              getOptionLabel={(option) => option.name}
                              isOptionEqualToValue={(option, value) =>
                                option.label === value.name
                              }
                              multiple
                              name="memberIds"
                              ref={playerRef}
                              disabled={(teamData.registered&&(teamData.role!=='manager'&&teamData.role!=='coach'))||isRegisterTimeUp}
                              value={teamData.memberIds}
                              onChange={(e, value) => handleChange(e, value, playerRef)}
                              options={members}
                              getOptionDisabled={(option) => (( teamData.memberIds?.length === ((parseInt(sport.playerLimit)-1)+parseInt(sport.extraLimit)) || teamData.selectedOptions.includes(option) )?true:false)}
                              renderInput={(params) => (
                                <TextField {...params} variant="standard" label="Players" />
                              )}
                            />
                          </div>
                        </form>
                      </Stack>
                      {
                        !isRegisterTimeUp&&(
                          <>
                            {
                              teamData.registered?(
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1em' }}>
                                  {teamData.role==='manager'?(
                                      <>
                                        <Button
                                          variant="contained"
                                          sx={{ width: 150, alignSelf: "center" }}
                                          color="error"
                                          onClick={handleRemoveTeam}
                                        >
                                          Remove Team
                                        </Button>
                                        <Button
                                          variant="contained"
                                          sx={{ width: 150, alignSelf: "center" }}
                                          form="team-form"
                                          type="submit"
                                        >
                                          Edit
                                        </Button>
                                      </>
                                    ):null}
                                </Box>
                              ):(
                                <Button
                                  variant="contained"
                                  sx={{ width: 150, alignSelf: "center" }}
                                  form="team-form"
                                  type="submit"
                                >
                                  Register
                                </Button>
                              )
                            }
                          </>
                        )
                      }
                    </>
                  ): <NoTeam />
                }
              </>
            )
          }
          <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={teamData.hasError ? "error" : "success"}
              sx={{ width: "100%" }}
            >
              {teamData.displayMessage}
            </Alert>
          </Snackbar>
          <Typography variant="h6">Rules</Typography>
          <ul style={{margin:'0 1rem'}}>
            {
              sport?.rules?.map(rule=>(<li key={rule}>{rule}</li>))
            }
          </ul>
        </Stack>
      </Container>
    </Layout>
  );
}

export default TeamRegistration;
