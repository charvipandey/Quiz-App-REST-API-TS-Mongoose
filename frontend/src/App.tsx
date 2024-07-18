import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Quizzes from './components/Quizzes';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/quizzes" component={Quizzes} />
      </Switch>
    </Router>
  );
};

export default App;