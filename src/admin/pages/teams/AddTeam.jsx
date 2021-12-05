import React from 'react';
import { useState,useEffect } from 'react';

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

    const [name, setName] = useState('');

      const pushTeam= async ()=> {
        const team = {
          name,
          sport:{
            name: sport.name,
            gameType: sport.type,
          },
          memberIds: teachers.map(teacher=>teacher.id),
        }
        const  response = await props.jsendRes.destructFromApi('/teams/teachers','POST',team)
        if(response.status === 'success'){
            window.location.reload()
        }
        else{
            console.log(response)
        }
    }
    return (
        <Stack spacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:2}}>
            <TextField id="standard-basic" label="Team Name" variant="standard" type="text" onChange={(e)=>setName(e.target.value)}/>
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
            <Button variant="outlined" color="success" onClick={pushTeam}>Save</Button>
        </Stack>
    )
}

export default AddTeam
