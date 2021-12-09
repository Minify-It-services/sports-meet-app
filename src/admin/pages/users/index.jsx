import React, { useState } from 'react'
import Cookies from 'universal-cookie';

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';

import DrawerBar from '../../../components/DrawerBar';
import jsendDestructor from '../../../utils/api/jsendDestructor';

const UserDetail = () => {

    const cookies = new Cookies();
    
    const token = cookies.get('sports_app_token');
    const jsendRes = new jsendDestructor({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })

    const [checkUser, setCheckUser] = useState('')
    const [foundUsers, setFoundUsers] = useState([])

    const handleSearch = async () => {
        const { data, status, message } = await jsendRes.destructFromApi(`users/searchByName/${checkUser}`, 'GET')

        if(status === 'success'){
            setFoundUsers(data)
        }else{
            console.log(data, message);
        }
    }

    return (
        <Box sx={{ display: 'flex', marginBottom:'50px' }}>
            <DrawerBar pageName={'User Details'} pageId={6} />
            <Box sx={{ flexGrow: 1, pt: 12.5, px: { xs: 2, sm: 3, md: 5 } }}>
                <Stack direction='row' spacing={2} sx={{ width: '100%' }}>
                    <TextField 
                        variant="outlined"
                        placeholder="Search for user"
                        value={checkUser}
                        onChange={e=>setCheckUser(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="info"
                        onClick={handleSearch}
                    >Search User</Button>
                </Stack>
                <TableContainer component={Paper} sx={{ marginTop:'50px'}}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{height:'100px'}}>
                                <TableCell align="left" sx={{fontSize:'2rem', fontWeight:'600'}}>Found User for '{checkUser}'</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                foundUsers.map((user, i) => (
                                    <TableRow key={i}>
                                        <TableCell align="left">
                                            {user.name}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {user.year}
                                        </TableCell>
                                        <TableCell align="right">{user.contactNumber}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default UserDetail
