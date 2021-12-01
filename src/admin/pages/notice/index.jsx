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
import Cookies from 'universal-cookie'

import AddNotice from './AddNotice';
import jsendDestructor from '../../../utils/api/jsendDestructor'

// components
import DrawerBar from '../../../components/DrawerBar';

// data
const rows = [
    {
        title: "Delay in Match 5",
        description: "Hi ",
        id: "215fsd564431132df",
    },
    {
        title: "Software Engineering",
        description: "Hi ",
        id: "av215fsd564431132df",
    }
];

const Notice = () => {
    const cookies = new Cookies()
    const token = cookies.get('sports_app_token')
    const jsendRes = new jsendDestructor({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
    const [action, setaction] = useState(false);
    const [toEdit, settoEdit] = useState({});
    const [notices, setNotices] = useState([]); 
    const editData=(row)=>{
        setaction(!action);
        settoEdit(row);
    }
    const fetchNotices = async ()=>{
        const response = await jsendRes.destructFromApi('/notices','GET')
        if(response.status === 'success'){
            setNotices(response.data)
        }
        else{
            console.log(response.message);
        }
    }
    useEffect(() => {
       fetchNotices()
    }, [])

    const handleDelete =async (id)=> {
        if(window.confirm('Are you sure you want to delete?')){
            const response = await jsendRes.destructFromApi(`/notices/${id}`,'DELETE')
            if(response){
                console.log(response);
            }
            else{
                window.location.reload()
            }
        }
    }
    
    return (
        <Box sx={{ display: 'flex' }}>
            <DrawerBar pageName={'Notice'} pageId ={5} />
            <Box sx={{flexGrow:1, pt:12.5, px:{xs:2,sm:3,md:5}}}>
                <Box sx={{display:'flex', justifyContent:!action?'flex-end':'flex-start'}}>
                    {!action?<Button variant="contained" color="primary" onClick={()=>{setaction(!action);}}>Add Notice</Button>:<Button onClick={()=>setaction(!action)}> <ArrowBackIosIcon /></Button>}
                </Box>
                {!action? <TableContainer component={Paper} sx={{mt:2}}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">S.N.</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {notices?.map((notice,index) => (
                                <TableRow  key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" align="center">{index+1}</TableCell>
                                    <TableCell align="center">{notice.title}</TableCell>
                                    <TableCell align="center">{notice.description}</TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                        <Button key="one" variant="outlined" color="primary" onClick={()=>editData(notice)}>Edit</Button>
                                        <Button key="two" variant="outlined" color="error" onClick={()=>handleDelete(notice.id)}>Delete</Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : <AddNotice row={toEdit} token={token} jsendRes={jsendRes} changeAction={setaction}></AddNotice>
                }
            </Box>
        </Box>
    )
}

export default Notice
