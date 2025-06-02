import mongoose from "mongoose";

const LeaderboardSchema=new mongoose.Schema({
    quiz_id:{type:mongoose.Schema.Types.ObjectId,ref:'Quiz'},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    username:String,
    score:Number,
    last_updated:{type:Date,default:Date.now}
})

export default mongoose.model('Leaderboard',LeaderboardSchema)