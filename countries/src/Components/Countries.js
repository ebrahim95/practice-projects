import { useState } from 'react'
import WeatherData from './WeatherData'


const CountryData = ({country}) => {
    
    const languages = Object.values(country.languages)
    return (
        <div className='mt-3'>
            <img alt='flags' src={country.flags.png} />
            <div className='mt-1 border-b-2 border-black p-1'>
                <h2 className='text-lg captialize'>{country.name.common}</h2>
                <p> Capital {country.capital}
                    <br />
                    Area {country.area}
                </p>

                <h3>Languages: </h3>
                <ul className='list-disc pl-10'>
                    {languages.map(language => <li key={language}>{language}</li>)}
                </ul>
            </div>
            <WeatherData country={country} />
        </div>
    )
}

const Countries = ({ country, filteredCountries }) => {
    const [ show, setShow ] = useState(false)
    const viewDetails = () => {
        setShow(!show)
    }


    if (filteredCountries.length === 1) {
        return <div><CountryData country={filteredCountries[0]} /></div>
    }

    return (
        <div>
            <div className="px-2 mt-1 flex justify-between "  key={country.name.official}>
                    <span className='grow p-1 border-2 text-slate-700 bg-rose-200 border-slate-600'>{country.name.common}</span>
                    <button className="px-2 text-white bg-blue-400 p-1 border-2 border-blue-600 rounded-r-lg"  onClick={viewDetails}>{show ? "Hide" : "View"}</button>
            </div>
                    {show ? <CountryData country={country} />: null}
        </div>
    )
}

export default Countries