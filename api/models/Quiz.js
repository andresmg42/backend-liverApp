import mongoose from "mongoose";

const QuestionSchema=new mongoose.Schema({
    text:{type:String,required:true},
    options:[String],
    correct_option_index:{type:Number,required:true}
});

const SectionSchema=new mongoose.Schema({
    title:{type:String,required:true},
    slug:{type:String,required:true},
    questions:[QuestionSchema]
})

const QuizSchema=new  mongoose.Schema({
    title:{type:String,required:true},
    sections:[SectionSchema],
    created_at:{type:Date,default:Date.now},
    updated_at:{type:Date,default:Date.now}
})

export default mongoose.model('Quiz',QuizSchema)