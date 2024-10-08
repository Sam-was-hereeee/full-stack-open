import { useState, useEffect } from 'react'
import phonebookService from "./service/phonebook-service.jsx";
import styles from "./styling/topMessage.module.css"
import "./main.css"

const TopMessage = ({msg, mode}) => {
    return (
        <>
            <div className={`${styles.topMessage} ${styles[mode]}`}>
                <p className={styles.content}>{msg}</p>
            </div>
        </>
    )
}

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
                }} required/>
                </div>
                <div>number: <input type='number' value={info.newNumber} onChange={(e) => {
                    info.setNewNumber(e.target.value)
                }} required/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

const Person = ({person, delFunc}) => {

    return (
        <div className={'person'}>
            <p key={person.name}>{person.name} {person.number}</p>
            <button onClick={()=>{delFunc(person)}}>Delete</button>
        </div>
    )
}

const PeopleDisplay = ({search, persons, delFunc}) => {
    return (
        <>
            {persons.filter((el) => el.name.toLowerCase().includes(search.toLowerCase())).map((person) =>
                (<Person key={person.name} person={person} delFunc={delFunc}/>))}
        </>

    )
}

const App = () => {
    useEffect(() => {
        phonebookService.getAll().then(res=>{setPersons(res);console.log(res)});
    }, []);
    const temporaryTopMsg = (msg, mode='normal') => {
        setTopMsg({msg: msg, mode: mode});
        setTimeout(()=> {setTopMsg({msg: defaultMsg, mode:'normal'})},5000)
    }
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3}
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');
    const defaultMsg = "Welcome to the phonebook";
    const [topMsg, setTopMsg] = useState({msg:defaultMsg, mode:'normal'});


    const infoAndSet = {
        newName: newName,
        newNumber: newNumber,
        setNewNumber: setNewNumber,
        setNewName: setNewName
    };

    const onNewName = (e) => {
        e.preventDefault();
        const oldPerson = persons.find(person => person.name === newName)
        if (oldPerson) {
            // if user decides to replace number, updates server and content
            if (window.confirm(`${newName} is already in the book, replace the number?`)) {
            phonebookService.update(oldPerson.id, {...oldPerson, number: newNumber})
                .then(res => {setPersons(persons.map(person => person.id===oldPerson.id ? res : person))})
                .then(()=>{temporaryTopMsg(`updated ${oldPerson.name}`)})
            }
            return;
        }
        const newPersonObj = {
            name: newName,
            number: newNumber
        };

        phonebookService.add(newPersonObj)
            .then(res=>{setPersons(persons.concat(res))})
            .then(()=>{temporaryTopMsg(`added ${newPersonObj.name}`)});
        setNewName('');
        setNewNumber('');
    }

    const onDelete = (person) => {
        if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
            phonebookService.delAndReturnAll(person.id).then(res=>{setPersons(res)})
                .then(()=>{temporaryTopMsg(`deleted ${person.name}`)})
                .catch(()=>{
                    phonebookService.getAll().then(res=>{setPersons(res);console.log(res)});
                    temporaryTopMsg(`${person.name} already deleted`, 'error');
                });
        }
    }

    return (
        <div className="App">
            <TopMessage msg={topMsg.msg} mode={topMsg.mode}/>
            <h2>Phonebook</h2>
            <SearchBar search={search} setSearch={setSearch}/>

            <AddPhoneField onSubmit={onNewName} info={infoAndSet}/>
            <h2>Numbers</h2>
            <PeopleDisplay delFunc={onDelete} persons={persons} search={search}/>

        </div>
    )
}

export default App