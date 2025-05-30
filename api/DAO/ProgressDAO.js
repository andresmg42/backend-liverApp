import QuizProgress from "../models/QuizProgress.js";

class ProgressDAO {
  constructor() {
    this.model = QuizProgress;
  }

  saveProgress = async (userId, quizId, answersArray) => {
    const totalQuestions = answersArray.length;
    const score = answersArray.filter((a) => a.correct).length;

    const progress = await QuizProgress.findOne({
      user_id: userId,
      quiz_id: quizId,
    });

    

    if (progress) {
      progress.total_score += score
      progress.completed = totalQuestions===15;
      progress.last_updated = new Date();
      progress.answers=[...progress.answers,...answersArray];
      await progress.save();
    } else {
      const newProgress = new QuizProgress({
        user_id: userId,
        quiz_id: quizId,
        answers:answersArray,
        total_score: score,
        completed: totalQuestions===15,
      });
      await newProgress.save();
    }

    console.log("Progreso guardado");
  };

  save = async (req, res) => {
    try {

        const {user_id,quiz_id,answers}=req.body;

        console.log('user_id:',user_id)
        console.log('quiz_id:',quiz_id)

        await this.saveProgress(user_id,quiz_id,answers);

        res.status(201).json({message:'progreso guardado'});


    } catch (error) {
        res.status(500).json({message:`save progress Error: ${error}`})
    }
  };

  getProgressByUserId=async (req,res)=>{
    try {
        const {userId,quizId}=req.query;

        // console.log(typeof userId)
        // console.log(typeof quizId)

    const progress= await this.model.findOne({user_id:userId,quiz_id:quizId})
    // if(!progress){
    //     res.status(200).json({})
    //     return;
    // }
    res.status(200).json(progress)
    } catch (error) {
        res.status(500).json({message:`Error find progress by id: ${error}`})
        
    }

  }
}

export default ProgressDAO;

