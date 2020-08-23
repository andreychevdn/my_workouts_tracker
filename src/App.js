import React from 'react';
import {BrowserRouter as Router,
        Switch, Route, Redirect} from 'react-router-dom';
        
import PageTemplate from './components/pageTemplate';
import WorkoutsTracker from './pages/workoutsTracker';
import Exercises from './pages/exercises';
import {
  EXERCISES_PAGE,
  WORKOUTS_TRACKER_PAGE
} from './constants';

function App() {
  return (
    <Router>
      <>
        <Switch>
          <Redirect exact from='/' to={WORKOUTS_TRACKER_PAGE} />
          <Route path={WORKOUTS_TRACKER_PAGE}>
            <PageTemplate title="Workouts tracker">
              <WorkoutsTracker/>
            </PageTemplate>
          </Route>
          <Route path={EXERCISES_PAGE}>
            <PageTemplate title="List exercises">
              <Exercises/>
            </PageTemplate>
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;


