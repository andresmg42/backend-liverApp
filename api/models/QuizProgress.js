import mongoose from "mongoose";

const AnswerSchema=new mongoose.Schema({
    question_id:{type:mongoose.Schema.Types.ObjectId,ref:'Quiz'},
    selected_index:Number,
    correc:Boolean
});

const SectionProgressSchema= new mongoose.Schema({
    slug:String,
    score:Number,
    total_questions:Number,
    completed:Boolean,
    answers:[AnswerSchema]
});

const QuizProgressSchema= new mongoose.Schema({
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    quiz_id:{type:mongoose.Schema.Types.ObjectId,ref:'Quiz'},
    sections_progress:[SectionProgressSchema],
    total_score:Number,
    completed:Boolean,
    last_updated:{type:Date,default:Date.now}

});

export default mongoose.model('QuizProgress',QuizProgressSchema)


