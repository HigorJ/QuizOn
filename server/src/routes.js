import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multerConfig.js';

import AuthController from './controllers/AuthController.js';
import UserController from './controllers/UserController.js';
import QuizController from './controllers/QuizController.js';
import QuestionsController from './controllers/QuestionController.js';
import AlternativesController from './controllers/AlternativeController.js';
import MailerController from './controllers/MailerController.js';

var upload = multer({ storage: multerConfig });

const routes = Router();

routes.post('/login', AuthController.login);
routes.put('/changePassword', AuthController.changePassword)

routes.get('/getUsers', UserController.index);
routes.get('/getUser/:user_id', UserController.show);
routes.post('/createUser', upload.single('user_photo'), UserController.create);
routes.put('/updateUser/:id', upload.single('user_photo'), UserController.update);
routes.delete('/deleteUser/:id', UserController.delete);

routes.get('/quizzes/:id?', QuizController.index);
routes.get('/quiz/:id', QuizController.show);
routes.post('/createQuiz', upload.single('quiz_photo'), QuizController.create);
routes.put('/updateQuiz/:id', upload.single('quiz_photo'), QuizController.update);
routes.delete('/deleteQuiz/:id', QuizController.delete);

routes.get('/quiz/:quiz_id/questions', QuestionsController.show);
routes.post('/quiz/:quiz_id/createQuestions', QuestionsController.create);
routes.put('/quiz/:quiz_id/:question_id', QuestionsController.update);
routes.delete('/quiz/:quiz_id/:question_id', QuestionsController.delete);

routes.get('/quiz/:quiz_id/questions/:question_id', AlternativesController.show);

routes.post('/forgotPassword', MailerController.create);
routes.post('/resetPassword/:token', MailerController.update);

export default routes;