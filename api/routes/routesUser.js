import UserDAO from "../DAO/UserDAO.js";
import {Router} from 'express'

const route=Router();
const {getAll,create,getById,update,deleteU}=new UserDAO()

route.get('/api/users/',(req,res)=>getAll(req,res));
route.post('/api/users/',(req,res)=>create(req,res));
route.get('/api/users/:id',(req,res)=>getById(req,res));
route.put('/api/users/:id',(req,res)=>update(req,res));
route.delete('/api/users/:id',(req,res)=>deleteU(req,res));



export default route;
