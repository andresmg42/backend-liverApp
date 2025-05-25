import ProgressDAO from "../DAO/ProgressDAO.js";
import { Router } from "express";


const routerprogress=Router()

const {save,getProgressById}=new ProgressDAO();

routerprogress.post('/api/progress/',(req,res)=>save(req,res));
routerprogress.get('/api/progress/:userId/:quizId',(req,res)=>getProgressById(req,res));

export default routerprogress;