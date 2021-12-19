import React from 'react'
import { gql, useQuery } from '@apollo/client'

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

    if (loading) return 'Loading...'
    if (error) return `Error -> ${error}`

    return (
        <div className="group flex flex-col pr-8 items-center">
            <img src={data.getUser.avatarUrl} className="h-10 w-12 group-hover:animate-bounce" />
            <p className="-mt-1 text-center text-sm text-white font-medium font-['Mulish']">
                {data.getUser.userName}
            </p>
        </div>
    )
}

export default User