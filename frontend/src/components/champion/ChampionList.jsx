import axios from 'axios';
import {useEffect, useState} from "react";
import ChampionCard from './ChampionCard.jsx'

export default function ChampionList() {
    const [champions, setChampions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            async function fetchChampions() {
                try {
                    const response = await axios.get("http://localhost:3001/champions")
                    //const response = await axios.get("http://localhost:3001/summoners/Faker/T1")
                    setChampions(response.data.champions)
                } finally {
                    setLoading(false)
                }
            }
            fetchChampions()
        }, []
    )
    if (loading) {
        return <div>Loading...</div>
    }
    return <div>
        {champions.map(champion => <ChampionCard key={champion.id} champion={champion}/>)}
    </div>
}