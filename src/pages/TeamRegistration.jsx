import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {useLocation} from 'react-router-dom'

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from "@mui/material/Alert";
import Cookies from 'universal-cookie';

import jsendDestructor from '../utils/api/jsendDestructor'
import NoTeam from '../components/NoTeam'

const TeamRegistration = () => {

  const managerRef = useRef()
  const coachRef = useRef()
  const captainRef = useRef()
  const playerRef = useRef()
  const location = useLocation()
  const [sport] = useState(location.state)
  const cookies = new Cookies()

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
    coach: '',
    manager: '',
    captain: '',
    selectedOptions: [],
    role: ''
  })
  const [members, setMembers] = useState([])
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  
  const getPlayers = async () => {
    const { data, status, message } = await jsendRes.destructFromApi(`/users?year=${player.year}&userId=${player.id}&faculty=${player.faculty}&sport=${sport.name}&gender=${player.gender}`, 'GET')
    if(status === 'success'){
      setMembers(data)
    }else{
      console.log(data, message);
    }
  }

  const checkForAvailability = async () => {
    const { data } = await jsendRes.destructFromApi(
      `/teams/check?sport=${sport.name}&year=${player.year}&faculty=${player.faculty}&playerId=${player.id}`, 
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
    checkForAvailability();
    getPlayers();
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

    if(teamData.memberIds.length === 2){
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
          sport: sport.name,
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
              registered: false,
              hasError: true,
              displayMessage: 'You Left the Team',
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
        selectedOptions: prevState.selectedOptions.filter(val => JSON.stringify(val)!==JSON.stringify(teamData[name])),
      }))
    }
  }

  return (
    <>
      <div
        className="banner"
        style={{
          minHeight: "30vh",
          backgroundImage:
            "url(https://i2-prod.irishmirror.ie/incoming/article8074062.ece/ALTERNATES/s1227b/Atletico-Madrid-v-Real-Madrid.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <Container sx={{ marginTop: 5 }}>
        <Stack spacing={3}>
          <Typography variant="h4">{sport.name}</Typography>
          <p>
            Coordinator: {sport.coordinator} <br />
            Vice-Coordinator: {sport.viceCoordinator}
          </p>
          {
            teamData.hasTeamSlot?(
              <>
                <Stack spacing={{ xs: 2, md: 4 }}>
                  <form id="team-form" onSubmit={handleRegister}>
                    <div>
                      <Autocomplete
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) =>
                          option.label === value.name
                        }
                        disablePortal
                        name="manager"
                        ref={managerRef}
                        options={members}
                        disabled={teamData.registered}
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
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) =>
                          option.label === value.name
                        }
                        disablePortal
                        name="captain"
                        ref={captainRef}
                        options={members}
                        disabled={(teamData.registered&&(teamData.role==='manager'||teamData.role==='coach'))?false:true}
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
                        disablePortal
                        name="coach"
                        ref={coachRef}
                        disabled={(teamData.registered&&(teamData.role==='manager'||teamData.role==='coach'))?false:true}
                        onChange={(e, value) => handleChange(e, value, coachRef)}
                        options={members}
                        value={teamData.coach!=={}?teamData.coach:''}
                        getOptionDisabled={(option) => (teamData.selectedOptions.includes(option)?true:false)}
                        renderInput={(params) => (
                          <TextField {...params} label="Coach" variant="standard" required={true} />
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
                        disabled={(teamData.registered&&(teamData.role==='manager'||teamData.role==='coach'))?false:true}
                        value={teamData.memberIds}
                        onChange={(e, value) => handleChange(e, value, playerRef)}
                        options={members}
                        getOptionDisabled={(option) => (( teamData.memberIds?.length === 2 || teamData.selectedOptions.includes(option) )?true:false)}
                        renderInput={(params) => (
                          <TextField {...params} variant="standard" label="Players" />
                        )}
                      />
                    </div>
                  </form>
                </Stack>
                {
                  teamData.registered?(
                    teamData.role==='manager'?(
                        <>
                          <Button
                            variant="contained"
                            sx={{ width: 150, alignSelf: "center" }}
                            form="team-form"
                            type="submit"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            sx={{ width: 150, alignSelf: "center" }}
                            color="error"
                          >
                            Remove Team
                          </Button>
                        </>
                      ):(
                        <Button
                          variant="contained"
                          sx={{ width: 150, alignSelf: "center" }}
                          color="error"
                        >
                          Leave Team
                        </Button>
                      )
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
            ): <NoTeam />
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
          <Typography variant="h4">Rules</Typography>
          <ul>
            {
              sport.rules.map(rule=>(<li key={rule}>{rule}</li>))
            }
          </ul>
        </Stack>
      </Container>
    </>
  );
}

export default TeamRegistration;
