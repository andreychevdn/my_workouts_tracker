import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./themeConfig";
import PageTemplate from "./components/pageTemplate";
import WorkoutsTracker from "./pages/workoutsTracker";
import Exercises from "./pages/exercises";
import AlertState from "./alertContext/alertState";
import LoaderState from "./loaderContext/loaderState";
import { EXERCISES_PAGE, WORKOUTS_TRACKER_PAGE } from "./constants";

function App() {
  return (
    <AlertState>
      <Router>
        <>
          <LoaderState>
            <ThemeProvider theme={theme}>
              <Switch>
                <Redirect exact from="/" to={WORKOUTS_TRACKER_PAGE} />
                <Route path={WORKOUTS_TRACKER_PAGE}>
                  <PageTemplate title="Workouts tracker">
                    <WorkoutsTracker />
                  </PageTemplate>
                </Route>
                <Route path={EXERCISES_PAGE}>
                  <PageTemplate title="Exercises list">
                    <Exercises />
                  </PageTemplate>
                </Route>
              </Switch>
            </ThemeProvider>
          </LoaderState>
        </>
      </Router>
    </AlertState>
  );
}

export default App;
