import Quiz from '../models/Quiz.js'

class QuizDao {
    constructor(){
        this.model=Quiz
    }

    create=async (req,res)=>{
        try {
            const document= new this.model(req.body)
            await document.save()

            res.status(201).json(document)
        } catch (error) {
            res.status(500).json({message:error})
            
        }
    }

    getAll=async (req,res)=>{
        try {
            const items= await this.model.find()
        res.status(200).json(items)
        } catch (error) {
            res.status(500).json({message:`Error fetching document:${error}`})
        }

    }

    getById= async (req,res)=>{
        try {
            const item=await this.model.findById(req.params.id)
            if(!item){
                res.status(400).json('quiz not found')
                return
            }
            res.status(200).json(item)
        } catch (error) {
            res.status(500).json({message:error})
            
        }
    }


}

export default QuizDao;