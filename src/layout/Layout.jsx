import { Typography } from '@mui/material';

// components
import Navbar from '../components/Navbar';

const Layout = ({ title, children }) => {
    return (
        <>
            <div style={{ height: '120px', width: '100%'}} />
                {children}
            <div className="topbar" style={{backgroundColor:'#6F7CC7', color:'#FFFFFF'}}>
                <Typography >
                    {title}
                </Typography>
            </div>
            <div style={{ height: '120px', width: '100%'}} />
            <Navbar />   
        </>
    )
}

export default Layout
