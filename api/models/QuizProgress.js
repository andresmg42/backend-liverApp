import mongoose from "mongoose";

const AnswerSchema=new mongoose.Schema({
    question_id:{type:mongoose.Schema.Types.ObjectId,ref:'Quiz'},
    zone:{type:String,required:true},
    correct:Boolean
});



const QuizProgressSchema= new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    quiz_id:{type:mongoose.Schema.Types.ObjectId,ref:'Quiz'},
    answers:[AnswerSchema],
    total_score:Number,
    completed:Boolean,
    timer:Number,
    last_updated:{type:Date,default:Date.now}

});

export default mongoose.model('QuizProgress',QuizProgressSchema)


