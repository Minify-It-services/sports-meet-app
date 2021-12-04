import React from 'react';
import { useState,useEffect,useCallback } from 'react';
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
    
    const [members, setMembers] = useState([])
    // const [currency, setCurrency] = React.useState('EUR');
    const handleChange = (event) => {
        // setCurrency(event.target.value);
    };
    
    const [forEdit, setforEdit] = useState(false);
    const [editedSport, seteditedSport] = useState({});
    let editData=props.row;
    const isObjEmpty=(obj)=>{
        if (obj && Object.keys(obj).length === 0
        && Object.getPrototypeOf(obj) === Object.prototype) {
            return true;
        }
        else return false;
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
        if (isObjEmpty(editData)) {
            setforEdit(false);
        }
        else {
            setforEdit(true);
            seteditedSport(props.row);
        };
        return ()=>{
            cleanup();
        }
    }, [editData,props.row]);

    const handleSave = useCallback(event => {
        props.changeAction(false);
        console.log(editedSport);
    }, [props,editedSport]);

    return (
        <Stack spacing={{ xs: 1, sm: 2, md: 3 }} sx={{my:2}}>
            <TextField id="standard-basic" label="Sport Name" variant="standard" type="text" defaultValue={!forEdit?editData.name:""} />
            <TextField id="standard-basic" label="Coordinator" variant="standard" type="text" defaultValue={!forEdit?editData.captain:""} />
            <TextField id="standard-basic" label="Vice-Coordinator" variant="standard" type="text" defaultValue={!forEdit?editData.vice:""} />
            <Autocomplete
                multiple
                id="tags-standard"
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.label === value.name}
                autoComplete={false}
                // disablePortal
                options={members}
                // onChange={(e) =>console.log('set selected value')}
                onChange={(event, value) => setMembers(value)}
                renderInput={(params) => (
                <TextField {...params} label="Refree" variant="standard" />
                )}
            />
            <Box display='grid' gridTemplateColumns="1fr 1fr"  gap={5}>
                <TextField label="Class Limit" variant="standard" type="number" />
                <TextField label="Total Limit" variant="standard" type="number" />
                <TextField label="Player Limit" variant="standard" type="number" />
                <TextField label="Extra Limit" variant="standard" type="number" />
                <TextField label="Image URL" variant="standard" type="text" />
                <TextField label="Background image URL" variant="standard" type="text" />
            </Box>
            <Box display='grid' gridTemplateColumns="1fr 1fr" gap={5}>
                <TextField
                select
                label="Sports Type"
                onChange={handleChange}
                >
                    <MenuItem  value="single">Single</MenuItem>
                    <MenuItem  value="duo">Double</MenuItem>
                    <MenuItem  value="team">Team</MenuItem>
                </TextField>
                
            </Box>
            <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Description"
            style={{ width: '100%',minHeight:'250px' }}
            // defaultValue={!forEdit?editData.description:""} onChange={(event)=>handleChange(event,'description')}
            />
            <Button variant="outlined" color="success" onClick={handleSave}>Save</Button>
        </Stack>
    )
}

export default AddSport
