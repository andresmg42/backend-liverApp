import Leaderboard from "../models/Leaderboard.js";
import QuizProgress from "../models/QuizProgress.js";
import User from "../models/User.js";

class LaderBoardDAO{
    constructor(){
        this.model=Leaderboard;
    }

    update_create= async  (req,res)=>{
        try {
            const {quiz_id,user_id}=req.body;
            const progresses= await QuizProgress.find({quiz_id:quiz_id,user_id:user_id}).sort({total_score:-1});
            if(progresses.length===0){
                res.status(404).json({message:'progresses not found'});
                return;
            }

            for(let i=0; i<progresses.length;i++){
                const progress=progresses[i];
                const user= await User.findById(progress.user_id);
                await this.model.findOneAndUpdate(
                    {quiz_id:quiz_id, user_id:progress.user_id},
                    {
                        quiz_id:quiz_id,
                        user_id:progress.user_id,
                        username:user.displayName,
                        score:progress.total_score,
                        rank:i+1,
                        last_updated:new Date()
                    },
                    {upsert:true,new:true}
                );
            }

            res.status(200).json({message:'Laderboard updated succesfully'})
        } catch (error) {
            res.status(500).json({message:`Error updating Leaderboard: ${error}`})
            
        }
    }

    getLeaderBoard= async (req,res)=>{
        try {
            const leaderboard= await this.model.find();

            res.status(200).json(leaderboard);
            
        } catch (error) {
            res.status(500).json({message:error})
            
        }
    }

}

export default LaderBoardDAO;