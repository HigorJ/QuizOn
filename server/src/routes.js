import { Router } from 'express';

import UserController from './controllers/UserController.js';
import QuizController from './controllers/QuizController.js';
import QuestionsController from './controllers/QuestionController.js';
import AlternativesController from './controllers/AlternativeController.js';

const routes = Router();

routes.post('/getUser', UserController.show);
routes.post('/createUser', UserController.create);
routes.put('/updateUser/:id', UserController.update);
routes.delete('/deleteUser/:id', UserController.delete);

routes.get('/quizzes/:id?', QuizController.index);
routes.get('/quiz/:id', QuizController.show);
routes.post('/createQuiz', QuizController.create);
routes.put('/updateQuiz/:id', QuizController.update);
routes.delete('/deleteQuiz/:id', QuizController.delete);

routes.get('/quiz/:quiz_id/questions', QuestionsController.show);
routes.post('/quiz/:quiz_id/createQuestions', QuestionsController.create);
routes.put('/quiz/:quiz_id/:question_id', QuestionsController.update);
routes.delete('/quiz/:quiz_id/:question_id', QuestionsController.delete);

routes.get('/quiz/:quiz_id/questions/:question_id', AlternativesController.show);

export default routes;