import React, { useEffect, useState } from 'react'

const Score = (props) => {
    const [homeScore, setHomeScore] = useState(0);
    const [awayScore, setAwayScore] = useState(0);
    const localHomeScore = localStorage.getItem('home-score')
    const localAwayScore = localStorage.getItem('away-score')


    const addGoalHome = () => {
        let score;
        if (localHomeScore != null) {
            score = parseInt(localHomeScore)
        }
        else {
            score = 0
        }

        const newScore = score + 1
        setHomeScore(newScore)
        localStorage.setItem('home-score', newScore)
    }
    const addGoalAway = () => {
        let score;
        if (localAwayScore != null) {
            score = parseInt(localAwayScore)
        }
        else {
            score = 0
        }
        const newScore = score + 1
        setAwayScore(newScore)
        localStorage.setItem('away-score', newScore)
    }


    useEffect(() => {
        localStorage.setItem('home-score', homeScore)
        localStorage.setItem('away-score', awayScore)
    }, [])

    return (
        <>
            <div className='score'>
                <span className='team-score'>{localHomeScore}</span>
                <span className="separator team-score">-</span>
                <span className='team-score'>{localAwayScore}</span>
            </div>
            <div className="button-container button-score">
                <button className="btn-goal" onClick={addGoalHome}> But domicile</button>
                <button className="btn-goal" onClick={addGoalAway}>But extérieure</button>
            </div>
        </>
    )
}

export default Score
