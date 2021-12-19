import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import UpdateUser from './UpdateUser'

const GET_USER = gql`
    query GetUser {
        getUser {
            userName,
            avatarUrl
        }
    }
`

const User = () => {
    const { loading, error, data } = useQuery(GET_USER)
    const [clicked, setClicked] = useState(false)

    if (loading) return 'Loading...'
    if (error) return `Error -> ${error}`

    return (
        <div>
            <div className="group flex flex-col pr-8 items-center cursor-pointer" onClick={() => setClicked(true)}>
                <img src={data.getUser.avatarUrl} className="h-10 w-12 group-hover:animate-bounce" />
                <p className="-mt-1 text-center text-sm text-white font-medium font-['Mulish'] opacity-70 group-hover:opacity-100">
                    {data.getUser.userName}
                </p>
            </div>
            <UpdateUser 
                clicked={clicked}
                setClicked={setClicked}
                initialUser={data.getUser.userName} 
                initialAvatar={data.getUser.avatarUrl} 
            />
        </div>
    )
}

export default User