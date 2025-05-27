import QuizProgress from "../models/QuizProgress.js";

class ProgressDAO {
  constructor() {
    this.model = QuizProgress;
  }

  saveProgress = async (userId, quizId, sectionSlug, answersArray) => {
    const totalQuestions = answersArray.length;
    const score = answersArray.filter((a) => a.correct).length;

    const progress = await QuizProgress.findOne({
      user_id: userId,
      quiz_id: quizId,
    });

    const sectionProgress = {
      slug: sectionSlug,
      score,
      total_questions: totalQuestions,
      completed: true,
      answers: answersArray,
    };

    if (progress) {
      const index = progress.sections_progress.findIndex(
        (s) => s.slug === sectionSlug
      );
      if (index >= 0) {
        progress.sections_progress[index] = sectionProgress;
      } else {
        progress.sections_progress.push(sectionProgress);
      }

      progress.total_score = progress.sections_progress.reduce(
        (sum, s) => sum + s.score,
        0
      );
      progress.completed = progress.sections_progress.every((s) => s.completed);
      progress.last_updated = new Date();
      await progress.save();
    } else {
      const newProgress = new QuizProgress({
        user_id: userId,
        quiz_id: quizId,
        sections_progress: [sectionProgress],
        total_score: score,
        completed: true,
      });
      await newProgress.save();
    }

    console.log("Progreso guardado");
  };

  save = async (req, res) => {
    try {

        const {user_id,quiz_id,section_slug,answers}=req.body;

        console.log('user_id:',user_id)
        console.log('quiz_id:',quiz_id)

        await this.saveProgress(user_id,quiz_id,section_slug,answers);

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
    if(!progress){
        res.status(400).json({message:'progress not found'})
        return;
    }
    res.status(200).json(progress)
    } catch (error) {
        res.status(500).json({message:`Error find progress by id: ${error}`})
        
    }

  }
}

export default ProgressDAO;

