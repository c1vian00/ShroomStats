import dotenv from "dotenv";
import express from 'express';
import championRoute from "./routes/championRoute.js";

dotenv.config();

const app = express();

app.use("/champions", championRoute);

app.use((req, res, next) => {
    res.send("Status 200")
});
app.listen(3001);