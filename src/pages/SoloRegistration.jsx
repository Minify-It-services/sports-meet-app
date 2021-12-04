import * as React from 'react'
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
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
import { getSport } from '../utils/helpers/getSport';
import Layout from '../layout/Layout';

//TODO: need fixing
const SoloRegistration = ()=> {

  const { sportName } = useParams()
  const cookies = new Cookies()

  const token = cookies.get('sports_app_token')
  const player = JSON.parse(localStorage.getItem('player'))

  const jsendRes = new jsendDestructor({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  })

  const [sport, setSport] = useState({})
  const [soloData, setSoloData] = useState({
    registered: false,
    teamId: '',
    hasTeamSlot: true,
    displayMessage: '',
  })
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      const checkForAvailability = async () => {
        const { data } = await jsendRes.destructFromApi(
          `/teams/check?sport=${sportName}&year=${player.year}&faculty=${player.faculty}&playerId=${player.id}`, 
          'GET'
        )
        if(data.message === 'Team full'){
          setSoloData(prevState => ({
            ...prevState,
            hasTeamSlot: false,
          }))
        }
        if(data.message === 'Already in a team'){
          setSoloData(prevState => ({
            ...prevState,
            teamId: data.teamId,
            registered: true,
          }))
        }
      }

      useEffect(() => {
        getSport(sportName, jsendRes).then(res => setSport(res))
        checkForAvailability();
      // eslint-disable-next-line
      }, [soloData.registered])

      const handleRegister = async () => {

        let response;

        if(soloData.registered){
          response = await jsendRes.destructFromApi(`/teams/leave/${soloData.teamId}`, 'DELETE')
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
          if(soloData.registered){
            setSoloData(prevState => ({
              ...prevState,
              registered: false,
              displayMessage: `Successfully left from ${sportName}`
            }))
          }else{
            setSoloData(prevState => ({
              ...prevState,
              registered: true,
              displayMessage: `Successfully registered to ${sportName}`
            }))
          }
          setOpen(!open);
        }else{
          console.log(data, message);
        }
      }
    return (
        <Layout title="Single Register" isSecondPage>
          <div className="banner" style={{minHeight:"30vh",backgroundImage: "url(https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350)",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}>
            </div>
            <Container sx={{marginTop:5}}>
            <Stack spacing={3}>
            <Typography variant="h4">{sportName}</Typography>
            <p>
              Coordinator: {sport?.coordinator} <br />
              Vice-Coordinator: {sport?.viceCoordinator}
            </p>
            {
              soloData.hasTeamSlot?(
                <Button variant="contained" sx={{width: 150,alignSelf:"center"}} onClick={()=>handleRegister()}>{soloData.registered? "Leave":"Register"}</Button>
              ):(
                <NoTeam />
              )
            }
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                <Alert onClose={handleClose} severity={soloData.registered?"success":"error"} sx={{ width: '100%' }}>
                {soloData.displayMessage}
                </Alert>
            </Snackbar>
            <Typography variant="h4">Rules</Typography>
            <ul>
              {
                sport?.rules?.map(rule=>(<li key={rule}>{rule}</li>))
              }
            </ul>
            </Stack>
        </Container>
      </Layout>
    )
}

export default SoloRegistration
