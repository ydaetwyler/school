import React, { useState, useEffect } from 'react'
import getDate from '../../utils/getDate'
import Weather from './Weather'
import axios from 'axios'

import UpdateEvent from './UpdateEvent'

const EventItemTeaser = ({ item, setCoordinates, familyID }) => {
    const [dateDiff, setDateDiff] = useState()
    const [currentDate] = useState(new Date())
    const [newCoordinates, setNewCoordinates] = useState()
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        const eventDate = new Date(item.activityDate)
        const timeDiff = eventDate.getTime() - currentDate.getTime()
        const dayDiff = timeDiff / (1000 * 3600 * 24)
        setDateDiff(dayDiff)
    }, [currentDate])

    const apiKey = process.env.REACT_APP_OPENWEATHER_KEY
    const locationUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='

    useEffect(() => {
        if (!item.activityCoordinates && !item.activityApiCityNotFound) {
            axios
                .get(`${locationUrl}${item.activityLocation}&limit=1&appid=${apiKey}`)
                .then(response => {
                    const obj = response.data[0]
                    if (obj) {
                        const coordinates = `${obj.lat},${obj.lon}`
                        setNewCoordinates(coordinates)
                        setCoordinates({
                            variables: {
                                _id: item._id,
                                coordinates
                            }
                        })
                    } else {
                        setCoordinates({
                            variables: {
                                _id: item._id,
                                activityApiCityNotFound: true,
                            }
                        })
                    }
                })
        }
    }, [])

    if (dateDiff > 7 || dateDiff < 0) {
        return (
            <div>
                <div className="relative shadow-md border rounded-lg max-w-xs bg-gray-800 border-gray-700 mx-8 font-['Mulish'] cursor-pointer" onClick={() => setClicked(true)}>
                    <img className="rounded-t-lg max-h-px[212]" src={item.activityImageUrl} />
                    <h5 className="ml-4 mt-2 font-bold text-2xl mb-2 text-white">{item.activityName}</h5>
                    <p className="ml-4 font-normal mb-3 text-gray-400">{item.activityLocation}</p>
                    <p className="ml-4 font-normal mb-3 text-gray-400">{getDate(item.activityDate)}</p>
                    <p className="text-sm w-24 text-center text-gray-400 absolute right-2 top-3/4">No weather forecast available yet</p>
                </div>
                <UpdateEvent
                    clicked={clicked}
                    setClicked={setClicked}
                    id={item._id}
                    item={item}
                    familyID={familyID}
                />
            </div>
        )
    } else if (item.activityApiCityNotFound) {
        return (
            <div>
                <div className="relative shadow-md border rounded-lg max-w-xs bg-gray-800 border-gray-700 mx-8 font-['Mulish'] cursor-pointer" onClick={() => setClicked(true)}>
                    <img className="rounded-t-lg max-h-px[212]" src={item.activityImageUrl} />
                    <h5 className="ml-4 mt-2 font-bold text-2xl mb-2 text-white">{item.activityName}</h5>
                    <p className="ml-4 font-normal mb-3 text-gray-400">{item.activityLocation}</p>
                    <p className="ml-4 font-normal mb-3 text-gray-400">{getDate(item.activityDate)}</p>
                    <p className="text-sm w-24 text-center text-gray-400 absolute right-2 top-3/4">No weather forecast - city not found</p>
                </div>
                <UpdateEvent
                    clicked={clicked}
                    setClicked={setClicked}
                    id={item._id}
                    item={item}
                    familyID={familyID}
                />
            </div>
        )
    } else {
        return (
            <div>
                <div className="relative shadow-md border rounded-lg max-w-xs bg-gray-800 border-gray-700 mx-8 font-['Mulish'] cursor-pointer" onClick={() => setClicked(true)}>
                    <img className="rounded-t-lg max-h-px[212]" src={item.activityImageUrl} />
                    <h5 className="ml-4 mt-2 font-bold text-2xl mb-2 text-white">{item.activityName}</h5>
                    <p className="ml-4 text-base font-normal mb-3 text-gray-400">{item.activityLocation}</p>
                    <p className="ml-4 text-base font-normal mb-3 text-gray-400">{getDate(item.activityDate)}</p>
                    <div className="text-sm w-24 text-center text-gray-400 absolute right-2 top-3/4">
                        <Weather 
                            id={item._id}
                            dateDiff={dateDiff} 
                            coordinates={item.activityCoordinates ? item.activityCoordinates : newCoordinates}
                            lastCall={item.activityApiLastCall}
                            savedIcon={item.activityWeatherIcon}
                            savedTemp={item.activityWeatherTemp}
                        />
                    </div>
                </div>
                <UpdateEvent
                    clicked={clicked}
                    setClicked={setClicked}
                    id={item._id}
                    item={item}
                    familyID={familyID}
                />
            </div>
        )
    }
}

export default EventItemTeaser