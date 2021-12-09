import React from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_FAMILY = gql`
    query GetFamily {
        getFamily {
            familyName
            familyMembers {
                userEmail
                userName
            }
        }
    }
`

const Family = () => {
    const { loading, error, data } = useQuery(GET_FAMILY)

    console.log(data)

    if (loading) return 'Loading...'
    if (error) return `Error -> ${error}`

    return (
        <div>
            <h1>Family Board</h1>
            <p>{data.getFamily.familyName}</p>
        </div>
    )
}

export default Family