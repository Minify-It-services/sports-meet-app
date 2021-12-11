import React from 'react';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Cookies from 'universal-cookie'
import AddTeam from './AddTeam';
import jsendResDestructor from '../../../utils/api/jsendDestructor'

// components
import DrawerBar from '../../../components/DrawerBar';

const Teams = () => {
    const cookies = new Cookies()
    const token = cookies.get('sports_app_token')
    const jsendRes = new jsendResDestructor({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
    const [action, setaction] = useState(false);
    const [toEdit, settoEdit] = useState({});
    const [teams, setTeams] = useState([]);
    const [shownTeams, setShownTeams] = useState([]);
    const [sports, setSports] = useState([]);
    const [sport, setSport] = useState('all');
    
    const isObjEmpty=(obj)=>{
        if (obj && Object.keys(obj).length === 0
        && Object.getPrototypeOf(obj) === Object.prototype) {
          return true;
        }
        else return false;
      }

    const fetchSports = async ()=>{
        const response = await jsendRes.destructFromApi('/sports','GET')
        if(response.status === 'success'){
            setSports(response.data)
        }
        else{
            console.log(response.message);
        }
    }

    const fetchTeams = async ()=>{
        const response = await jsendRes.destructFromApi('/teams','GET')
        if(response.status === 'success'){
            setTeams(response.data)
            setShownTeams(response.data)
        }
        else{
            console.log(response.message);
        }
    }
    useEffect(() => {
       fetchSports()
       fetchTeams()
    // eslint-disable-next-line
    }, [])

    const handleChange = async (e) => {
        setSport(e.target.value)
        if(e.target.value==='all')
            setShownTeams(teams)
        else
            setShownTeams(teams.filter(team => team.sport.name===e.target.value))
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <DrawerBar pageName={'Team'} pageId ={3} />
            <Box sx={{flexGrow:1, pt:12.5, px:{xs:2,sm:3,md:5}}}>
                <Box sx={{display:'flex', justifyContent:!action?'flex-end':'flex-start'}}>
                    {!action?(
                        <>
                            <FormControl sx={{ width: '200px', marginRight: '1em' }}>
                                <InputLabel id="demo-simple-select-label">Sport</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sport}
                                    label="Sport"
                                    onChange={e => handleChange(e)}
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    {
                                        sports.map(sport => (<MenuItem value={sport.name}>{sport.name}</MenuItem>))
                                    }
                                </Select>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={()=>{setaction(!action); if(!isObjEmpty(toEdit)){
                                settoEdit({})
                            }}}>Add Team</Button>
                        </>
                    ):<Button onClick={()=>setaction(!action)}> <ArrowBackIosIcon /></Button>}
                </Box>
                {!action? <TableContainer component={Paper} sx={{mt:2}}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">S.N.</TableCell>
                                <TableCell align="center">Team Name</TableCell>
                                <TableCell align="center">Sport</TableCell>
                                <TableCell align="center">Year</TableCell>
                                <TableCell align="center">Faculty</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shownTeams?.map((team,index) => (
                                <TableRow  key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" align="center">{index+1}</TableCell>
                                    <TableCell align="center">{team.name}</TableCell>
                                    <TableCell align="center">{team.sport.name}</TableCell>
                                    <TableCell align="center">{team.year}</TableCell>
                                    <TableCell align="center">{team.faculty}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : <AddTeam row={toEdit} jsendRes={jsendRes} changeAction={setaction}></AddTeam>
                }
            </Box>
        </Box>
    )
}

export default Teams
