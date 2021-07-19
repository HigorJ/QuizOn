import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Lobby from './pages/Lobby';
import Profile from './pages/Profile';
import QuizzesList from './pages/QuizzesList';
import QuizInfo from './pages/QuizInfo';
import PreparationPage from './pages/PreparetionPage';
import Quiz from './pages/Quiz';
import CreateRoom from './pages/CreateRoom';
import CreateQuiz from './pages/CreateQuiz';
import CreateQuestions from './pages/CreateQuestions';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/lobby" exact component={Lobby} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/quizzes/:title" exact component={QuizzesList} />
        <Route path="/quizzes/all/:id" exact component={QuizInfo} />
        <Route path="/quizzes/all/:id/:room/waiting-participants" exact component={PreparationPage} />
        <Route path="/quizzes/all/:id/:room" exact component={Quiz} />
        <Route path="/quizzes/all/:id/rooms/create-room" exact component={CreateRoom} />
        <Route path="/create-quiz/:id?" exact component={CreateQuiz} />
        <Route path="/create-quiz/:id/questions" exact component={CreateQuestions} />
      </Switch>
    </BrowserRouter>
  );
}
