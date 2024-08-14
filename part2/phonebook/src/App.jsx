import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const handleNewName = (e) => {
        e.preventDefault();
        const newPersonObj = {
            name: newName
        };
        setPersons(persons.concat(newPersonObj));
        setNewName('');
    }

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleNewName}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => (<p key={person.name}>{person.name}</p>))}
        </div>
    )
}

export default App