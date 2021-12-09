import React from 'react'
import { useCookies } from 'react-cookie'
import Login from '../Login/Login'
import Family from '../Family/Family'

const Dashboard = () => {
    const [cookies] = useCookies(['userToken'])

    if (!cookies.userToken) return <Login />

    return (
        <div>
            <Family />
        </div>
    )
}

export default Dashboard