import React from 'react';
import { useState, useEffect } from 'react';

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
import Cookies from 'universal-cookie';
import jsendResDestructor from '../../../utils/api/jsendDestructor'

// components
import AddSport from './AddSport';
import DrawerBar from '../../../components/DrawerBar';

const Sport = () => {
    const cookies = new Cookies();
    const token = cookies.get('sports_app_token');
    const jsendRes = new jsendResDestructor({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
    const [action, setaction] = useState(false);
    const [toEdit, settoEdit] = useState({});
    const [sports, setSports] = useState([])

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
    const fetchSports = async ()=>{
        const response = await jsendRes.destructFromApi('/sports','GET')
        if(response.status === 'success'){
            setSports(response.data)
        }
        else{
            console.log(response.message);
        }
    }
    const deleteSport = async (id) => {
        if(window.confirm('Are you sure you want to delete the sport?')){
            const response = await jsendRes.destructFromApi(`/sports/${id}`, 'DELETE')
            if(response.status === 'success')
                window.location.reload()
            else
                console.log(response);
        }
    }
    useEffect(() => {
        fetchSports()
    // eslint-disable-next-line
     }, [])
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
                                <TableCell align="center">Coordinators</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sports?.map((sport,index) => (
                                <TableRow  key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" align="center">{index+1}</TableCell>
                                    <TableCell align="center" sx={{textTransform:'capitalize'}}>{sport.name}</TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                            <p sx={{textTransform:'capitalize'}}>{sport.coordinators.join(', ')}</p>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                        <Button key="one" variant="outlined" color="primary" onClick={()=>editData(sport)}>Edit</Button>
                                        <Button key="two" variant="outlined" color="error" onClick={()=>deleteSport(sport.id)}>Delete</Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : <AddSport row={toEdit} jsendRes={jsendRes} changeAction={setaction}></AddSport>
                }
            </Box>
        </Box>
    )
}

export default Sport
