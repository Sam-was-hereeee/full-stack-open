import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [search, setSearch] = useState('');

    const handleNewName = (e) => {
        e.preventDefault();
        if (persons.map(el=>el.name).includes(newName)) {
            alert(`${newName} is already in the book.`);
            return;
        }
        const newPersonObj = {
            name: newName,
            number: newNumber,
            id: persons.reduce((acc, el) =>
                el.id>acc ? el.id+1 : acc)
        };
        setPersons(persons.concat(newPersonObj));
        setNewName('');
        setNewNumber('');
    }

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <div>Search: <input type="text" value={search} onChange={(e) => {
                setSearch(e.target.value)
            }}/></div>

            <form onSubmit={handleNewName}>
                <div>
                name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>number: <input type='number' value={newNumber} onChange={(e) =>
                {setNewNumber(e.target.value)}}/></div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.filter((el)=>el.name.toLowerCase().includes(search)).map((person) => (<p key={person.name}>{person.name} {person.number}</p>))}
        </div>
    )
}

export default App