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

// components
import AddSport from './AddSport';
import DrawerBar from '../../../components/DrawerBar';

// data
const rows = [
    {
        id:'1',
        name:'football',
        captain:'Utsab Gurung',
        vice: 'Yogesh Thapa'
    },
    {
        id:'2',
        name:'volleyball',
        captain:'Alson Garbuja',
        vice: 'Sunil Paudel'
    },
];

const Sport = () => {
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
            <DrawerBar pageName={'Sport'} pageId ={2} />
            <Box sx={{flexGrow:1, pt:12.5, px:{xs:2,sm:3,md:5}}}>
                <Box sx={{display:'flex', justifyContent:!action?'flex-end':'flex-start'}}>
                    {!action?<Button variant="contained" color="primary" onClick={()=>{setaction(!action); if(!isObjEmpty(toEdit)){
                        settoEdit({})
                    }}}>Add Sport</Button>:<Button onClick={()=>setaction(!action)}> <ArrowBackIosIcon /></Button>}
                </Box>
                {!action? <TableContainer component={Paper} sx={{mt:2, overflow:'scroll'}}>
                    <Table aria-label="simple table" sx={{overflow:'scroll'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Coordinator</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row,index) => (
                                <TableRow  key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" align="center">{row.id}</TableCell>
                                    <TableCell align="center" sx={{textTransform:'capitalize'}}>{row.name}</TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                            <p sx={{textTransform:'capitalize'}}>{row.captain}</p>
                                            <p sx={{textTransform:'capitalize'}}>{row.vice}</p>
                                        </Stack>
                                    </TableCell>
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
                : <AddSport row={toEdit} changeAction={setaction}></AddSport>
                }
            </Box>
        </Box>
    )
}

export default Sport
