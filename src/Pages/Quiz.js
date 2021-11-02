import React, { useState, useEffect } from 'react';



function Leaderboard() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [questions, setQuestions] = useState()
    const [qindex, setQindex] = useState(0)

    useEffect(() => {
        fetch("/Quiz")
            .then(res => res.json())
            .then(
                (data) => {
                    setQuestions(data.quiz_data);
                    console.log(data.quiz_data)
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                Hello
            </div>
        );
    }
}

export default Leaderboard;