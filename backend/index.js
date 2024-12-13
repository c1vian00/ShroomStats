import './dotenvConfig.js'
import express from 'express';
import championRoute from "./routes/championRoute.js";
import summonerRoute from "./routes/summonerRoute.js";

const app = express();

app.use("/champions", championRoute);
app.use("/summoners", summonerRoute);

app.use((req, res, next) => {
    res.send("Status 200")
});
app.listen(3001);