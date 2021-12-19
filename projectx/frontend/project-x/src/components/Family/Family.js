import React from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_FAMILY = gql`
    query GetFamily {
        getFamily {
            familyName,
            familyAvatarUrl,
            familyMembers {
                userName,
                userEmail
            }
        }
    }
`

const Family = () => {
    const { loading, error, data } = useQuery(GET_FAMILY)

    if (loading) return 'Loading...'
    if (error) return `Error -> ${error}`

    return (
        <div className="group flex flex-col pr-8 items-center">
            <img src={data.getFamily.familyAvatarUrl} className="h-10 w-12 group-hover:animate-bounce" />
            <p className="-mt-1 text-center text-sm text-white font-medium font-['Mulish']">
                {data.getFamily.familyName}
            </p>
        </div>
    )
}

export default Family