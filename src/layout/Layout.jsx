import { ArrowBackIos } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'

// components
import Navbar from '../components/Navbar';

const Layout = ({ title, children, isSecondPage=false }) => {
    const navigate = useNavigate()

    return (
        <>
            <div style={{ height: '120px', width: '100%'}} />
                {children}
            <div className="topbar" style={{backgroundColor:'#6F7CC7', color:'#FFFFFF'}}>
                <Typography >
                    {isSecondPage&&<span style={{ marginRight: '1em', cursor: 'pointer' }} onClick={()=>navigate(-1)}><ArrowBackIos /></span>} {title}
                </Typography>
            </div>
            <div style={{ height: '120px', width: '100%'}} />
            <Navbar />   
        </>
    )
}

export default Layout
