import * as riotApi from '../api/riotApi.js'

const DDRAGON_VERSION = "14.24.1"

async function getChampionMap() {
    const response = await riotApi.getChampionData()
    const championMap = {}
    for (const champion of Object.values(response.data)) {
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
        const { freeChampionIds } = await riotApi.getFreeChampionRotation()
        const championMap = await getChampionMap()
        const result = {
            champions: freeChampionIds.map(championId => convertToChampion(championId, championMap))
        }
        res.status(200).json(result);
    } catch (error) {
        console.error('Error finding champions', error);
        res.status(500).json({ error: 'Failed to list champions' });
    }
}