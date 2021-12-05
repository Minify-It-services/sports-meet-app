import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import DrawerBar from '../../../components/DrawerBar';

const ResultFixture = () => {
    const handleRegister = async () => {}
    return (
        <Box sx={{ display: 'flex' }}>
            <DrawerBar pageName={'Fixture'} pageId ={4} />
            <Box sx={{flexGrow:1, pt:12.5, px:{xs:2,sm:3,md:5}}}>
                {/* <Box sx={{display:'flex', justifyContent:!action?'flex-end':'flex-start'}}>
                    {!action?<Button variant="contained" color="primary" onClick={()=>{setaction(!action); if(!isObjEmpty(toEdit)){
                        settoEdit({})
                    }}}>Add MatchFixture</Button>:<Button onClick={()=>setaction(!action)}> <ArrowBackIosIcon /></Button>}
                </Box> */}
                {/* {!action? <TableContainer component={Paper} sx={{mt:2}}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Match</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Results</TableCell>
                                <TableCell align="center">Time</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {matches?.map((match,index) => (
                                <TableRow  key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="center">{match?.team1.name} vs {match?.team2.name}</TableCell>
                                    <TableCell align="center">{match?.date.substr(0, 10)}</TableCell>
                                    <TableCell align="center">{match?.score.team1||0} : {match?.score.team2||0}</TableCell>
                                    <TableCell align="center">{match?.time}</TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                        <Button key="one" variant="outlined" color="primary" onClick={()=>editData(match)}>Edit</Button>
                                        <Button key="two" variant="outlined" color="error" onClick={()=>deleteMatch(match.id)}>Delete</Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                : <div row={toEdit}> */}
                    <Stack spacing={4} my={4}>
                        {/* <Typography>Select Sport</Typography>
                        <Box display="grid" gridTemplateColumns="1fr">
                            <Autocomplete
                                disableClearable={true}
                                disablePortal
                                getOptionLabel={option => option.name || ''}
                                value={sport}
                                options={sports}
                                onChange={(e, value)=>setSport({ name: value.name, type: value.type })}
                                renderInput={(params) => <TextField {...params} label="Sport" />}
                            />
                        </Box>
                        <Typography>Select two Teams </Typography>
                        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={5}>
                            <Autocomplete
                                disablePortal
                                options={teams}
                                isOptionEqualToValue={(option, value) => option.label === value.name}
                                getOptionLabel={option => option.name || ''}
                                value={teamData.team1}
                                onChange={(e, value) => setTeamData(prevState => ({
                                    ...prevState,
                                    team1: { id: value.id, name: value.name }
                                }))}
                                renderInput={(params) => <TextField {...params} label="Team1" />}
                            />
                            <Autocomplete
                                disablePortal
                                options={teams}
                                isOptionEqualToValue={(option, value) => option.label === value.name}
                                getOptionLabel={option => option.name || ''}
                                value={teamData.team2}
                                onChange={(e, value) => setTeamData(prevState => ({
                                    ...prevState,
                                    team2: { id: value.id, name: value.name }
                                }))}
                                renderInput={(params) => <TextField {...params} label="Team2" />}
                            />
                        </Box> */}
                        <Box display='grid' gridTemplateColumns="1fr 1fr" gap={5}>
                            <TextField id="standard-basic" label="Team1 Score" variant="standard" type="number" />
                            <TextField id="standard-basic" label="Team2 Score" variant="standard" type="number" />
                        </Box>
                        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={5}>
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder="Card Description"
                                style={{ width: '100%',minHeight:'200px' }}
                            // defaultValue={!forEdit?editData.description:""} onChange={(event)=>handleChange(event,'description')}
                            />
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder="Score Description"
                                style={{ width: '100%',minHeight:'200px' }}
                            // defaultValue={!forEdit?editData.description:""} onChange={(event)=>handleChange(event,'description')}
                            />
                        </Box>
                        <Button variant="outlined" color="success" onClick={handleRegister}>Save</Button>
                    </Stack>
                {/* </div>

                } */}
            </Box>
        </Box>
    )
}

export default ResultFixture
