import {useEffect, useState} from 'react'
import countriesService from './service/restCountriesAPI.jsx'
import './App.css'
import './index.css'


const CountrySearch = ( {search, setSearch} ) => {
    return (
        <>
            <p>find country: </p>
            <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
        </>
    )
}

const CountryResult = ({keyword,fullArr}) => {
    const searchResult = fullArr.filter(country => country.toLowerCase().includes(keyword.toLowerCase()));
    const [shownCountry, setShownCountry] = useState(null);
    const [countryInfo, setCountryInfo] = useState({});
    const [weather, setWeather] = useState({});

    useEffect(()=>{ console.log('in fetch country hook');
        if (shownCountry){
            countriesService.getOneCountry(shownCountry).then(el=>{setCountryInfo(el)})
                .catch((error)=>{console.log(error)})
    }},[shownCountry])
    useEffect(()=>{
        if (Object.keys(countryInfo).length){
            countriesService.getWeather(countryInfo.capitalInfo.latlng[0],countryInfo.capitalInfo.latlng[1])
                .then((res)=>{
                    console.log('fetching weather');
                    setWeather(res);
                });
        }
    }, [countryInfo]);

    const handleShow = (name) => {
        setShownCountry(name);
    }

    if (searchResult.length===1 && shownCountry!==searchResult[0]){setShownCountry(searchResult[0])}
    if (!keyword) {
        return (
            <div>Start searching by typing into the search bar</div>
        )
    }
    if (!searchResult) {
        return (
            <div>No match</div>
        )
    }
    if (searchResult.length>10) {
        return (
            <div>
                too many matches! please specify country
            </div>)
    }
    if (searchResult) {
        return (
            <div>
                {searchResult.length===1 ? null : searchResult.map((name) => <Result key={name} name={name} onShow={handleShow} />)}
                {shownCountry ? <CountryInfo countryInfo={countryInfo} countryName={shownCountry} weather={weather} /> : <></>}
            </div>
        )
    }

}

const Result = ({name, onShow}) => {
    return (
        <div>
            <p>{name}</p>
            <button onClick={()=>{onShow(name)}}>Show</button>
        </div>
    )
}

const CountryInfo = ({countryName, countryInfo, weather}) => {
    if (!Object.keys(countryInfo).length) {
        console.log('no info')
        return null;
    }
    console.log(countryInfo);
    return (
        <div>
            <h1>{countryName}</h1>
            <p>Capital: {countryInfo.capital[0]}</p>
            <p>Population: {countryInfo.population}</p>
            <p><strong>languages:</strong></p>
            <ul>
                {Object.values(countryInfo.languages).map(language => (<li key={language}>{language}</li>))}
            </ul>
            <img className={'flag'} src={countryInfo.flags.svg} alt={countryInfo.flags.alt}/>
            <WeatherInfo weather={weather} countryName={countryName}/>
        </div>
    );
}

const WeatherInfo = ({weather, countryName}) => {
    console.log(weather)
    if (!Object.keys(weather).length) {
        console.log('no weather info')
        return <div>Loading Weather...</div>;
    }
    console.log(weather);
    return (
        <div>
            <h1>Weather in {countryName}</h1>
            <p>temperature: {weather.main.temp} Kelvin</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
            <p>wind: {weather.wind.speed}</p>
        </div>
    )
}


const App = () => {
    console.log('rendering app')
    const [fullNameArr, setFullNameArr] = useState([]);
    useEffect(()=>{
        console.log('started fetching full list')
        countriesService.getNameArr().then((res)=>{
            setFullNameArr(res);
            console.log('full list retrieved', res)});
    }, []);
    const [search, setSearch] = useState('');
    if (!fullNameArr.length) {
        return <div>Loading...</div>;
    }
    return (
      <div>
          <CountrySearch search={search} setSearch={setSearch}/>
          <CountryResult keyword={search} fullArr={fullNameArr}/>
      </div>
    )
}

export default App
