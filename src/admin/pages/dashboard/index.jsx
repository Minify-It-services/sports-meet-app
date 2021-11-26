import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom'

// components
import DrawerBar from '../../../components/DrawerBar';
import jsendDestructor from '../../../utils/api/jsendDestructor';

const Dashboard = () => {

    const navigate = useNavigate()
    const cookies = new Cookies();
    
    const token = cookies.get('sports_app_token');
    const [counts, setCounts] = useState({})

    const jsendRes = new jsendDestructor({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })
    
    const getData = async () => {
        const { data, status, message } = await jsendRes.destructFromApi('/admin/dashboard', 'GET')

        if(status === 'success'){
            setCounts(data)
            console.log(counts);
        }else{
            if(message === 'Forbidden')
                navigate('/profile')
        }
    }

    useEffect(() => {
        getData();
    // eslint-disable-next-line
    }, [])

    return (
        <>
            <DrawerBar pageName={'Dashboard'} pageId={1} />
        </>
    )
}

export default Dashboard
