import { useState } from 'react'

const Button = ({ handleClick, text}) => {
    return (
        <>
            <button onClick={handleClick}>{text}</button>
        </>
    )
};

const Result = ({name, count}) => {
    return (
        <>
            <p>{name} {count}</p>
        </>
    )
}

const Statistics = ({review}) => {
    const getReviewSum = () => Object.values(review)
        .reduce((acc, current) => {return acc+current;}, 0);

    const getAverageReview = () => (review.good - review.bad)/getReviewSum();
    return (
        <>
            <h1>statistics</h1>
            <Result name={'good'} count={review.good}/>
            <Result name={'neutral'} count={review.neutral}/>
            <Result name={'bad'} count={review.bad}/>
            <Result name={"all"} count={getReviewSum()}/>
            <Result name={'average'} count={getAverageReview()}/>
            <Result name={'positive'} count={review.good / getReviewSum()}/>
        </>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [review, setReview] = useState({
        good: 0, neutral: 0, bad:0
    });

    const addReview = (reviewType) => {
        const newReview = Object.assign({}, review);
        newReview[reviewType] += 1;
        setReview(newReview);
    };



    return (
        <>
            <h1>give feedback</h1>
            <Button handleClick={()=>addReview('good')} text={"good"} />
            <Button handleClick={()=>{addReview('neutral')}} text={'neutral'}/>
            <Button handleClick={()=>{addReview('bad')}} text={'bad'}/>
            <Statistics review={review} />
        </>
    )
}

export default App