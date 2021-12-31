import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { SET_COORDINATES } from '../../utils/mutations'

import EventItemTeaser from './EventItemTeaser'

const GET_ACTIVITIES = gql`
    query GetFamily {
        getFamily {
           eventList {
               _id,
               activityName,
               activityImageUrl,
               activityDate,
               activityDescription,
               activityLocation,
               activityAddress,
               activityCoordinates,
               activityApiCityNotFound,
               activityApiLastCall,
               activityWeatherIcon,
               activityWeatherTemp,
               activityWeatherDesc,
               activityWeatherSunrise,
               activityWeatherSunset,
               activityWeatherWind,
               activityParticipantsList {
                   userName,
                   avatarUrl
               }
           }
        }
    }
`

const ActivityList = ({ familyID }) => {
    const { loading, error, data, subscribeToMore } = useQuery(GET_ACTIVITIES)
    const [setCoordinates] = useMutation(SET_COORDINATES)

    if (loading) return <img src="/icons/loading.png" className="animate-spin h-9 w-9" />
    if (error) return JSON.stringify(error, null, 2)

    return (
        <div className="mt-10">
            {data.getFamily.eventList.map((item) => {
                return <EventItemTeaser 
                            key={item._id} 
                            item={item} 
                            setCoordinates={setCoordinates} 
                            familyID={familyID} 
                        />
            })}
        </div>
    )
}

export default ActivityList