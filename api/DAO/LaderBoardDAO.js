import Leaderboard from "../models/Leaderboard.js";
import QuizProgress from "../models/QuizProgress.js";
import User from "../models/User.js";

class LaderBoardDAO{
    constructor(){
        this.model=Leaderboard;
    }

    update_create= async  (req,res)=>{
        try {
            const {quiz_id,user_id,time}=req.body;
            const progress= await QuizProgress.findOne({quiz_id:quiz_id,user_id:user_id});
            if(!progress){
                res.status(404).json({message:'progress not found'});
                return;
            }

            


                const user= await User.findById(progress.user_id);

                function formatTime(time){
                    const seconds=Math.floor(time/1000)
                    const miliseconds=time%1000
                    const minutes=Math.floor(seconds/60)
                    const remainSeconds=seconds%60
                    

                    return `${minutes} m :${remainSeconds} s :${miliseconds} ms`
                }

                const newLeader=await this.model.findOneAndUpdate(
                    {quiz_id:quiz_id, user_id:progress.user_id},
                    {
                        quiz_id:quiz_id,
                        user_id:progress.user_id,
                        username:user.displayName,
                        score:progress.total_score,
                        total_score:progress.total_score*100 - progress.timer*0.0001 + Math.random(),
                        last_updated:new Date(),
                        time:formatTime(progress.timer)
                    },
                    {upsert:true,new:true}
                );
            

            res.status(200).json(newLeader)
        } catch (error) {
            res.status(500).json({message:`Error updating Leaderboard: ${error}`})
            
        }
    }

    getLeaderBoard= async (req,res)=>{
        try {
            const leaderboard= await this.model.find().sort({total_score:-1});



            res.status(200).json(leaderboard);
            
        } catch (error) {
            res.status(500).json({message:error})
            
        }
    }

}

export default LaderBoardDAO;