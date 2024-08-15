import { useState, useEffect } from 'react'
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
    const searchResult = fullArr.filter(country => country.toLowerCase().includes(keyword.toLowerCase()))
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
                {searchResult.length===1 ? <CountryInfo country={searchResult[0]}/> : <></>}
            </div>
        )
    }

}

const CountryInfo = ({country}) => {
    return (
        <div>
            <p>{country}</p>
        </div>
    )
}

const App = () => {
    const [fullNameArr, setFullNameArr] = useState([]);
    useEffect(()=>{
        countriesService.getNameArr().then((res)=>setFullNameArr(res));
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
