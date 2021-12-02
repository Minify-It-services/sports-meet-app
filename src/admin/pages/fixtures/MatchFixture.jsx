import React from 'react';
import { useState } from 'react';

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

import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextareaAutosize from '@mui/material/TextareaAutosize';


import DrawerBar from '../../../components/DrawerBar';
import { Typography } from '@mui/material';
const rows = [
    {
        date:"5-12-2021",
        team1:{
            id:"id123",
            name:"Software5thSem"
        },
        team2:{
            id:"id1234",
            name:"Software1stSem"
        },
        score:{
            team1: 0, // default
            team2: 0, // default
         },
         resultId: 'mongoDB_id', // default --> null,
         status: "upcoming", // default
         sport:"volleyball"
    },
    {
        date:"5-12-2021",
        team1:{
            id:"id123",
            name:"Computer5thSem"
        },
        team2:{
            id:"id1234",
            name:"Software1stSem"
        },
        score:{
            team1: 0, // default
            team2: 0, // default
         },
         resultId: 'mongoDB_id', // default --> null,
         status: "upcoming", // default
         sport:"volleyball"
    },
];
const teams=[{
    name: "Software 1th sem Team A",
    "year": "2018",
    "semester": "5th",
    "faculty": "Software",
    "memberIds":["619a241e106c9015687a1d71"],
    "coach": "619a22bc0498ca60f4153ea8",
    "manager": "619a22bc0498ca60f4153ea8",
    "captain": "619a22bc0498ca60f4153ea8",
    "sportId":"6198e9e4cd4bc645a092f230"
},{
    name: "Software 5thsem Team B",
    "year": "2018",
    "semester": "5th",
    "faculty": "Software",
    "memberIds":["619a241e106c9015687a1d71"],
    "coach": "619a22bc0498ca60f4153ea8",
    "manager": "619a22bc0498ca60f4153ea8",
    "captain": "619a22bc0498ca60f4153ea8",
    "sportId":"6198e9e4cd4bc645a092f230"
},
{
    name: "Software 5th sem Team A",
    "year": "2018",
    "semester": "5th",
    "faculty": "Software",
    "memberIds":["619a241e106c9015687a1d71"],
    "coach": "619a22bc0498ca60f4153ea8",
    "manager": "619a22bc0498ca60f4153ea8",
    "captain": "619a22bc0498ca60f4153ea8",
    "sportId":"6198e9e4cd4bc645a092f230"
},
]
const MatchFixture = () => {
    const [date, setdate] = useState(new Date());
    const [action, setaction] = useState(false);
    const [toEdit, settoEdit] = useState({});
    const editData=(row)=>{
        setaction(!action);
        settoEdit(row);
    }
    const isObjEmpty=(obj)=>{
        if (obj && Object.keys(obj).length === 0
        && Object.getPrototypeOf(obj) === Object.prototype) {
          return true;
        }
        else return false;
      }
    return (
        <Box sx={{ display: 'flex' }}>
            <DrawerBar pageName={'Fixture'} pageId ={4} />
            <Box sx={{flexGrow:1, pt:12.5, px:{xs:2,sm:3,md:5}}}>
                <Box sx={{display:'flex', justifyContent:!action?'flex-end':'flex-start'}}>
                    {!action?<Button variant="contained" color="primary" onClick={()=>{setaction(!action); if(!isObjEmpty(toEdit)){
                        settoEdit({})
                    }}}>Add MatchFixture</Button>:<Button onClick={()=>setaction(!action)}> <ArrowBackIosIcon /></Button>}
                </Box>
                {!action? <TableContainer component={Paper} sx={{mt:2}}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Match</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Results</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row,index) => (
                                <TableRow  key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    {/* <TableCell component="th" scope="row" align="center">{row.sportId}</TableCell> */}
                                    <TableCell align="center">{row.team1.name} vs {row.team2.name}</TableCell>
                                    <TableCell align="center">{row.date}</TableCell>
                                    <TableCell align="center">{row.status}</TableCell>
                                    <TableCell align="center">{row.resultId}</TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                        <Button key="one" variant="outlined" color="primary" onClick={()=>editData(row)}>Edit</Button>
                                        <Button key="two" variant="outlined" color="error">Delete</Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                // : <AddTeam row={toEdit} changeAction={setaction}></AddTeam>
                : <div row={toEdit}>
                    <Stack spacing={4} my={4}>
                        <Typography>Select two Teams </Typography>
                        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={5}>
                            <Autocomplete
                            disablePortal
                            options={teams.map(team=>team.name)}
                            renderInput={(params) => <TextField {...params} label="Team1" />}
                            />
                            <Autocomplete
                            disablePortal
                            options={teams.map(team=>team.name)}
                            renderInput={(params) => <TextField {...params} label="Team2" />}
                            />
                        </Box>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                            label="Date"
                            inputFormat="MM/dd/yyyy"
                            value={date}
                            onChange={(e,value)=>setdate(value)}
                            renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <Box display='grid' gridTemplateColumns="1fr 1fr" gap={5}>
                            <TextField id="standard-basic" label="Team1 Score" variant="standard" type="number" />
                            <TextField id="standard-basic" label="Team2 Score" variant="standard" type="number" />
                        </Box>
                        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={5}>
                            <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder="Card Description"
                            style={{ width: '100%',minHeight:'200px' }}
                            // defaultValue={!forEdit?editData.description:""} onChange={(event)=>handleChange(event,'description')}
                            />
                            <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder="Score Description"
                            style={{ width: '100%',minHeight:'200px' }}
                            // defaultValue={!forEdit?editData.description:""} onChange={(event)=>handleChange(event,'description')}
                            />
                        </Box>
                        <Button variant="outlined" color="success" onClick={()=>console.log('save match fixture')}>Save</Button>
                    </Stack>
                </div>

                }
            </Box>
        </Box>
    )
}

export default MatchFixture