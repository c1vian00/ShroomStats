import axios from "axios";

const DDRAGON_VERSION = "14.24.1"

const riotToken = process.env.RIOT_API_KEY;
const baseUrl = process.env.RIOT_API_URL;

async function getChampionMap() {
    const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/data/en_US/champion.json`)
    const championMap = {}
    for (const champion of Object.values(response.data.data)) {
        championMap[champion.key] = champion
    }
    return championMap
}

function convertToChampion(championId, championMap) {
    const champion = championMap[championId]
    return {
        id: championId,
        name: champion.name,
        pictureUrl: `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/` + champion.image.full,
        title: champion.title,
        blurb: champion.blurb,
    }
}

export async function listChampions(req, res, next) {
    try {
        const response = await axios.get(`${baseUrl}/lol/platform/v3/champion-rotations`, {
            headers: {
                accept: 'application/json',
                "X-Riot-Token": riotToken
            },
        });

        const { freeChampionIds } = response.data
        const championMap = await getChampionMap()
        const result = {
            champions: freeChampionIds.map(championId => convertToChampion(championId, championMap))
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Error finding champions', error);
        res.status(500).json({ error: 'Failed to fetch trending champions' });
    }
}