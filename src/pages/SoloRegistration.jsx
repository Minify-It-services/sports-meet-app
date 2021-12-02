import * as React from 'react'
import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import Cookies from 'universal-cookie'

import Typography from '@mui/material/Typography';
import  Button  from '@mui/material/Button';
import Container  from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// components
import jsendDestructor from '../utils/api/jsendDestructor'
import NoTeam from '../components/NoTeam'

//TODO: need fixing
const SoloRegistration = ()=> {
  const location = useLocation()
  const cookies = new Cookies()

  const token = cookies.get('sports_app_token')
  const player = JSON.parse(localStorage.getItem('player'))

  const jsendRes = new jsendDestructor({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  })

  const [sport] = useState(location.state)
  const [registered, setRegsitered] = useState(false);
  const [teamId, setTeamId] = useState('')
  const [hasTeamSlot, setHasTeamSlot] = useState(true)
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      const checkForAvailability = async () => {
        const { data } = await jsendRes.destructFromApi(
          `/teams/check?sport=${sport.name}&year=${player.year}&faculty=${player.faculty}&playerId=${player.id}`, 
          'GET'
        )
        if(data.message === 'Team full'){
          console.log('Oh no no team spot remaning');
          setHasTeamSlot(false)
        }
        if(data.message === 'Already in a team'){
          console.log('hey you already in team');
          setTeamId(data.teamId)
          setRegsitered(true)
          console.log(teamId)
          console.log(data.teams);
        }
        if(data.message === 'Not in team and team empty'){
          console.log('Ready to play?');
        }
      }

      useEffect(() => {
        checkForAvailability();
      // eslint-disable-next-line
      }, [])

      const handleRegister = async () => {

        let response;

        if(registered){
          response = await jsendRes.destructFromApi(`/teams/leave/${teamId}`, 'DELETE')
        }else{
          const team = {
            name: player.name,
            year: player.year,
            semester: player.semester,
            faculty: player.faculty,
            sport: sport.name,
            memberIds: [
              player.id
            ],
          }
          response = await jsendRes.destructFromApi('/teams', 'POST', team)
        }
        
        const { data, status, message } = response

        if(status === 'success'){
          setRegsitered(!registered);
          setOpen(!open);
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
            <Stack spacing={3}>
            <Typography variant="h4">{sport.name}</Typography>
            <p>Fact: There are over 318 billion different possible positions after four moves each.</p>
            {
              hasTeamSlot?(
                <Button variant="contained" sx={{width: 150,alignSelf:"center"}} onClick={()=>handleRegister()}>{registered? "Leave":"Register"}</Button>
              ):(
                <NoTeam />
              )
            }
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                <Alert onClose={handleClose} severity={registered?"success":"error"} sx={{ width: '100%' }}>
                {registered? "Your have successfully registered.Yay!!" :"You left! 🥺"}
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
    )
}

export default SoloRegistration
