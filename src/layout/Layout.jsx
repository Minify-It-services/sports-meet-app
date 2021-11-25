import Navbar from '../components/Navbar'

const Layout = ({ children }) => {
    return (
        <>
         {children}
         <Navbar />   
        </>
    )
}

export default Layout
