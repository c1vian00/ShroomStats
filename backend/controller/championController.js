import axios from "axios";

const riotToken = process.env.RIOT_API_KEY;
const baseUrl = process.env.RIOT_API_URL;

export async function listChampions(req, res, next) {
    try {
        const response = await axios.get(`${baseUrl}/lol/platform/v3/champion-rotations`, {
            headers: {
                accept: 'application/json',
                "X-Riot-Token": riotToken
            },
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error finding champions', error);
        res.status(500).json({ error: 'Failed to fetch trending movies' });
    }
}