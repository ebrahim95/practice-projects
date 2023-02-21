import { useState, useEffect } from "react";
import axios from 'axios'
import Filter from "./Components/Filter";
import Country from "./Components/Countries";

function App() {
  const [ countries , setCountries ]  = useState([])
  const [ filter, setFilter ] = useState(null)
  
  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => setCountries(response.data))
  }, [])


  let filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter))

  if ( (filteredCountries.length >= 2) && (filteredCountries.length <= 3)){
    for (let country of filteredCountries) {
      if (country.name.common.length === filter.length) {
        filteredCountries = [country]
      }
  }}

  if (filter === "") {
    setFilter(null)
  }



  return (
   <div className="container mx-auto p-8 flex flex-col items-center">
    <h1 className="text-xl mb-5">Country Information Finder</h1>
    <Filter setFilter={setFilter}/>
    {filteredCountries.length > 10 
    ? <div>Too many mates, specify another filter</div>  
    : 
    <div>
      {filteredCountries.map( country => <Country
      key={country.name.official} 
      country={country} 
      filteredCountries={filteredCountries}/> )}
    </div>}
   </div>
  );
}

export default App;
