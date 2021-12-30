import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useMutation } from '@apollo/client'
import { SET_WEATHER } from '../../utils/mutations'
import getTimeFromUtc from '../../utils/getTimeFromUtc' 

const Weather = ({ id, dateDiff, coordinates, lastCall, savedIcon, savedTemp }) => {
    const [currentTime] = useState(new Date())
    const [hoursDiff, setHoursDiff] = useState()
    const [weatherData, setWeatherData] = useState()
    const [icon, setIcon] = useState('')
    const [temp, setTemp] = useState('')
    const [desc, setDesc] = useState('')
    const [sunrise, setSunrise] = useState('')
    const [sunset, setSunset] = useState('')
    const [wind, setWind] = useState('')
    const [setWeather] = useMutation(SET_WEATHER)

    console.log(`received props - dateDiff=${dateDiff} - coordinates=${coordinates} - lastCall=${lastCall} -> `)

    const apiKey = process.env.REACT_APP_OPENWEATHER_KEY
    const weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?'
    const exclude = (dateDiff < 1) ? 'minutely,hourly,daily,alerts' : 'current,minutely,hourly,alerts'

    const hoursDiffCalc = (dateNow, dateStringLastCall) => {
        console.log('dateStringLastCall')
        console.log(dateStringLastCall)
        const dateLastCall = new Date(dateStringLastCall)
        console.log('Date last call -> ')
        console.log(dateLastCall)
        let diff = (dateNow.getTime() - dateLastCall.getTime()) / 1000
        diff /= (60 * 60)
        return Math.abs(Math.round(diff))
    }

    useEffect(() => {
        console.log('useEffect to set hours diff -> ')
        if (lastCall) {
            console.log('last call available -> ')
            setHoursDiff(hoursDiffCalc(currentTime, lastCall))
        } else {
            console.log('last call NOT available -> ')
            setHoursDiff(99)
        }

        console.log('Set hours diff -X')

    }, [])

    useEffect(() => {
        console.log('useEffect to call API -> ')

        if (hoursDiff) {

            console.log(`check hoursDiff state set in effect hook before = ${hoursDiff} -X `)

            if (hoursDiff >= 6) {
                console.log('hours diff is more than 6 hours, call API -> ')
                const coordinatesArr = coordinates.split(',')
                const lat = coordinatesArr[0]
                const lon = coordinatesArr[1]
                axios
                    .get(`${weatherUrl}lat=${lat}&lon=${lon}&exclude=${exclude}&units=metric&appid=${apiKey}`)
                    .then(response => {
                        console.log(`called API and received: ${response}`)

                        if (dateDiff > 1) {
                            console.log('event date is more than one day from now, use daily forecast -> ')
                            setWeatherData(response.data.daily[Math.round(dateDiff)])
                        } else {
                            console.log('event date is less than one day from now, use current forecast -> ')
                            setWeatherData(response.data.current)
                        }

                        console.log('Filled weatherData state -X')
                    })
            }
        }
        
    }, [hoursDiff])

    useEffect(() => {
        console.log('useEffect to set weather data states -> ')

        if (weatherData) {
            console.log('check weather data state is set -> ')

            console.log(weatherData)

            setIcon(`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`)
            setTemp(`${Math.round(weatherData.temp.day)} °C`)
            setDesc(weatherData.weather[0].description)
            setSunrise(`${getTimeFromUtc(weatherData.sunrise)}`)
            setSunset(`${getTimeFromUtc(weatherData.sunset)}`)
            setWind(`${weatherData.wind_speed} m/s`)

            console.log('Called all setter hooks -X')
        }

    }, [weatherData])

    useEffect(() => {
        console.log('useEffect to call Apollo mutation -> ')

        if (icon, temp, desc, sunrise, sunset, wind) {
            console.log('check states setted before after API call -> ')
        
            console.log(`currentTime=${currentTime} - icon=${icon} - temp=${temp} - desc=${desc} - sunrise=${sunrise} - sunset=${sunset} - wind=${wind}`)

            setWeather({
                variables: {
                    _id: id,
                    activityApiLastCall: currentTime,
                    activityWeatherIcon: icon,
                    activityWeatherTemp: temp,
                    activityWeatherDesc: desc,
                    activityWeatherSunrise: sunrise,
                    activityWeatherSunset: sunset,
                    activityWeatherWind: wind
                }
            })

            console.log('called apollo mutation -X')
        }

    }, [icon, temp, desc, sunrise, sunset, wind])

    return (
        <div className="-mt-5">
            <img className="w-20" src={icon ? icon : savedIcon} />
            <p className="-mt-6 text-center">{temp ? temp : savedTemp}</p>
        </div>
    )
}

export default Weather