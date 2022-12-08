import React, { useEffect, useState } from 'react'
import { team } from '../data/team'
import Score from './Score'


const Cards = () => {
    const [start, setStart] = useState(false)
    const [homeTeam, setHomeTeam] = useState('domicile')
    const [awayTeam, setAwayTeam] = useState('extérieur')
    const [homeflag, setHomeFlag] = useState('')
    const [awayflag, setAwayFlag] = useState('')
    //@ts-ignore
    const home = localStorage.getItem('home-team')
    //@ts-ignore
    const away = localStorage.getItem('away-team')
    //@ts-ignore
    const localHomeFlag = localStorage.getItem('home-flag')
    const localAwayFlag = localStorage.getItem('away-flag')

    const getHomeFlag = (value) => team.filter((val) => val.name == value).forEach(elem => {
        setHomeFlag(elem.flag)
    })
    const getAwayFlag = (value) => team.filter((val) => val.name == value).forEach(elem => {
        setAwayFlag(elem.flag)
    })

    const fakeData = [{
        team: {
            name: home || homeTeam,
            flag: "https://countryflagsapi.com/svg/fr",
            score: 0
        }
    },
    {
        team: {
            name: away || awayTeam,
            flag: "https://countryflagsapi.com/svg/gb-eng",
            score: 0
        }
    },
    ]

    const startMatch = () => {
        setStart(true)
    }
    const endMatch = () =>{
        setStart(false)
        localStorage.removeItem("home-score")
        localStorage.removeItem('away-score')
    }
    const handleHomeSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('home-team', homeTeam)
        localStorage.setItem('home-flag', homeflag)
    }

    const handleAwaySubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('away-team', awayTeam)
        localStorage.setItem('away-flag', awayflag)
    }

    const chooseHomeTeam = (e) => {
        setHomeTeam(e.target.value)
        getHomeFlag(homeTeam)
    }

    const chooseAwayTeam = (e) => {
        setAwayTeam(e.target.value)
        getAwayFlag(awayTeam)
    }

    useEffect(() => {
        getHomeFlag(homeTeam)
        getAwayFlag(awayTeam)
    }, [homeTeam, awayTeam])


    return (
        <>
            <div className='card-container'>

                <div className="team">
                    <div className="flag-container"><img className='flag' src={localHomeFlag} alt="flag" /></div>
                    <div className="team-name">{fakeData[0].team.name}</div>

                </div>
                {
                    !start && <p className='vs'>VS</p>
                }
                {
                    start &&
                    <Score scoreHome='0' scoreAway='0' />
                }
                <div className="team">
                    <div className="team-name">{fakeData[1].team.name}</div>
                    <div className="flag-container"><img className='flag' src={localAwayFlag} alt="flag" /></div>
                </div>
            </div>
            <div className="button-container">
               
                <div className='select-container'>
                    <form onSubmit={(e) => { handleHomeSubmit(e) }}>
                        <label htmlFor="home_team">équipe domicile</label>
                        <select name="home_team" onChange={(e) => chooseHomeTeam(e)}>
                            {
                                team.map(country => (
                                    <option key={country.name} value={country.name}>{country.name}</option>
                                ))
                            }
                        </select>
                        <button type="submit">valider</button>
                    </form>
                    <form onSubmit={(e) => { handleAwaySubmit(e) }}>
                        <label htmlFor="away_team">équipe extérieure</label>
                        <select name="away_team" onChange={(e) => chooseAwayTeam(e)}>
                            {
                                team.map(country => (
                                    <option key={country.name} value={country.name}>{country.name}</option>
                                ))
                            }
                        </select>
                        <button type="submit">valider</button>
                    </form>
                </div>
                {
                    !start && <button onClick={startMatch} className="start-match">coup d'envoi</button>
                }
                {
                    start && <button onClick={endMatch} className="start-match">fin du match</button>
                }
            </div>
        </>
    )
}

export default Cards
