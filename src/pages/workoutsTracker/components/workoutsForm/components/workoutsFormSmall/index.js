import React, { useContext, useEffect } from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Slider from "@material-ui/core/Slider";

import useStyles from "./styles";
import { WorkoutsContext } from "../../../../context/workoutsContext";
import { AlertContext } from "../../../../../../alertContext/alertContext";
import AppAlert from "../../../../../../components/alert";
import {
  CLOSE_CREATION_SMALL_FORM,
  CLOSE_EDITION_SMALL_FORM,
} from "../../../../reducer/constants.js";
import { URL_DATABASE } from "../../../../../../constants";

const WorkoutsFormSmall = ({ title, index }) => {
  const workoutsFormSmall = useStyles();
  const { handleShowAlert, handleHideAlert, alert } = useContext(AlertContext);
  let { alertVisible } = alert;
  const {
    state,
    dispatch,
    draftWorkout,
    setDraftWorkout,
    valuesWorkoutsFormSmall,
    setValuesWorkoutsFormSmall,
  } = useContext(WorkoutsContext);
  let { creationSmallForm } = state;
  let {
    selectOption,
    name,
    id,
    sets,
    reps,
    duration,
  } = valuesWorkoutsFormSmall;
  const isValid =
    name === "" || sets === "" || reps === "" || duration === null;

  const fetchExercises = async () => {
    try {
      const response = await axios.get(`${URL_DATABASE}/exercises.json`);
      if (response.status >= 400) {
        throw new Error("Something went wrong!");
      }
      if (response.data) {
        const exercises = Object.keys(response.data).map((key) => {
          return {
            ...response.data[key],
            id: key,
          };
        });
        setValuesWorkoutsFormSmall({
          ...valuesWorkoutsFormSmall,
          selectOption: exercises,
        });
      }
    } catch (e) {
      handleShowAlert(`httpError: ${e.message}`, "error");
      setTimeout(() => handleHideAlert(), 3000);
    }
  };

  useEffect(() => {
    fetchExercises();
    // eslint-disable-next-line
  }, []);

  const handleChangeInput = (event) => {
    let { name, value } = event.target;
    setValuesWorkoutsFormSmall({
      ...valuesWorkoutsFormSmall,
      [name]: value,
    });
  };

  const handleChangeSelect = (event) => {
    let { value } = event.target;
    let selectedExercise = selectOption.find(
      (exercise) => exercise.id === value
    );

    setValuesWorkoutsFormSmall({
      ...valuesWorkoutsFormSmall,
      name: selectedExercise.name,
      id: value,
    });
  };

  const handleChangeSlider = (event, value) => {
    setValuesWorkoutsFormSmall({
      ...valuesWorkoutsFormSmall,
      duration: value,
    });
  };

  const handleCreationSmallFormClose = () => {
    setValuesWorkoutsFormSmall({
      ...valuesWorkoutsFormSmall,
      name: "",
      id: "",
      sets: "",
      reps: "",
      duration: null,
    });
    dispatch({ type: CLOSE_CREATION_SMALL_FORM });
  };

  const handleEditionSmallFormClose = () => {
    setValuesWorkoutsFormSmall({
      ...valuesWorkoutsFormSmall,
      name: "",
      id: "",
      sets: "",
      reps: "",
      duration: null,
    });
    dispatch({ type: CLOSE_EDITION_SMALL_FORM });
  };

  const handleValuesCreationSmallFormSave = () => {
    const exerciseWorkout = {
      name,
      id,
      sets,
      reps,
      duration,
    };
    setDraftWorkout({
      ...draftWorkout,
      exercises: [...draftWorkout.exercises, exerciseWorkout],
    });
    setValuesWorkoutsFormSmall({
      ...valuesWorkoutsFormSmall,
      name: "",
      id: "",
      sets: "",
      reps: "",
      duration: null,
    });
    dispatch({ type: CLOSE_CREATION_SMALL_FORM });
  };

  const handleValuesEditionSmallFormSave = () => {
    const exerciseWorkout = {
      name,
      id,
      sets,
      reps,
      duration,
    };
    const draftWorkoutCopy = { ...draftWorkout };
    draftWorkoutCopy.exercises = [...draftWorkout.exercises];
    draftWorkoutCopy.exercises.splice(index, 1, exerciseWorkout);
    setDraftWorkout({
      ...draftWorkout,
      exercises: draftWorkoutCopy.exercises,
    });
    setValuesWorkoutsFormSmall({
      ...valuesWorkoutsFormSmall,
      name: "",
      id: "",
      sets: "",
      reps: "",
      duration: null,
    });
    dispatch({ type: CLOSE_EDITION_SMALL_FORM });
  };

  return (
    <Paper elevation={3} className={workoutsFormSmall.paper}>
      {alertVisible ? <AppAlert /> : null}
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        className={workoutsFormSmall.title}
      >
        {title}
      </Typography>
      <FormControl
        size="small"
        variant="outlined"
        className={workoutsFormSmall.formControl}
      >
        <InputLabel htmlFor="outlined-age-native-simple">Exercises</InputLabel>
        <Select native onChange={handleChangeSelect} label="Exercises">
          <option value={id}>{name}</option>
          {selectOption.map((exercise) => {
            return (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            );
          })}
        </Select>
      </FormControl>
      <div className={workoutsFormSmall.wrapNumbersFields}>
        <TextField
          label="Sets"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          className={workoutsFormSmall.numbersField}
          onChange={handleChangeInput}
          name="sets"
          value={sets}
        />
        <TextField
          label="Reps"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          className={workoutsFormSmall.numbersField}
          onChange={handleChangeInput}
          name="reps"
          value={reps}
        />
      </div>
      <div className={workoutsFormSmall.slider}>
        <Typography id="discrete-slider" gutterBottom>
          Duration
        </Typography>
        <Slider
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={60}
          marks
          min={0}
          max={300}
          onChange={handleChangeSlider}
          value={duration}
        />
      </div>
      <div className={workoutsFormSmall.wrapButtons}>
        <Button
          variant="contained"
          onClick={
            creationSmallForm
              ? handleCreationSmallFormClose
              : handleEditionSmallFormClose
          }
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={isValid}
          onClick={
            creationSmallForm
              ? handleValuesCreationSmallFormSave
              : handleValuesEditionSmallFormSave
          }
        >
          Save
        </Button>
      </div>
    </Paper>
  );
};

export default WorkoutsFormSmall;
