import React from 'react';
import { useState,useEffect,useCallback } from 'react';

import TextField  from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { cleanup } from '@testing-library/react';

function AddTeam(props) {
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
        <Stack spacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:2}}>
            <TextField id="standard-basic" label="Sport Name" variant="standard" type="text" defaultValue={!forEdit?editData.name:""} />
            <TextField id="standard-basic" label="Coordinator" variant="standard" type="text" defaultValue={!forEdit?editData.captain:""} />
            <TextField id="standard-basic" label="Vice-Coordinator" variant="standard" type="text" defaultValue={!forEdit?editData.vice:""} />
            <Button variant="outlined" color="success" onClick={handleSave}>Save</Button>
        </Stack>
    )
}

export default AddTeam
