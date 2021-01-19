import React, { useReducer, useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";

import clsx from "clsx";
import Container from "@material-ui/core/Container";

import useStyles from "./styles";
import { WorkoutsContext } from "./context/workoutsContext";
import { AlertContext } from "../../alertContext/alertContext";
import { LoaderContext } from "../../loaderContext/loaderContext";
import Calendar from "./components/calendar";
import PageButton from "../../components/pageButton";
import WorkoutsForm from "./components/workoutsForm";
import WorkoutsList from "./components/workoutsList";
import workoutsReducer from "./reducer/workoutsReducer";
import AppAlert from "../../components/alert";
import Loader from "../../components/loader";
import { OPEN_CREATION_FORM, FETCH_WORKOUTS } from "./reducer/constants.js";
import { URL_DATABASE } from "../../constants";

function WorkoutsTracker({ isOpenSidebar }) {
  const workouts = useStyles();
  const { handleShowAlert, handleHideAlert, alert } = useContext(AlertContext);
  let { alertVisible } = alert;
  const { loading } = useContext(LoaderContext);
  const initialState = {
    workouts: [],
    creationForm: false,
    editionForm: false,
    creationSmallForm: false,
    editionSmallForm: false,
    workoutsTable: false,
    activeDay: "",
  };
  const [state, dispatch] = useReducer(workoutsReducer, initialState);
  let { creationForm } = state;
  const currentDate = moment().format("MM-DD-YYYY");
  const initialDraftWorkout = {
    id: "",
    name: "",
    date: currentDate,
    exercises: [],
  };
  const [draftWorkout, setDraftWorkout] = useState(initialDraftWorkout);
  const initialValuesWorkoutsFormSmall = {
    selectOption: [],
    name: "",
    id: "",
    sets: "",
    reps: "",
    duration: null,
  };
  const [valuesWorkoutsFormSmall, setValuesWorkoutsFormSmall] = useState(
    initialValuesWorkoutsFormSmall
  );

  const fetchWorkouts = async () => {// TODO: think about optimization
    try {
      const response = await axios.get(`${URL_DATABASE}/workouts.json`);
      if (response.status >= 400) {
        throw new Error("Something went wrong!");
      }
      if (response.data) {
        const payload = Object.keys(response.data).map((key) => {
          return {
            ...response.data[key],
            id: key,
          };
        });
        dispatch({ type: FETCH_WORKOUTS, payload });
      }
    } catch (e) {
      handleShowAlert(`httpError: ${e.message}`, "error");
      setTimeout(() => handleHideAlert(), 3000);
    }
  };

  useEffect(() => {
    fetchWorkouts();
    // eslint-disable-next-line
  }, []);

  const handleCreationFormOpen = () => {
    dispatch({ type: OPEN_CREATION_FORM });
  };

  return (// TODO: think about necessity of using Context
    <WorkoutsContext.Provider
      value={{
        state,
        dispatch,
        draftWorkout,
        setDraftWorkout,
        initialDraftWorkout,
        fetchWorkouts,
        valuesWorkoutsFormSmall,
        setValuesWorkoutsFormSmall,
        initialValuesWorkoutsFormSmall,
      }}
    >
      {alertVisible ? <AppAlert /> : null}
      <main
        className={clsx(
          workouts.content,
          isOpenSidebar && workouts.appBarShift
        )}
      >
        <div className={workouts.appBarSpacer} />
        <Container maxWidth="xl" className={workouts.container}>
          <div className={workouts.wrapButton}>
            <PageButton
              onCreationFormWorkoutsOpen={handleCreationFormOpen}
              text="Create workout"
            />
          </div>
          <WorkoutsForm
            title={creationForm ? "Create workout" : "Edit workout"}
          />
          {loading ? <Loader /> : <WorkoutsList title="Workouts list" />}
          <Calendar />
        </Container>
      </main>
    </WorkoutsContext.Provider>
  );
}

export default WorkoutsTracker;
