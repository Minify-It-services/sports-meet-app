import React from 'react';

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

// components
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
        id:'1',
        name:'football',
        captain:'Utsab Gurung',
        vice: 'Yogesh Thapa'
    },
];

// buttons:
const buttons = [
  <Button key="one" variant="outlined" color="primary">Edit</Button>,
  <Button key="two" variant="outlined" color="error">Delete</Button>,
];


const Sports = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <DrawerBar pageName={'Sports'} pageId ={2} />
            <Box sx={{flexGrow:1, pt:12.5, px:5}}>
                <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                    <Button variant="contained" color="primary">Add Sports</Button>
                </Box>
                <TableContainer component={Paper} sx={{mt:2}}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Coordinator</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow  key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" align="center">1</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                            <p>{row.captain}</p>
                                            <p>{row.vice}</p>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                            {buttons}
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default Sports
