import React from 'react'
import { useCookies } from 'react-cookie'
import Login from '../Login/Login'

const Dashboard = () => {
    const [cookies] = useCookies(['userToken'])

    if (!cookies.userToken) return <Login />

    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    )
}

export default Dashboard