import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import getDate from '../../utils/getDate'
import Weather from './Weather'
import axios from 'axios'

import UpdateEvent from './UpdateEvent'

const GET_EVENTITEM = gql`
    query GetEventItem($_id: ID!) {
        getEventItem(_id: $_id) {
            activityName,
            activityImageUrl,
            activityDate,
            activityDescription,
            activityLocation,
            activityAddress,
            activityUrl,
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
`

/*const EVENTITEM_SUBSCRIPTION = gql`
    subscription EventItemChanged($_id: ID!) {
        eventItemChanged(_id: $_id) {
            activityParticipantsList {
                userName,
                avatarUrl
            }
        }
    }
`*/

const EventItemTeaser = ({ eventId, setCoordinates }) => {
    const [dateDiff, setDateDiff] = useState()
    const [currentDate] = useState(new Date())
    const [newCoordinates, setNewCoordinates] = useState()
    const [clicked, setClicked] = useState(false)

    const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTITEM, {
        variables: { _id: eventId }
    })

    /*useEffect(() => {
        subscribeToMore({
            document: EVENTITEM_SUBSCRIPTION,
            variables: { _id: eventId },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev
                const newEventItem = subscriptionData.data.eventItemChanged

                return {
                    getEventItem: {...prev.getEventItem, ...newEventItem}
                }
            }
        })
    }, [])*/

    useEffect(() => {
        if (data) {
            const eventDate = new Date(data.getEventItem.activityDate)
            const timeDiff = eventDate.getTime() - currentDate.getTime()
            const dayDiff = timeDiff / (1000 * 3600 * 24)
            setDateDiff(dayDiff)
        }
    }, [data])

    const apiKey = process.env.REACT_APP_OPENWEATHER_KEY
    const locationUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='

    useEffect(() => {
        if (data) {
            if (!data.getEventItem.activityCoordinates && !data.getEventItem.activityApiCityNotFound) {
                axios
                    .get(`${locationUrl}${data.getEventItem.activityLocation}&limit=1&appid=${apiKey}`)
                    .then(response => {
                        const obj = response.data[0]
                        if (obj) {
                            const coordinates = `${obj.lat},${obj.lon}`
                            setNewCoordinates(coordinates)
                            setCoordinates({
                                variables: {
                                    _id: eventId,
                                    coordinates
                                }
                            })
                        } else {
                            setCoordinates({
                                variables: {
                                    _id: eventId,
                                    activityApiCityNotFound: true,
                                }
                            })
                        }
                    })
            }
        }
    }, [data])

    if (loading) return <img src="/icons/loading.png" className="animate-spin h-9 w-9" />
    if (error) return JSON.stringify(error, null, 2)

    if (dateDiff > 7 || dateDiff < 0) {
        return (
            <div>
                <div className="relative shadow-md border rounded-lg max-w-xs bg-gray-800 border-gray-700 mx-8 font-['Mulish'] cursor-pointer" onClick={() => setClicked(true)}>
                    <img className="rounded-t-lg max-h-px[212]" src={data.getEventItem.activityImageUrl} />
                    <h5 className="ml-4 mt-2 font-bold text-2xl mb-2 text-white">
                        {data.getEventItem.activityName}
                    </h5>
                    <p className="ml-4 font-normal mb-3 text-gray-400">
                        {data.getEventItem.activityLocation}
                    </p>
                    <p className="ml-4 font-normal mb-3 text-gray-400">
                        {getDate(data.getEventItem.activityDate)}
                    </p>
                    <p className="text-sm w-24 text-center text-gray-400 absolute right-2 top-3/4">
                        No weather forecast available yet
                    </p>
                </div>
                <UpdateEvent
                    clicked={clicked}
                    setClicked={setClicked}
                    id={eventId}
                    item={data.getEventItem}
                />
            </div>
        )
    } else if (data.getEventItem.activityApiCityNotFound) {
        return (
            <div>
                <div className="relative shadow-md border rounded-lg max-w-xs bg-gray-800 border-gray-700 mx-8 font-['Mulish'] cursor-pointer" onClick={() => setClicked(true)}>
                    <img className="rounded-t-lg max-h-px[212]" src={data.getEventItem.activityImageUrl} />
                    <h5 className="ml-4 mt-2 font-bold text-2xl mb-2 text-white">
                        {data.getEventItem.activityName}
                    </h5>
                    <p className="ml-4 font-normal mb-3 text-gray-400">
                        {data.getEventItem.activityLocation}
                    </p>
                    <p className="ml-4 font-normal mb-3 text-gray-400">
                        {getDate(data.getEventItem.activityDate)}
                    </p>
                    <p className="text-sm w-24 text-center text-gray-400 absolute right-2 top-3/4">
                        No weather forecast - city not found
                    </p>
                </div>
                <UpdateEvent
                    clicked={clicked}
                    setClicked={setClicked}
                    id={eventId}
                    item={data.getEventItem}
                />
            </div>
        )
    } else {
        return (
            <div>
                <div className="relative shadow-md border rounded-lg max-w-xs bg-gray-800 border-gray-700 mx-8 font-['Mulish'] cursor-pointer" onClick={() => setClicked(true)}>
                    <img className="rounded-t-lg max-h-px[212]" src={data.getEventItem.activityImageUrl} />
                    <h5 className="ml-4 mt-2 font-bold text-2xl mb-2 text-white">
                        {data.getEventItem.activityName}
                    </h5>
                    <p className="ml-4 text-base font-normal mb-3 text-gray-400">
                        {data.getEventItem.activityLocation}
                    </p>
                    <p className="ml-4 text-base font-normal mb-3 text-gray-400">
                        {getDate(data.getEventItem.activityDate)}
                    </p>
                    <div className="text-sm w-24 text-center text-gray-400 absolute right-2 top-3/4">
                        <Weather 
                            id={eventId}
                            dateDiff={dateDiff} 
                            coordinates={data.getEventItem.activityCoordinates ? data.getEventItem.activityCoordinates : newCoordinates}
                            lastCall={data.getEventItem.activityApiLastCall}
                            savedIcon={data.getEventItem.activityWeatherIcon}
                            savedTemp={data.getEventItem.activityWeatherTemp}
                        />
                    </div>
                </div>
                <UpdateEvent
                    clicked={clicked}
                    setClicked={setClicked}
                    id={eventId}
                    item={data.getEventItem}
                />
            </div>
        )
    }
}

export default EventItemTeaser