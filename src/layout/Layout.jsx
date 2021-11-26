import { Typography } from '@mui/material'
import Navbar from '../components/Navbar'

const Layout = ({ title, children }) => {
    return (
        <>
         <div className="topbar">
             <Typography >
                {title}
             </Typography>
         </div>
         {children}
         <Navbar />   
        </>
    )
}

export default Layout
