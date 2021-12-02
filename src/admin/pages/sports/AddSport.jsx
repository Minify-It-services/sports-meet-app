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

function AddTeam(props) {
    const currencies = [
        {
            value: 'USD',
            label: '$',
        },
        {
            value: 'EUR',
            label: '€',
        },
        {
            value: 'BTC',
            label: '฿',
        },
        {
            value: 'JPY',
            label: '¥',
        },
    ];
    const [currency, setCurrency] = React.useState('EUR');
    const handleChange = (event) => {
        setCurrency(event.target.value);
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
                isOptionEqualToValue={(option, value) =>
                option.label === value.label
                }
                disablePortal
                options={['Ref1']}
                onChange={(e) =>console.log('set selected value')}
                renderInput={(params) => (
                <TextField {...params} label="Refree" variant="standard" />
                )}
            />
            <Box display='grid' gridTemplateColumns="1fr 1fr"  gap={5}>
                <TextField
                select
                label="Class Limit"
                value={currency}
                onChange={handleChange}
                >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
                <TextField
                select
                label="Total Limit"
                value={currency}
                onChange={handleChange}
                >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
            </Box>
            <Box display='grid' gridTemplateColumns="1fr 1fr" gap={5}>
                <TextField
                select
                label="Sports Type"
                value={currency}
                onChange={handleChange}
                >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
                <TextField id="standard-basic" label="Image URL" variant="standard" type="text" />
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

export default AddTeam
