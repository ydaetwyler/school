import React from 'react'
import { useCookies } from 'react-cookie'
import { gql, useQuery } from '@apollo/client'
import Login from '../Login/Login'
import Family from '../Family/Family'
import User from '../User/User'

const GET_FAMILY = gql`
    query GetFamily {
        getFamily {
            _id
        }
    }
`

const Dashboard = () => {
    const { loading, error, data } = useQuery(GET_FAMILY)
    const [cookies, setCookie, removeCookie] = useCookies(['userToken'])

    if (!cookies.userToken) return <Login />

    if (loading) return <img src="/icons/loading.png" className="animate-spin h-9 w-9" />
    if (error) return `Error -> ${error}`

    window.history.replaceState(null, "Dashboard", "/")

    const handleLogout = () => {
        removeCookie('userToken')
    } 

    return (
        <div className="bg-colors w-full h-screen">
            <div className="pt-2 pl-2 flex flex-row w-full justify-between">
                <h1 className="text-4xl font-bold text-white font font-['Righteous']">Family Board</h1>
                <div className="flex flex-row justify-between pr-5">
                    <User />
                    <Family familyID={data.getFamily._id} />
                    <img 
                        src="/icons/logout.png" 
                        className="h-9 w-9 ml-3 cursor-pointer opacity-60 hover:opacity-100" 
                        onClick={handleLogout}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard