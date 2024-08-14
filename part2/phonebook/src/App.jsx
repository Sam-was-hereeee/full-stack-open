import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '099999' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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
            {persons.map((person) => (<p key={person.name}>{person.name} {person.number}</p>))}
        </div>
    )
}

export default App