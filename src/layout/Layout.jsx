import { ArrowBackIos } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'

// components
import Navbar from '../components/Navbar';

const Layout = ({ title, children, isSecondPage=false }) => {
    const navigate = useNavigate()

    return (
        <>
            <div style={{ height: '10vh', width: '100%'}} />
                {children}
            <div className="topbar" style={{backgroundColor:'#6F7CC7', color:'#FFFFFF', display:'flex', justifyContent:'space-between', alignItems:'center', height:'10vh'}}>
                <Typography >
                    {isSecondPage&&<span style={{ marginRight: '1em', cursor: 'pointer' }} onClick={()=>navigate(-1)}><ArrowBackIos /></span>} {title}
                </Typography>
                <img src="./images/logo-full.png" alt="logo" style={{width:'50px'}} />
            </div>
            <div style={{ height: '10vh', width: '100%'}} />
            <Navbar />   
        </>
    )
}

export default Layout
