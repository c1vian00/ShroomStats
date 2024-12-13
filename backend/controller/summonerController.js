import * as riotApi from '../api/riotApi.js'

export async function getSummoner(req, res, next) {
    try {
        const { gameName, tagLine } = req.params
        const summoner = await riotApi.getSummoner(gameName, tagLine)
        res.status(200).json({
            gameName: summoner.gameName,
            tagLine: summoner.tagLine?.trim()
        });
    } catch (error) {
        console.error('Error finding champions', error);
        res.status(500).json({ error: 'Failed to get summoner' });
    }
}