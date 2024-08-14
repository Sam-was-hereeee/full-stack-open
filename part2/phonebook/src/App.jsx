import { useState, useEffect } from 'react'
import phonebookService from "./service/phonebook-service.jsx";

const SearchBar = ( {search, setSearch} ) => {
    return (
        <div>Search: <input type="text" value={search} onChange={(e) => {
            setSearch(e.target.value)}}/>
        </div>
    )
}

const AddPhoneField = ( {onSubmit, info} ) => {
    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={info.newName} onChange={(e) => {
                    info.setNewName(e.target.value);
                }}/>
                </div>
                <div>number: <input type='number' value={info.newNumber} onChange={(e) => {
                    info.setNewNumber(e.target.value)
                }}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

const PeopleDisplay = ({search, persons}) => {
    return (
        <>
            {persons.filter((el) => el.name.toLowerCase().includes(search.toLowerCase())).map((person) =>
                (<p key={person.name}>{person.name} {person.number}</p>))}
        </>

    )
}

const App = () => {
    useEffect(() => {
        phonebookService.getAll().then(res=>{setPersons(res);console.log(res)});

    }, []);
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3}
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');


    const infoAndSet = {
        newName: newName,
        newNumber: newNumber,
        setNewNumber: setNewNumber,
        setNewName: setNewName
    };

    const handleNewName = (e) => {
        e.preventDefault();
        if (persons.map(el=>el.name).includes(newName)) {
            alert(`${newName} is already in the book.`);
            return;
        }
        const newPersonObj = {
            name: newName,
            number: newNumber
        };

        phonebookService.add(newPersonObj).then(res=>{setPersons(persons.concat(res))});
        setNewName('');
        setNewNumber('');
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <SearchBar search={search} setSearch={setSearch}/>

            <AddPhoneField onSubmit={handleNewName} info={infoAndSet}/>
            <h2>Numbers</h2>
            <PeopleDisplay persons={persons} search={search}/>

        </div>
    )
}

export default App