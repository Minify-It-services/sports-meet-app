import React from 'react';
import { useState,useEffect,useCallback } from 'react';
import { cleanup } from '@testing-library/react';

import TextField  from '@mui/material/TextField';
import Button  from '@mui/material/Button';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

function AddTeam(props) {
  const [members, setMembers] = useState([])
  const [teachers, setTeachers] = useState([])
  const [sports, setSports] = useState([])
  const [sport, setSport] = useState('')
  const [selectedOptions, setSelectedOptions] = useState([])
  
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
    const response = await props.jsendRes.destructFromApi(`/users?year=0`, 'GET')
    if(response.status === 'success'){
      setMembers(response.data)
    }else{
      console.log(response.data, response.message);
    }
  }
  useEffect(() => {
    fetchSports();
    getPlayers();
  // eslint-disable-next-line
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

    //TODO:ONSAVE GO BACK TO TABLE SCREEN
    const handleSave = useCallback(event => {
        props.changeAction(false);
        console.log(editedTeam);
      }, [props,editedTeam])
    return (
        <Stack spacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:2}}>
            <TextField id="standard-basic" label="Team Name" variant="standard" type="text" defaultValue={!forEdit?editData.name:""} />
            <div>
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
                onChange={(event, value) => {
                  setTeachers(value)
                  setSelectedOptions(value)
                }}
                getOptionDisabled={(option)=>(selectedOptions.includes(option)?true:false)}
                renderInput={(params) => <TextField {...params} label="Team Members" variant="standard" required={true}/>}
              />
            </div>
            <Button variant="outlined" color="success" onClick={handleSave}>Save</Button>
        </Stack>
    )
}

export default AddTeam
