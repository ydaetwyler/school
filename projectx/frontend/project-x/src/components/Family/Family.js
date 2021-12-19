import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import UpdateFamily from './UpdateFamily'

const GET_FAMILY = gql`
    query GetFamily {
        getFamily {
            familyName,
            familyAvatarUrl,
            familyMembers {
                userName,
                avatarUrl
            }
        }
    }
`

const Family = () => {
    const { loading, error, data } = useQuery(GET_FAMILY)
    const [clicked, setClicked] = useState(false)

    if (loading) return 'Loading...'
    if (error) return `Error -> ${error}`

    return (
        <div>
            <div className="group flex flex-col pr-8 items-center cursor-pointer" onClick={() => setClicked(true)}>
                <img src={data.getFamily.familyAvatarUrl} className="h-10 w-12 group-hover:animate-bounce" />
                <p className="-mt-1 text-center text-sm text-white font-medium font-['Mulish'] opacity-70 group-hover:opacity-100">
                    {data.getFamily.familyName}
                </p>
            </div>
            <UpdateFamily 
                clicked={clicked}
                setClicked={setClicked}
                initialFamily={data.getFamily.familyName} 
                initialAvatar={data.getFamily.familyAvatarUrl}
                familyMembers={data.getFamily.familyMembers}
            />
        </div>
    )
}

export default Family