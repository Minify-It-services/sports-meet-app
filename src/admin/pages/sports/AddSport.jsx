import React from 'react';
import { useState,useEffect } from 'react';
import { cleanup } from '@testing-library/react';

import TextField  from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';

// Currently same values and same setstate are used to all select option in textfield 

function AddSport(props) {
    const [sportData, setSportData] = useState({
        name: '',
        coordinator: '',
        viceCoordinator: '',
        referees: [],
        classLimit: -1,
        limit: -1,
        playerLimit: -1,
        extraLimit: -1,
        imageUrl: '',
        type: '',
        rules: '',
    })
    const [members, setMembers] = useState([])
    
    const [forEdit, setforEdit] = useState(false);
    const [editedSport] = useState({});
    let editData=props.row;
    const isObjEmpty=(obj)=>{
        if (obj && Object.keys(obj).length === 0
        && Object.getPrototypeOf(obj) === Object.prototype) {
            return true;
        }
        else return false;
    }
    const getYear = (y)=>{
        switch(y){
            case '2017': return '4th Year'
            case '2018': return '3rd Year'
            case '2019': return '2nd Year'
            case '2020': return '1st Year'
            default: return
        }
    }
    const getPlayers = async () => {
        const response = await props.jsendRes.destructFromApi('/users', 'GET')
        if(response.status === 'success'){
          setMembers(response.data)
        }else{
          console.log(response.data, response.message);
        }
      }
    useEffect(()=>{
        getPlayers();
    // eslint-disable-next-line
    },[])
    useEffect(() => {
        console.log(props.row)
        if (isObjEmpty(editData)) {
            setforEdit(false);
        }
        else {
            setforEdit(true);
            setSportData(props.row);
        };
        return ()=>{
            cleanup();
        }
    }, [editData,props.row]);

    const handleSave = async ()=>{
        const sportToCreate = {
            ...sportData,
            rules: sportData.rules.split('|')
        }
        console.log(sportToCreate)
        let response = {}
        if(forEdit)
            response = await props.jsendRes.destructFromApi(`/sports/${editedSport.id}`,'PATCH',sportToCreate)
        else
            response = await props.jsendRes.destructFromApi('/sports','POST',sportToCreate)
        if(response.status === 'success'){
            window.location.reload()
        }else{
            console.log(response);
        }
    }

    return (
        <Stack spacing={{ xs: 1, sm: 2, md: 3 }} sx={{my:2}}>
            <TextField id="standard-basic" label="Sport Name" variant="standard" type="text" 
            onChange={e=> setSportData(prevState => ({
                ...prevState, 
                name : e.target.value
            }))} 
            value={sportData.name} />
            <TextField id="standard-basic" label="Coordinator" variant="standard" type="text" 
            onChange={e=> setSportData(prevState => ({
                ...prevState, 
                coordinator : e.target.value
            }))}
            value={sportData.coordinator} />
            <TextField id="standard-basic" label="Vice-Coordinator" variant="standard" type="text" 
            onChange={e=> setSportData(prevState => ({
                ...prevState, 
                viceCoordinator : e.target.value
            }))} 
            value={sportData.viceCoordinator} />
            <Autocomplete
                multiple
                id="tags-standard"
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.label === value.name}
                autoComplete={false}
                // disablePortal
                options={members}
                // onChange={(e) =>console.log('set selected value')}
                onChange={(event, value) => setSportData(prevState => ({
                    ...prevState, 
                    referees : value.map(referee=>({
                        name: referee.name,
                        year: getYear(referee.year)
                    }))
                }))}
                renderInput={(params) => (
                <TextField {...params} label="Referee" variant="standard" />
                )}
            />
            <Box display='grid' gridTemplateColumns="1fr 1fr"  gap={5}>
                <TextField label="Class Limit" variant="standard" type="number"
                onChange={e=> setSportData(prevState => ({
                    ...prevState, 
                    classLimit : e.target.value
                }))}
                value={sportData.classLimit}
                />
                <TextField label="Total Limit" variant="standard" type="number"
                onChange={e=> setSportData(prevState => ({
                    ...prevState, 
                    limit : e.target.value
                }))}
                value={sportData.limit}
                />
                <TextField label="Player Limit" variant="standard" type="number"
                onChange={e=> setSportData(prevState => ({
                    ...prevState, 
                    playerLimit : e.target.value
                }))}
                value={sportData.playerLimit}
                />
                <TextField label="Extra Limit" variant="standard" type="number"
                onChange={e=> setSportData(prevState => ({
                    ...prevState, 
                    extraLimit : e.target.value
                }))}
                value={sportData.extraLimit}
                />
                <TextField label="Image URL" variant="standard" type="text"
                onChange={e=> setSportData(prevState => ({
                    ...prevState, 
                    imageUrl : e.target.value
                }))}
                value={sportData.imageUrl}
                />
                <TextField
                select
                label="Sports Type"
                onChange={e=> setSportData(prevState => ({
                    ...prevState, 
                    type : e.target.value
                }))}
                value={sportData.type}
                >
                    <MenuItem  value="single">Single</MenuItem>
                    <MenuItem  value="duo">Double</MenuItem>
                    <MenuItem  value="team">Team</MenuItem>
                </TextField>
            </Box>
            <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Rules"
            style={{ width: '100%',minHeight:'250px' }}
            onChange={e=> setSportData(prevState => ({
                ...prevState, 
                rules : e.target.value
            }))}
            value={sportData.rules}
            />
            <Button variant="outlined" color="success" onClick={handleSave}>Save</Button>
        </Stack>
    )
}

export default AddSport
