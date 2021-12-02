import React from 'react';
import { useState,useEffect,useCallback } from 'react';
import { cleanup } from '@testing-library/react';

import TextField  from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';

function AddTeam(props) {
    const [playersCount, setplayersCount] = useState(1);
    const [forEdit, setforEdit] = useState(false);
    const [editedTeam, seteditedTeam] = useState({});
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
            seteditedTeam(props.row);
        };
        return ()=>{
            cleanup();
        }
    }, [editData,props.row]);
// }, []);

    // data:
    const academyList = [
        {
          year: '2017',
          semester: '7th',
        },
        {
          year: '2018',
          semester: '5th',
        },
        {
          year: '2019',
          semester: '3rd',
        },
        {
          year: '2020',
          semester: '1st',
        },
      ];

    const faculty = ['Software','Computer'];
    const handleChange = (event,keyName) => {
        seteditedTeam((prev)=>{return {...prev,[`${keyName}`]:event.target.value}})
    };
    //TODO:ONSAVE GO BACK TO TABLE SCREEN
    const handleSave = useCallback(event => {
        props.changeAction(false);
        console.log(editedTeam);
      }, [props,editedTeam])
    return (
        <Stack spacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:2}}>
            <TextField id="standard-basic" label="Team Name" variant="standard" type="text" defaultValue={!forEdit?editData.name:""} />
            {!forEdit?<div>
            <Box display="grid" gridTemplateColumns="1fr 1fr" justifyContent="space-between">
            <h3>Players</h3>
            <ToggleButton
                value="check"
                // selected={selected}
                onChange={() => {
                  setplayersCount(playersCount=>playersCount+1);
                }}
                sx={{maxWidth:'50px',justifySelf:'end'}}
                >
                <AddIcon />
            </ToggleButton>
            </Box>
            <Stack spacing={2}>
            {
                [...Array(playersCount)].map((e, i) =><TextField id="standard-basic" label={`Player ${i+1}`} variant="standard" type="text" key={i}/>)
            }
            </Stack>
            </div>
            :<div>
                <Box display="grid" gridTemplateColumns="1fr 1fr" justifyContent="space-between" gap="50px">
                <TextField
                select
                label="Year"
                value={editedTeam.year}
                onChange={(event)=>handleChange(event,'year')}
                >
                {academyList.map((option) => (
                    <MenuItem key={option.year} value={option.year}>
                    {option.year}
                    </MenuItem>
                ))}
                </TextField>
                <TextField
                select
                label="Faculty"
                value={editedTeam.faculty}
                onChange={(event)=>handleChange(event,'faculty')}
                >
                {faculty.map((option) => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                ))}
                </TextField>
                </Box>
            </div>
            }
            <Button variant="outlined" color="success" onClick={handleSave}>Save</Button>
            {/* <Button variant="outlined" color="success">Save</Button> */}
        </Stack>
    )
}

export default AddTeam
