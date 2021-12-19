import React from 'react'
import { useCookies } from 'react-cookie'
import Login from '../Login/Login'
import Family from '../Family/Family'
import User from '../User/User'

const Dashboard = () => {
    const [cookies] = useCookies(['userToken'])

    if (!cookies.userToken) return <Login />

    window.history.replaceState(null, "Dashboard", "/")

    return (
        <div className="bg-colors w-full h-screen">
            <div className="pt-2 pl-2 flex flex-row w-full justify-between">
                <h1 className="text-4xl font-bold text-white font font-['Righteous']">Family Board</h1>
                <div className="flex flex-row justify-between pr-5">
                    <User />
                    <Family />
                </div>
            </div>
        </div>
    )
}

export default Dashboard