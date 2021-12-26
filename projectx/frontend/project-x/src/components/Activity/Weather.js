import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ dateDiff, coordinates }) => {
    const [weather, setWeather] = useState()

    const apiKey = process.env.REACT_APP_OPENWEATHER_KEY
    const weatherUrl = 'https://https://api.openweathermap.org/data/2.5/onecall?q='
    const exclude = (dateDiff < 1) ? 'minutely,hourly,daily,alerts' : 'current,minutely,hourly,alerts'

    useEffect(() => {
        axios
            .get(``)
    })

    return (
        null
    )
}

export default Weather