import * as riotApi from '../api/riotApi.js'
import { convertChampionMastery, getChampionMap } from "./championController.js";
import _ from 'lodash'

export async function getSummoner(req, res, next) {
    try {
        const { gameName, tagLine } = req.params
        const summoner = await riotApi.getSummoner(gameName, tagLine)
        const championMasteries = await riotApi.getChampionMasteries(summoner.puuid)
        const championData = await getChampionMap()
        const champions = championMasteries.map(championMastery => convertChampionMastery(championMastery, championData))
        const sortedChampions = _.orderBy(champions, ['level', 'points', 'name'], ['desc', 'desc', 'asc'])
        res.status(200).json({
            gameName: summoner.gameName,
            tagLine: summoner.tagLine?.trim(),
            champions: sortedChampions
        });
    } catch (error) {
        console.error('Error finding champions', error);
        res.status(500).json({ error: 'Failed to get summoner' });
    }
}