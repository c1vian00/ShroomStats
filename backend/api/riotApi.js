import axios from "axios";

const DDRAGON_VERSION = "14.24.1"

const riotToken = process.env.RIOT_API_KEY;
const lolBaseUrl = process.env.LOL_API_URL;
const riotBaseUrl = process.env.RIOT_API_URL;

if (!riotToken) {
    throw Error('RIOT_API_KEY should be defined in your .env file or as an environment variable')
}

export async function getChampionData() {
    const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/data/en_US/champion.json`)
    return response.data
}

export async function getFreeChampionRotation() {
    const response = await axios.get(`${lolBaseUrl}/lol/platform/v3/champion-rotations`, {
        headers: {
            accept: 'application/json',
            "X-Riot-Token": riotToken
        },
    });
    return response.data
}

export async function getSummoner(gameName, tagLine) {
    const response = await axios.get(`${riotBaseUrl}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`, {
        headers: {
            accept: 'application/json',
            "X-Riot-Token": riotToken
        },
    });
    return response.data
}

export async function getChampionMasteries(puuid) {
    const response = await axios.get(`${lolBaseUrl}/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`, {
        headers: {
            accept: 'application/json',
            "X-Riot-Token": riotToken
        },
    });
    return response.data
}