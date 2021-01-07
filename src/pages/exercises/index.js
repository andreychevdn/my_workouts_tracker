import React, { useReducer, useEffect, useState, useContext } from "react";
import axios from "axios";

import clsx from "clsx";
import Container from "@material-ui/core/Container";

import useStyles from "./styles";
import ExercisesForm from "./components/exercisesForm";
import ExercisesAccordion from "./components/exercisesAccordion";
import exercisesReducer from "./reducer/exercisesReducer";
import { ExercisesContext } from "./context/exercisesContext";
import { AlertContext } from "../../alertContext/alertContext";
import { LoaderContext } from "../../loaderContext/loaderContext";
import AppAlert from "../../components/alert";
import { OPEN_CREATION_FORM, FETCH_EXERCISES } from "./reducer/constants.js";
import { URL_DATABASE } from "../../constants";
import Footer from "../../components/footer";
import Loader from "../../components/loader";

const Exercises = ({ isOpenSidebar }) => {
  const exercises = useStyles();
  const initialState = {
    exercises: [],
    creationForm: false,
    editionForm: false,
  };
  const [state, dispatch] = useReducer(exercisesReducer, initialState);
  let { creationForm } = state;
  const initialDraftExercise = {
    name: "",
    type: "",
    description: "",
    exampleLink: "",
    id: "",
  };
  const [draftExercise, setDraftExercise] = useState(initialDraftExercise);
  const { handleShowAlert, handleHideAlert, alert } = useContext(AlertContext);
  let { alertVisible } = alert;
  const { loading, showLoader, hideLoader } = useContext(LoaderContext);

  const fetchExercises = async () => {
    try {
      showLoader();
      const response = await axios.get(`${URL_DATABASE}/exercises.json`);
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
        dispatch({ type: FETCH_EXERCISES, payload });
      }
      setTimeout(() => {
        hideLoader();
      }, 1500);
    } catch (e) {
      handleShowAlert(`httpError: ${e.message}`, "error");
      setTimeout(() => handleHideAlert(), 3000);
    }
  };

  const handleCreationFormOpen = () => {
    dispatch({ type: OPEN_CREATION_FORM });
  };

  useEffect(() => {
    fetchExercises();
    // eslint-disable-next-line
  }, []);

  return (
    <ExercisesContext.Provider
      value={{
        state,
        dispatch,
        draftExercise,
        setDraftExercise,
        initialDraftExercise,
      }}
    >
      <ExercisesForm
        title={creationForm ? "Create exercise" : "Edit exercise"}
      />
      {alertVisible ? <AppAlert /> : null}
      <main
        className={clsx(
          exercises.content,
          isOpenSidebar && exercises.appBarShift
        )}
      >
        <div className={exercises.appBarSpacer} />
        <Container maxWidth="xl" className={exercises.container}>
          {loading ? (
            <Loader />
          ) : (
            state.exercises.map((exercise) => {
              return (
                <ExercisesAccordion
                  key={exercise.id}
                  name={exercise.name}
                  type={exercise.type}
                  exampleLink={exercise.exampleLink}
                  description={exercise.description}
                  id={exercise.id}
                />
              );
            })
          )}
        </Container>
        <Footer
          text="Create exercise"
          isOpenSidebar={isOpenSidebar}
          onCreationFormExercisesOpen={handleCreationFormOpen}
        />
      </main>
    </ExercisesContext.Provider>
  );
};

export default Exercises;
