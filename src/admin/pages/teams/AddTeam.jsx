import React from 'react';
import { useState,useEffect,useCallback } from 'react';

import TextField  from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

import AddIcon from '@mui/icons-material/Add';
import { cleanup } from '@testing-library/react';

function AddTeam(props) {
  const [members, setMembers] = useState([])
  const [sports, setSports] = useState([])
  const [sport, setSport] = useState('')
  
  const fetchSports = async ()=>{
    const response = await props.jsendRes.destructFromApi('/sports','GET')
      if(response.status === 'success'){
          setSports(response.data)
      }
      else{
          console.log(response.message);
      }
  }
  const getPlayers = async () => {
    const response = await props.jsendRes.destructFromApi(`/users?year=2018`, 'GET')
    if(response.status === 'success'){
      setMembers(response.data)
    }else{
      console.log(response.data, response.message);
    }
  }
  useEffect(() => {
    fetchSports();
    getPlayers();
  }, [])

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
            <h3>Sport</h3>
            </Box>
            <Autocomplete
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.label === value.name}
                autoComplete={false}
                options={sports}
                onChange={(event, value) => setSport(value)}
                renderInput={(params) => <TextField {...params} label="Sport" variant="standard" required={true}/>}
            />
            <Autocomplete
              multiple
              id="tags-standard"
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.label === value.name}
              autoComplete={false}
              options={members}
              onChange={(event, value) => setSport(value)}
              renderInput={(params) => <TextField {...params} label="Team Members" variant="standard" required={true}/>}
            />
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
