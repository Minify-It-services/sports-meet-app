import React from 'react';
import { useState,useEffect,useCallback } from 'react';

import TextField  from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import { cleanup } from '@testing-library/react';

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

    const handleChange = (event,keyName) => {
        seteditedNotice((prev)=>{return {...prev,[`${keyName}`]:event.target.value}})
    };
    //TODO:ONSAVE GO BACK TO TABLE SCREEN WITH SET STATE
    // const handleSave = useCallback(event => {
    //     props.changeAction(false);
    //     console.log(editedNotice);
    //   }, [props,editedNotice])
    return (
        <Stack spacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:2}}>
            <TextField id="standard-basic" label="Title" variant="standard" type="text" defaultValue={!forEdit?editData.title:""} onChange={(event)=>handleChange(event,'title')}/>
            <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Description"
            style={{ width: '100%',minHeight:'250px' }}
            defaultValue={!forEdit?editData.description:""} onChange={(event)=>handleChange(event,'description')}
            />
            {/* <TextField id="standard-basic" label="Description" variant="standard" type="text" defaultValue={!forEdit?editData.description:""} onChange={(event)=>handleChange(event,'description')}/> */}
            <Button variant="outlined" color="success" onClick={()=>console.log(editedNotice)}>Save</Button>
        </Stack>
    )
}

export default AddNotice
