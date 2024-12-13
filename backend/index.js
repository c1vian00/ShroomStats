import './dotenvConfig.js'
import express from 'express';
import championRoute from "./routes/championRoute.js";

const app = express();

app.use("/champions", championRoute);

app.use((req, res, next) => {
    res.send("Status 200")
});
app.listen(3001);