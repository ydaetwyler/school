import React from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_USER = gql`
    query GetUser {
        getUser {
            userName
        }
    }
`

const User = () => {
    const { loading, error, data } = useQuery(GET_USER)

    if (loading) return 'Loading...'
    if (error) return `Error -> ${error}`

    return (
        <div>
            <p>{data.getUser.userName}</p>
        </div>
    )
}

export default User