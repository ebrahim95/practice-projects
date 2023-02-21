import axios from 'axios'
import { useState, useEffect } from 'react'

const WeatherData = ({ country }) => {
    const [weather, setWeatherData] = useState([])

    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`)
        .then(response => setWeatherData(response.data))
    }, [])

    return (
    <>
      { weather.main ? ( <div className='p-1'>
            <h2 className='text-lg'>Weather in {country.capital}</h2>
            <img alt="weather code" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <p>Temperature {weather.main.temp} F</p>
            <p>Wind Speed {weather.wind.speed} mph</p>
        </div>) : null}
    </>
    )
    
}

export default WeatherData