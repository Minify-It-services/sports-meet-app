import * as React from 'react'
import Typography from '@mui/material/Typography';
import  Button  from '@mui/material/Button';
import Container  from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Alert } from '@mui/material';
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import Cookies from 'universal-cookie'
import jsendDestructor from '../utils/api/jsendDestructor'
import NoTeam from '../components/NoTeam'

//TODO: Fix FONT SIZING
function SoloRegistration() {
    const location = useLocation()
    const cookies = new Cookies()

    const token = cookies.get('sports_app_token')
    const player = JSON.parse(localStorage.getItem('player'))

    const jsendRes = new jsendDestructor({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    const [sport] = useState(location.state)
    const [duoData, setDuoData] = useState({
      registered: false,
      teamId: '',
      hasTeamSlot: true,
      partner: {},
      displayMessage: '',
      hasError: false,
    })
    const [members, setMembers] = useState([])

    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

      const getPlayers = async () => {
        const { data, status, message } = await jsendRes.destructFromApi(`/users?year=${player.year}&userId=${player.id}&faculty=${player.faculty}&sport=${sport.name}`, 'GET')
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
          setDuoData(prevState => {
            return {
              ...prevState,
              hasTeamSlot: false,
            }
          })
        }
        if(data.message === 'Already in a team'){
          setDuoData(prevState => {
            return {
              ...prevState,
              partner: data.teamMembers[0],
              registered: true,
              teamId: data.teamId
            }
          })
        }
      }

      useEffect(() => {
        checkForAvailability();
        if(!duoData.partner.name){
          getPlayers();
        }
      // eslint-disable-next-line
      }, [duoData.registered])
      
      const handleRegister = async () => {
        let response;

        if(duoData.registered){
          response = await jsendRes.destructFromApi(`/teams/leave/${duoData.teamId}`, 'DELETE')
        }else{
          const team = {
            name: `${player.name}, ${duoData.partner.name}`,
            year: player.year,
            semester: player.semester,
            faculty: player.faculty,
            sport: sport.name,
            memberIds: [
              player.id,
              duoData.partner.id,
            ],
          }
          response = await jsendRes.destructFromApi('/teams', 'POST', team)
        }
        
        const { data, status, message } = response

        if(status === 'success'){
          if(duoData.registered){
            setDuoData(prevState => {
              return {
                ...prevState,
                registered: false,
                hasError: true,
                displayMessage: 'You Left the Team',
              }
            })
          }else{
            setDuoData(prevState => {
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
      }
    return (
            <>
            <div className="banner" style={{minHeight:"30vh",backgroundImage: "url(https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350)",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}>
            </div>
            <Container sx={{marginTop:5}}>
            <Stack spacing={{xs:2,md:4}}>
            <Typography variant="h5">{sport.name}</Typography>
            <p>Fact: There are over 318 billion different possible positions after four moves each.</p>
            {
              duoData.hasTeamSlot?(
                <>
                {
                  duoData.registered ? (
                    <div><Typography variant="h5">Your Partner</Typography><p>{duoData.partner.name}</p></div>
                  ) :(
                    <>
                      <Typography variant="subtitle">Select Your Partner</Typography>
                      <Autocomplete
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.label === value.name}
                          autoComplete={false}
                          options={members}
                          onChange={(event, value) => setDuoData(prevState => {
                            return {
                              ...prevState,
                              partner: value,
                            }
                          })}
                          renderInput={(params) => <TextField {...params} label="Partner" variant="standard" required={true}/>}
                      />
                    </>
                  )
                }
                <Button variant="contained" sx={{width: 150,alignSelf:"center"}} onClick={handleRegister}>{duoData.registered? "Leave":"Register"}</Button>
              </>
              ):<NoTeam/>
            }
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                <Alert onClose={handleClose} severity={!duoData.hasError?"success":"error"} sx={{ width: '100%' }}>
                {duoData.displayMessage}
                </Alert>
            </Snackbar>
            <Typography variant="h5">Rules</Typography>
            <ul style={{margin:"0 20px",fontSize:"18px"}}>
              {
                sport.rules.map(rule=>(<li key={rule}>{rule}</li>))
              }
            </ul>
            </Stack>
        </Container>
        </>
    )
}

export default SoloRegistration
