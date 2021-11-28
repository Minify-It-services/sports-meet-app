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

import AddTeam from './AddTeam';

// components
import DrawerBar from '../../../components/DrawerBar';

// data
const rows = [
    {
        name: "Software Team A",
        year: "2018",
        semester: "5th",
        faculty: "Software",
        memberIs:["619a241e106c9015687a1d71"],
        coach:"619a22bc0498ca60f4153ea8",
        manager: "619a22bc0498ca60f4153ea8",
        captain: "619a22bc0498ca60f4153ea8",
        sportId:"6198e9e4cd4bc645a092f230"
    },
    {
        name: "Computer Team A",
        year: "2018",
        semester: "5th",
        faculty: "Software",
        memberIds:["619a241e106c9015687a1d71"],
        coach: "619a22bc0498ca60f4153ea8",
        manager: "619a22bc0498ca60f4153ea8",
        captain: "619a22bc0498ca60f4153ea8",
        sportId:"6198e9e4cd4bc645a092f230"
    }
];

const Teams = () => {
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
            <DrawerBar pageName={'Team'} pageId ={3} />
            <Box sx={{flexGrow:1, pt:12.5, px:{xs:2,sm:3,md:5}}}>
                <Box sx={{display:'flex', justifyContent:action?'flex-end':'flex-start'}}>
                    {action?<Button variant="contained" color="primary" onClick={()=>{setaction(!action); if(!isObjEmpty(toEdit)){
                        settoEdit({})
                    }}}>Add Teams</Button>:<Button onClick={()=>setaction(!action)}> <ArrowBackIosIcon /></Button>}
                </Box>
                {action? <TableContainer component={Paper} sx={{mt:2}}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="center">Team Name</TableCell>
                                <TableCell align="center">Year</TableCell>
                                <TableCell align="center">Faculty</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row,index) => (
                                <TableRow  key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" align="center">{row.sportId}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.year}</TableCell>
                                    <TableCell align="center">{row.faculty}</TableCell>
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
                : <AddTeam row={toEdit} changeAction={setaction}></AddTeam>
                // : <AddTeam row={toEdit}></AddTeam>

                }
            </Box>
        </Box>
    )
}

export default Teams
