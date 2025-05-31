import QuizProgress from "../models/QuizProgress.js";

class ProgressDAO {
  constructor() {
    this.model = QuizProgress;
  }

  save = async (req, res) => {
    try {
      const progress = req.body;

      console.log("user_id:", progress.user_id);
      console.log("quiz_id:", progress.quiz_id);

      const oldProgress = await QuizProgress.findOne({
        user_id: progress.user_id,
        quiz_id: progress.quiz_id,
      });

      if (oldProgress) {
        oldProgress.total_score = progress.total_score;
        oldProgress.completed = progress.completed;
        oldProgress.last_updated = progress.last_updated;
        oldProgress.answers = progress.answers;
        await oldProgress.save();
      } else {
        const newProgress = new QuizProgress(progress);
        await newProgress.save();
      }
      res.status(201).json({ message: "progreso guardado" });
    } catch (error) {
      res.status(500).json({ message: `save progress Error: ${error}` });
    }
  };

  getProgressByUserId = async (req, res) => {
    try {
      const { userId, quizId } = req.query;

      const progress = await this.model.findOne({
        user_id: userId,
        quiz_id: quizId,
      });
      res.status(200).json(progress);
    } catch (error) {
      res.status(500).json({ message: `Error find progress by id: ${error}` });
    }
  };
}

export default ProgressDAO;
