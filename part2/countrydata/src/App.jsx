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

const CountryResult = () => {}

const App = () => {
    const [fullNameArr, setFullNameArr] = useState([])
    useEffect(()=>{
        countriesService.getNameArr().then((res)=>setFullNameArr(res))
    }, [])
    const [search, setSearch] = useState('')
    return (
      <div>
          <CountrySearch search={search} setSearch={setSearch}/>
          <CountryResult keyword={search} fullArr={fullNameArr}/>
      </div>
    )
}

export default App
