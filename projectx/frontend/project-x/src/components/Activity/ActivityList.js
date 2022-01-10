import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

import AddEventItem from './AddEventItem'
import EventItemTeaser from './EventItemTeaser'

import Toggle from '../Forms/Utils/Toggle'

const GET_ACTIVITIES = gql`
    query GetFamily {
        getFamily {
           eventList {
               _id,
               activityDate,
               activityParticipantsList {
                   _id
               }
           }
        }
    }
`

const ActivityList = ({ familyID }) => {
    const { loading, error, data, subscribeToMore } = useQuery(GET_ACTIVITIES)
    const [initialEvents, setInitialEvents] = useState([])
    const [events, setEvents] = useState([])
    const [togglePast, setTogglePast] = useState()

    useEffect(() => {
        if (data) {
            setInitialEvents(data.getFamily.eventList)
            setEvents(data.getFamily.eventList)
            setTogglePast(false)
        }
    }, [data])

    useEffect(() => {
        togglePast
           ? setEvents(initialEvents.filter(item => new Date(item.activityDate).getTime() < new Date().getTime()))
           : setEvents(initialEvents.filter(item => new Date(item.activityDate).getTime() > new Date().getTime()))
    }, [togglePast])

    const toggleHistoryHandler = () => togglePast ? setTogglePast(false) : setTogglePast(true)

    if (loading) return <img src="/icons/loading.png" className="animate-spin h-9 w-9" />
    if (error) return JSON.stringify(error, null, 2)

    return (
        <div className="mt-20 flex flex-row flex-wrap justify-evenly">
            <div className="flex flex-row absolute top-20">
                <Toggle 
                    onChange={toggleHistoryHandler} 
                    defaultChecked={false} 
                    text='Past events'
                    position=""
                    id="toggle-history"
                />
                <Toggle 
                    onChange={null} 
                    defaultChecked={false} 
                    text='I participate'
                    position="ml-16"
                    id="toggle-joined"
                />
            </div>
            <AddEventItem />
            {events.map((item) => {
                return <EventItemTeaser 
                            key={item._id}
                            eventId={item._id}
                            familyID={familyID} 
                        />
            })}
        </div>
    )
}

export default ActivityList