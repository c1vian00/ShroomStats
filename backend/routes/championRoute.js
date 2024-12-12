import express from "express";
import {listChampions} from "../controller/championController.js";

const router = express.Router();

router.get("/", listChampions);

export default router;