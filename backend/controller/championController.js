import * as riotApi from '../api/riotApi.js'

const DDRAGON_VERSION = "14.24.1"

let championDataPromise
export async function getChampionMap() {
    if (!championDataPromise) {
        championDataPromise = riotApi.getChampionData()
    }
    const championData = await championDataPromise
    const championMap = {}
    for (const champion of Object.values(championData.data)) {
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

export function convertChampionMastery(championMastery, championMap) {
    return {
        level: championMastery.championLevel,
        points: championMastery.championPoints,
        lastPlayTime: championMastery.lastPlayTime,
        ...convertToChampion(championMastery.championId, championMap)
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