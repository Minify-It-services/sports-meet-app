import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

// icons
import {BiHomeAlt} from 'react-icons/bi';
import {FiTablet} from 'react-icons/fi';
import {HiOutlineDocumentAdd} from 'react-icons/hi';
import {FiUser} from 'react-icons/fi';

// css
import './Navbar.css';

const Navbar = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [value, setValue] = React.useState();

    React.useEffect(() => {
        switch (pathname) {
            case '/':
                setValue('home')
                break;
            case '/profile':
                setValue('profile')
                break;
            case '/teamRegister':
                setValue('register')
                break;
            default: return
        }
    // eslint-disable-next-line
    }, [])

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation sx={{ width:'100%' }} className="items" value={value}>
                <BottomNavigationAction lable="Home" value="home" icon={<BiHomeAlt />} className={`item ${pathname==='/'?'item-active':''}`} onClick={() => navigate('/')} />
                <BottomNavigationAction lable="Fixtures" value="fixtures" icon={<FiTablet />} className="item" />
                <BottomNavigationAction lable="Register" value="register" icon={<HiOutlineDocumentAdd />} className={`item ${pathname==='/teamRegister'?'item-active':''}`} onClick={()=> navigate('/teamRegister')} />
                <BottomNavigationAction lable="Profile" value="profile" icon={<FiUser />} className={`item ${pathname==='/profile'?'item-active':''}`} onClick={() => {navigate('/profile')}} />
            </BottomNavigation>
        </Paper>
    );
}

export default Navbar
