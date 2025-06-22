import LaderBoardDAO from "../DAO/LaderBoardDAO.js";
import { Router } from "express";

const routerlader=Router()

const {update_create,getLeaderBoard}=new LaderBoardDAO();

routerlader.get('/api/leaderboard/',(req,res)=>getLeaderBoard(req,res))
routerlader.put('/api/leaderboard/',(req,res)=>update_create(req,res))


export default routerlader;