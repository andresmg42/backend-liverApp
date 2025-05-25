import { preguntas_prueva } from "./preguntas_pruevas.js";
import ProgressDAO from "./api/DAO/ProgressDAO.js";

const quiz=new ProgressDAO();

const {user_id,quiz_id,section_slug,answers}=preguntas_prueva;

quiz.saveProgress(user_id,quiz_id,section_slug,answers)
