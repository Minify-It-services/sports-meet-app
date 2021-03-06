import React from 'react';
import { useState,useEffect } from 'react';
import { cleanup } from '@testing-library/react';

import TextField  from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MenuItem from '@mui/material/MenuItem';

function AddNotice(props) {
    const [forEdit, setforEdit] = useState(false);
    const [editedNotice, seteditedNotice] = useState({});
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
            seteditedNotice(props.row);
        };
        return ()=>{
            cleanup();
        }
    }, [editData,props.row]);

    const pushNotice= async ()=> {
        let response = {}
        if(forEdit){
            const noticeToSend = {
                title: editedNotice.title,
                description: editedNotice.description,
                label: editedNotice.label,
            }
            response = await props.jsendRes.destructFromApi(`/notices/${editedNotice.id}`,'PATCH',noticeToSend)
        }
        else{
            response = await props.jsendRes.destructFromApi('/notices','POST',editedNotice)
        }
        if(response.status === 'success'){
            window.location.reload()
        }
        else{
            console.log(response)
        }
    }

    const handleChange = (event,keyName) => {
        seteditedNotice((prev)=>{return {...prev,[`${keyName}`]:event.target.value}})
    };
        return (
        <Stack spacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:2}}>
            <TextField id="standard-basic" label="Title" variant="standard" type="text" defaultValue={!forEdit?editData.title:""} onChange={(event)=>handleChange(event,'title')}/>
            <TextField
                select
                label="Notice Type"
                onChange={e=>handleChange(e, 'label')}
                defaultValue={!forEdit?editData.label:"delayed"}
                >
                    <MenuItem  value="delayed">Delayed</MenuItem>
                    <MenuItem  value="default winner">Default Winner</MenuItem>
                    <MenuItem  value="moved ahead">Moved Ahead</MenuItem>
                    <MenuItem  value="cancelled">Cancelled</MenuItem>
                    <MenuItem  value="important">Important</MenuItem>
                </TextField>
            <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Description"
            style={{ width: '100%',minHeight:'250px' }}
            defaultValue={!forEdit?editData.description:""} onChange={(event)=>handleChange(event,'description')}
            />
            <Button variant="outlined" color="success" onClick={pushNotice}>Save</Button>
        </Stack>
    )
}

export default AddNotice
