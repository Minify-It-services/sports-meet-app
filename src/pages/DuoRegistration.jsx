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
    const [registered, setRegsitered] = useState(false);
    const [teamId, setTeamId] = useState('')
    const [hasTeamSlot, setHasTeamSlot] = useState(true)
    const [partner, setpartner] = useState({});
    const [members, setMembers] = useState([])
    const [displayMessage, setdisplayMessage] = useState('');
    const [hasError, sethasError] = useState(false);

    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
      const isObjEmpty=(obj)=>{
        if (obj && Object.keys(obj).length === 0
        && Object.getPrototypeOf(obj) === Object.prototype) {
          return true;
        }
        else return false;
      }

      const getPlayers = async () => {
        const { data, status, message } = await jsendRes.destructFromApi(`/users?year=${player.year}&userId=${player.id}`, 'GET')
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
        getPlayers();
        checkForAvailability();
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
        console.log(partner);
        if (!registered && !isObjEmpty(partner)) {
          sethasError(false);
          setdisplayMessage('Successfully registered a Duo Team');
          setRegsitered(true);
          setOpen(!open);
        }
        else if(registered)
        {
          sethasError(true);
          setdisplayMessage('You Left the Team');
          setpartner('');
          setRegsitered(false);
          setOpen(!open);

        }
        else{
          sethasError(true);
          setdisplayMessage('Please Fill the empty fields');
          setOpen(!open);
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
              hasTeamSlot?(
                <>
                {!registered? <Typography variant="subtitle">Select Your Partner</Typography> :
            
                <div><Typography variant="h5">Your Partner</Typography><p>{partner.name}</p></div>
                } 
                {
                  !registered? <Autocomplete
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) => option.label === value.name}
                    autoComplete={false}
                    options={members}
                    onChange={(event, value) => setpartner(value)}
                    renderInput={(params) => <TextField {...params} label="Partner" variant="standard" required={true}/>}
                    /> : <div></div>
                }
                <Button variant="contained" sx={{width: 150,alignSelf:"center"}} onClick={handleRegister}>{registered? "Leave":"Register"}</Button>
              </>
              ):<NoTeam/>
            }
                <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={!hasError?"success":"error"} sx={{ width: '100%' }}>
                    {displayMessage}
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
