import QuizDao from '../DAO/QuizDAO.js';
import {Router} from 'express'

const quizroute=Router();
const {getAll,create,getById}= new QuizDao();

quizroute.get('/api/quiz/',(req,res)=>getAll(req,res));
quizroute.post('/api/quiz/',(req,res)=>create(req,res));
quizroute.get('/api/quiz/:id',(req,res)=>getById(req,res));

export default quizroute;