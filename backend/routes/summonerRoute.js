import express from "express";
import {getSummoner} from "../controller/summonerController.js";

const router = express.Router();

router.get("/:gameName/:tagLine", getSummoner);

export default router;