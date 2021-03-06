import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import { Typography } from '@mui/material';

// components
import Cookies from 'universal-cookie';
import jsendDestructor from '../../../utils/api/jsendDestructor';
import DrawerBar from '../../../components/DrawerBar';
import { DesktopTimePicker } from '@mui/lab';

const Matches = () => {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get("sports_app_token");
    const jsendRes = new jsendDestructor({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    });
    const { type } = useParams()
    const [sports, setSports] = useState([]);
    const [sport, setSport] = useState(null);
    const [teams, setTeams] = useState([]);
    const [matches, setMatches] = useState([]);
    const [teamData, setTeamData] = useState({
        team1: null,
        team2: null,
        date: new Date(),
        time: new Date(),
        score1: 0,
        score2: 0,
        cards: "",
        scores: "",
    })
    const [action, setaction] = useState(false);
    const [toEdit, settoEdit] = useState({});
    const editData=(row)=>{
        setaction(!action);
        settoEdit(row);
    }
    const [sportName, setSportName] = useState('all');
    const [shownMatches, setShownMatches] = useState([])
    const isObjEmpty=(obj)=>{
        if (obj && Object.keys(obj).length === 0
        && Object.getPrototypeOf(obj) === Object.prototype) {
            return true;
        }
        else return false;
    }
   
    const getSports = async () => {
        const { data, status, message } = await jsendRes.destructFromApi("/sports", "GET");
        if (status === "success") {
            setSports(data);
        } else {
            console.log(data, message);
        }
    };
    const getMatches = async () => {
        const { data, status, message } = await jsendRes.destructFromApi('/matches', 'GET')
        
        if(status === "success"){
            setMatches(data)
            setShownMatches(matches)
        }
        else
            console.log(data, message)
    }
    const fetchTeams = async () => {
        let response = {}

        if(toEdit.sport)
            response = await jsendRes.destructFromApi(`/teams?sport=${toEdit.sport.name}&sportType=${toEdit.sport.gameType}`, 'GET')
        else
            response = await jsendRes.destructFromApi(`/teams?sport=${sport.name}&sportType=${sport.type}`, 'GET')

        if(response.status === 'success')
            setTeams(response.data)
        else
            console.log(response);
    }
    useEffect(() => {
        getMatches();
        getSports();
        if(toEdit.sport){
            const { hr, min } = getOriginalTimeFormat(toEdit?.time)
            setTeamData({
                date: toEdit?.date,
                team1: toEdit?.team1,
                team2: toEdit?.team2,
                time: new Date(2021, 12, 10, hr, min, 0),
                score1: toEdit?.score.team1Score,
                score2: toEdit?.score.team2Score,
                cards: toEdit?.cards.join('--'),
                scores: toEdit?.scores.join('--'),
            })
            setSport(toEdit.sport)
        }
    // eslint-disable-next-line
    }, [toEdit]);
    useEffect(() => {
        if(sport && sport?.name !== '')
            fetchTeams();

    // eslint-disable-next-line
    }, [sports, sport])

    const getFormatedTime = (time) => {
        let hr = time.getHours();
        let min = time.getMinutes();
        let ap = 'AM'

        if(hr === 12){
            ap = 'PM'
        }
        if(hr > 12){
            hr -= 12
            if(hr < 10)
                hr = `0${hr}`

            ap = 'PM'
        }
        if(min < 10){
            min = `0${min}`
        }

        return `${hr} : ${min} ${ap}`
    }

    const getOriginalTimeFormat = (time) => {
        let hr = time.substr(0,2)
        let min
        if(hr >= 10)
            min = time.substr(5,2)
        else
            min = time.substr(4,2)

        let ap = time.substr(7,2)

        if(ap === 'PM'){
            hr = parseInt(hr)+12
        }
        min = parseInt(min);
        return { hr, min }
    }   

    const handleChange = async (e) => {
        setSportName(e.target.value)
        if(e.target.value==='all')
            setShownMatches(matches)
        else
            setShownMatches(matches.filter(match => match.sport.name===e.target.value))
    }

    const handleRegister = async () => {
        let matchToSend = {
            date: teamData.date,
            team1: teamData.team1,
            team2: teamData.team2,
            time: getFormatedTime(teamData.time),
            sport: toEdit.sport?{
                name: toEdit.sport.name,
                gameType: toEdit.sport.gameType,
            }: {
                name: sport.name,
                gameType: sport.type,
            }
        }

        let response = {}
        if(toEdit.sport){
            if(type==='res'){
                matchToSend = {
                    ...matchToSend,
                    score: {
                        team1Score: teamData.score1,
                        team2Score: teamData.score2,
                    },
                    status: 'completed',
                }
                if(teamData.scores!==''){
                    matchToSend = {
                        ...matchToSend,
                        scores: teamData.scores.split('--'),
                    }
                }else{
                    matchToSend = {
                        ...matchToSend,
                        scores: [],
                    }
                }
                if(teamData.cards!==''){
                    matchToSend = {
                        ...matchToSend,
                        cards: teamData.cards.split('--'),
                    }
                }else{
                    matchToSend = {
                        ...matchToSend,
                        cards: [],
                    }
                }
            }
            response = await jsendRes.destructFromApi(`/matches/${toEdit.id}`, 'PATCH', matchToSend)
        }else{
            response = await jsendRes.destructFromApi('/matches', 'POST', matchToSend)
        }

        if(response.status === 'success'){
            window.location.reload()
        }else{
            console.log(response);
        }
    }

    const deleteMatch = async (id) => {
        if(window.confirm('Are you sure you want to delete the match?')){
            const response = await jsendRes.destructFromApi(`/matches/${id}`, 'DELETE')
            if(response.status === 'success')
                window.location.reload()
            else
                console.log(response);
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <DrawerBar pageName={'Fixture'} pageId ={4} />
            <Box sx={{flexGrow:1, pt:12.5, px:{xs:2,sm:3,md:5}}}>
                <Box sx={{display:'flex', justifyContent:'justify-content'}}>
                    <Button onClick={action?()=>setaction(!action):()=>navigate(-1)}> <ArrowBackIosIcon /></Button>
                    {
                        type==='mat'&&(
                            <Button variant="contained" color="primary" onClick={()=>{setaction(!action); if(!isObjEmpty(toEdit)){
                                settoEdit({})
                            }}}>Add MatchFixture</Button>
                        )
                    }
                    <FormControl sx={{ width: '200px', marginRight: '1em' }}>
                        <InputLabel id="demo-simple-select-label">Sport</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sportName}
                            label="Sport"
                            onChange={e => handleChange(e)}
                        >
                            <MenuItem value="all">All</MenuItem>
                            {
                                sports.map(sport => (<MenuItem value={sport.name} key={sport.id}>{sport.name}</MenuItem>))
                            }
                        </Select>
                    </FormControl>
                </Box>
                {!action? <TableContainer component={Paper} sx={{mt:2}}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Match</TableCell>
                                <TableCell align="center">Sport</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Results</TableCell>
                                {type==='mat'&&<TableCell align="center">Time</TableCell>}
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shownMatches?.map((match,index) => (
                                <TableRow  key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center">{match?.team1.name} vs {match?.team2.name}</TableCell>
                                    <TableCell align="center">{match?.sport.name}</TableCell>
                                    <TableCell align="center">{match?.date.substr(0, 10)}</TableCell>
                                    <TableCell align="center">{match?.score.team1Score||0} : {match?.score.team2Score||0}</TableCell>
                                    {type==='mat'&&<TableCell align="center">{match?.time}</TableCell>}
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                        <Button key="one" variant="outlined" color="primary" onClick={()=>editData(match)}>
                                            {
                                                (type==='res'&&match?.status==='uncompleted')?'Add Result':'Edit'
                                            }
                                        </Button>
                                        {
                                            type==='mat'&&<Button key="two" variant="outlined" color="error" onClick={()=>deleteMatch(match.id)}>Delete</Button>
                                        }
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : <div row={toEdit}>
                    <Stack spacing={4} my={4}>
                        <Typography>Select Sport</Typography>
                        <Box display="grid" gridTemplateColumns="1fr">
                            <Autocomplete
                                disableClearable={true}
                                disablePortal
                                getOptionLabel={option => option.name || ''}
                                value={sport}
                                options={sports}
                                onChange={(e, value)=>setSport({ name: value.name, type: value.type })}
                                renderInput={(params) => <TextField {...params} label="Sport" />}
                            />
                        </Box>
                        <Typography>Select two Teams </Typography>
                        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={5}>
                            <Autocomplete
                                disablePortal
                                options={teams}
                                isOptionEqualToValue={(option, value) => option.label === value.name}
                                getOptionLabel={option => option.name || ''}
                                value={teamData.team1}
                                onChange={(e, value) => setTeamData(prevState => ({
                                    ...prevState,
                                    team1: { id: value.id, name: value.name }
                                }))}
                                renderInput={(params) => <TextField {...params} label="Team1" />}
                            />
                            <Autocomplete
                                disablePortal
                                options={teams}
                                isOptionEqualToValue={(option, value) => option.label === value.name}
                                getOptionLabel={option => option.name || ''}
                                value={teamData.team2}
                                onChange={(e, value) => setTeamData(prevState => ({
                                    ...prevState,
                                    team2: { id: value.id, name: value.name }
                                }))}
                                renderInput={(params) => <TextField {...params} label="Team2" />}
                            />
                        </Box>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Date"
                                inputFormat="MM/dd/yyyy"
                                value={teamData.date}
                                onChange={(value) => setTeamData(prevState => ({ ...prevState, date: value }))}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DesktopTimePicker
                                label="Time"
                                value={teamData.time}
                                onChange={(value) => setTeamData(prevState => ({ ...prevState, time: value }))}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        {
                            type==='res'&&(
                                <>
                                     <Box display='grid' gridTemplateColumns="1fr 1fr" gap={5}>
                                        <TextField id="standard-basic" label="Team1 Score" variant="standard" type="number"
                                            value={teamData.score1}
                                            onChange={(e) => setTeamData(prevState => ({ ...prevState, score1: e.target.value }))}
                                        />
                                        <TextField id="standard-basic" label="Team2 Score" variant="standard" type="number" 
                                            value={teamData.score2}
                                            onChange={(e) => setTeamData(prevState => ({ ...prevState, score2: e.target.value }))}
                                        />
                                    </Box>
                                    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={5}>
                                        <TextareaAutosize
                                            aria-label="empty textarea"
                                            placeholder="Card Description"
                                            style={{ width: '100%',minHeight:'200px' }}
                                            value={teamData.cards} 
                                            onChange={(e)=> setTeamData(prevState => ({ ...prevState, cards: e.target.value }))}
                                        />
                                        <TextareaAutosize
                                            aria-label="empty textarea"
                                            placeholder="Score Description"
                                            style={{ width: '100%',minHeight:'200px' }}
                                            value={teamData.scores} 
                                            onChange={(e)=> setTeamData(prevState => ({ ...prevState, scores: e.target.value }))}
                                        />
                                    </Box>
                                </>
                            )
                        }
                        <Button variant="outlined" color="success" onClick={handleRegister}>Save</Button>
                    </Stack>
                </div>

                }
            </Box>
        </Box>
    )
}

export default Matches