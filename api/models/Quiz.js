import mongoose from "mongoose";

const QuestionSchema=new mongoose.Schema({
    title:{type:String,required:true},
    zone:{type:String,required:true},
    image:{type:String,required:true},
    color:{type:String,required:true}
});


const QuizSchema=new  mongoose.Schema({
    title:{type:String,required:true},
    questions:[QuestionSchema],
    created_at:{type:Date,default:Date.now},
    updated_at:{type:Date,default:Date.now}
})

export default mongoose.model('Quiz',QuizSchema)