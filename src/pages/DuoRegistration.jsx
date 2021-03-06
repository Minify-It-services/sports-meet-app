import * as React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Cookies from 'universal-cookie';

import Typography from '@mui/material/Typography';
import  Button  from '@mui/material/Button';
import Container  from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Alert } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

// components:
import jsendDestructor from '../utils/api/jsendDestructor'
import NoTeam from '../components/NoTeam'
import { getSport } from '../utils/helpers/getSport';
import Layout from '../layout/Layout';
import RegisterUp from '../components/RegisterUp';

//TODO: Fix FONT SIZING
const DuoRegistration = () => {

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
    const [duoData, setDuoData] = useState({
      registered: false,
      teamId: '',
      hasTeamSlot: true,
      partner: {},
      displayMessage: '',
      hasError: false,
    })
    const [members, setMembers] = useState([])
    const [isRegisterTimeUp, setIsRegisterTimeUp] = useState(false)

    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

      const getPlayers = async () => {
        const { data, status, message } = await jsendRes.destructFromApi(`/users?year=${player.year}&userId=${player.id}&faculty=${player.faculty}&sport=${sportName}&sportType=duo&gender=${player.gender}`, 'GET')
        if(status === 'success'){
          setMembers(data)
        }else{
          console.log(data, message);
        }
        setLoading(false);
      }

      const checkForAvailability = async () => {
        setLoading(true);
        const { data } = await jsendRes.destructFromApi(
          `/teams/check?sport=${sportName}&sportType=duo&year=${player.year}&faculty=${player.faculty}&playerId=${player.id}`, 
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
        getSport(sportName, jsendRes).then(res => {
          setSport(res.sport)
          setIsRegisterTimeUp(res.isRegisterTimeUp)
        })
        checkForAvailability();
        // if(!duoData.partner.name){
          getPlayers();
        // }
      // eslint-disable-next-line
      }, [duoData.registered])
      
      const handleRegister = async () => {
        if(!duoData.partner.name){
          setDuoData(prevState => ({
            ...prevState,
            hasError: true,
            displayMessage: 'Please Select a Partner'
          }))
          setOpen(!open)
        }else{
          let response;

          if(duoData.registered){
            response = await jsendRes.destructFromApi(`/teams/leave/${duoData.teamId}`, 'DELETE')
          }else{
            const team = {
              name: `${player.name}, ${duoData.partner.name}`,
              year: player.year,
              semester: player.semester,
              faculty: player.faculty,
              sport: {
                name: sportName,
                gameType: sport.type,
              },
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
                  partner: {},
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
      }
    return (
        <Layout title="Double Register" isSecondPage>
            <Container sx={{marginTop:5}}>
            <Stack spacing={{xs:2,md:4}}>
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
                                disabled={isRegisterTimeUp}
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
                      {
                        !isRegisterTimeUp&&<Button variant="contained" sx={{width: 150,alignSelf:"center"}} onClick={handleRegister}>{duoData.registered? "Leave":"Register"}</Button>
                      }
                    </>
                    ):<NoTeam/>
                  }
                </>
              )
            }
            <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                <Alert onClose={handleClose} severity={!duoData.hasError?"success":"error"} sx={{ width: '100%' }}>
                {duoData.displayMessage}
                </Alert>
            </Snackbar>
            <Typography variant="h6">Rules</Typography>
            <ul style={{margin:"0 1rem"}}>
              {
                sport?.rules?.map(rule=>(<li key={rule}>{rule}</li>))
              }
            </ul>
            </Stack>
        </Container>
      </Layout>
    )
}

export default DuoRegistration
