import { Typography } from '@mui/material';

// components
import Navbar from '../components/Navbar';

const Layout = ({ title, children }) => {
    return (
        <>
            <div style={{ height: '120px', width: '100%'}} />
                {children}
            <div className="topbar">
                <Typography >
                    {title}
                </Typography>
            </div>
            <Navbar />   
        </>
    )
}

export default Layout
