import ProgressDAO from "../DAO/ProgressDAO.js";
import { Router } from "express";


const routerprogress=Router()

const {save,getProgressByUserId}=new ProgressDAO();

routerprogress.post('/api/progress/',(req,res)=>save(req,res));
routerprogress.get('/api/progress/',(req,res)=>getProgressByUserId(req,res));

export default routerprogress;