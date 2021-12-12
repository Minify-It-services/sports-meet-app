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
import { LinearProgress } from '@mui/material';
import RegisterUp from '../components/RegisterUp';

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
  const [loading, setLoading] = useState(false)
  const [soloData, setSoloData] = useState({
    registered: false,
    teamId: '',
    hasTeamSlot: true,
    displayMessage: '',
  })
    const [open, setOpen] = React.useState(false);
    const [isRegisterTimeUp, setIsRegisterTimeUp] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      const checkForAvailability = async () => {
        setLoading(true);
        const { data } = await jsendRes.destructFromApi(
          `/teams/check?sport=${sportName}&sportType=single&year=${player.year}&faculty=${player.faculty}&playerId=${player.id}`, 
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
        setLoading(false)
      }

      useEffect(() => {
        getSport(sportName, jsendRes).then(res => {
          setSport(res.sport)
          setIsRegisterTimeUp(res.isRegisterTimeUp)
        })
        checkForAvailability();
      // eslint-disable-next-line
      }, [soloData.registered])

      const handleRegister = async () => {

        setLoading(true)
        let response;

        if(soloData.registered){
          response = await jsendRes.destructFromApi(`/teams/leave/${soloData.teamId}`, 'DELETE')
        }else{
          const team = {
            name: player.name,
            year: player.year,
            semester: player.semester,
            faculty: player.faculty,
            sport: {
              name: sport.name,
              gameType: sport.type,
            },
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
          setLoading(false);
        }else{
          console.log(data, message);
        }
      }
    return (
        <Layout title="Single Register" isSecondPage>
            <Container sx={{marginTop:5}}>
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
                    soloData.hasTeamSlot?(
                      <>
                        {
                          !isRegisterTimeUp&&<Button variant="contained" sx={{width: 150,alignSelf:"center"}} onClick={()=>handleRegister()}>{soloData.registered? "Leave":"Register"}</Button>
                        }
                      </>
                    ):(
                      <NoTeam />
                    )
                  }
                </>
              )
            }
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                <Alert onClose={handleClose} severity={soloData.registered?"success":"error"} sx={{ width: '100%' }}>
                {soloData.displayMessage}
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
    )
}

export default SoloRegistration
