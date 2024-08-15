import {useEffect, useState} from 'react'
import countriesService from './service/restCountriesAPI.jsx'


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
    const [countryInfo, setCountryInfo] = useState({});
    useEffect(()=>{if (searchResult.length===1) {
        countriesService.getOneCountry(searchResult[0]).then(el=>{setCountryInfo(el)})}},[searchResult])
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
                {searchResult.map((name) => <p key={name}>{name}</p>)}
                {searchResult.length===1 ? <CountryInfo countryInfo={countryInfo} countryName={searchResult[0]}/> : <></>}
            </div>
        )
    }

}

const CountryInfo = ({countryName, countryInfo}) => {
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
        </div>
    );
    }


const App = () => {
    const [fullNameArr, setFullNameArr] = useState([]);
    useEffect(()=>{
        countriesService.getNameArr().then((res)=>{
            setFullNameArr(res);
            console.log('full list retrieved', res)});
    }, []);
    const [search, setSearch] = useState('');
    return (
      <div>
          <CountrySearch search={search} setSearch={setSearch}/>
          <CountryResult keyword={search} fullArr={fullNameArr}/>
      </div>
    )
}

export default App
