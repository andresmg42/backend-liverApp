import LaderBoardDAO from "../DAO/LaderBoardDAO.js";
import { Router } from "express";

const routerlader=Router()

const {update_create}=new LaderBoardDAO();

routerlader.put('/api/leaderboard/',(req,res)=>update_create(req,res))

export default routerlader;