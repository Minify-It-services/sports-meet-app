import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

// icons
import HomeIcon from '@mui/icons-material/Home';
import TableChartIcon from '@mui/icons-material/TableChart';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PersonIcon from '@mui/icons-material/Person';

export const Navbar = () => {

    const navigate = useNavigate();

    const [value, setValue] = React.useState('home');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation sx={{ width:'100%' }} value={value} onChange={handleChange}>
                <BottomNavigationAction value="home" icon={<HomeIcon />} onClick={() => navigate('/')}/>
                <BottomNavigationAction value="fixtures" icon={<TableChartIcon />}/>
                <BottomNavigationAction value="register" icon={<NoteAddIcon />}/>
                <BottomNavigationAction value="profile" icon={<PersonIcon />} onClick={() => {navigate('/profile')}} />
            </BottomNavigation>
        </Paper>
    );
}

export default Navbar
