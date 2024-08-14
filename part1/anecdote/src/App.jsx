import { useState } from 'react'

const Button = ({text, onClick}) => {
    return (
        <>
            <button onClick={onClick}>{text}</button>
        </>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ];

    const [selected, setSelected] = useState(0);
    const [voteCount, setVoteCount] = useState(new Array(anecdotes.length).fill(0));

    const handleNext = () => {
        selected === anecdotes.length - 1 ? setSelected(0) : setSelected(selected + 1);
        // console.log(selected);
    }

    const handleVote = () => {
        const newVoteCount = [...voteCount];
        newVoteCount[selected]++;
        setVoteCount(newVoteCount);
    }

    return (
        <div>
            <h1>Anecdote of the Day</h1>
            {anecdotes[selected]} <br/>
            <p>this anecdote has {voteCount[selected]} votes</p><br/>
            <Button onClick={handleNext} text={'Next Anecdote'}/>
            <Button onClick={handleVote} text={'Vote'}/>
            <h1>Most voted anecdote</h1>
            <p>{anecdotes[voteCount.reduce((acc, el, idx, all)=>el>all[acc] ? idx : acc, 0)]}</p>
        </div>
    )
}

export default App

