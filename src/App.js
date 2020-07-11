import React from 'react';
import {BrowserRouter as Router,
        Switch, Route, Redirect} from 'react-router-dom';

import PageTemplate from './components/pageTemplate';
import Workouts from './pages/workouts';
import Exercises from './pages/exercises';



function App() {
  return (
    <Router>
      <>
        <Switch>
          <Redirect exact from='/' to='/workouts' />
          <Route path="/workouts">
            <PageTemplate title="Workouts">
              <Workouts/>
            </PageTemplate>
          </Route>
          <Route path="/exercises">
            <PageTemplate title="Exercises">
              <Exercises/>
            </PageTemplate>
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;


