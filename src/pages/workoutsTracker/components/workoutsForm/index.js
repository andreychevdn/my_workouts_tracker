import React, { useContext, useState } from "react";
import axios from "axios";
import "date-fns";
import moment from "moment";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import useStyles from "./styles";
import { WorkoutsContext } from "../../context/workoutsContext";
import { AlertContext } from "../../../../alertContext/alertContext";
import WorkoutsFormSmall from "./components/workoutsFormSmall";
import AppAlert from "../../../../components/alert";
import {
  CANCEL_NEW_WORKOUT,
  OPEN_CREATION_SMALL_FORM,
  SAVE_NEW_WORKOUT,
  CANCEL_CHANGED_WORKOUT,
  SAVE_CHANGED_WORKOUT,
  OPEN_EDITION_SMALL_FORM,
  CLOSE_CREATION_SMALL_FORM,
  CLOSE_EDITION_SMALL_FORM,
} from "../../reducer/constants.js";
import { URL_DATABASE } from "../../../../constants";

const WorkoutsForm = ({ title }) => {
  const workoutsForm = useStyles();
  const { handleShowAlert, handleHideAlert, alert } = useContext(AlertContext);
  let { alertVisible } = alert;
  const {
    state,
    dispatch,
    draftWorkout,
    setDraftWorkout,
    initialDraftWorkout,
    valuesWorkoutsFormSmall,
    setValuesWorkoutsFormSmall,
  } = useContext(WorkoutsContext);
  const [indexSelectedExercise, setIndexSelectedExercise] = useState(null);
  let {
    creationForm,
    creationSmallForm,
    editionSmallForm,
    editionForm,
  } = state;
  let { name, date, exercises } = draftWorkout;
  const isValid = name === "" || !exercises;

  const handleChangeInput = (event) => {
    let { name, value } = event.target;
    setDraftWorkout({
      ...draftWorkout,
      [name]: value,
    });
  };

  const handleDateChange = (value) => {
    const date = moment(value).format("MM-DD-YYYY");

    setDraftWorkout({
      ...draftWorkout,
      date,
    });
  };

  const handleCreationSmallFormOpen = () => {
    dispatch({ type: OPEN_CREATION_SMALL_FORM });
  };

  const handleCreationFormClose = () => {
    setDraftWorkout(initialDraftWorkout);
    dispatch({ type: CLOSE_CREATION_SMALL_FORM });
    dispatch({ type: CANCEL_NEW_WORKOUT });
  };

  const handleEditionFormClose = () => {
    setDraftWorkout(initialDraftWorkout);
    dispatch({ type: CLOSE_CREATION_SMALL_FORM });
    dispatch({ type: CLOSE_EDITION_SMALL_FORM });
    dispatch({ type: CANCEL_CHANGED_WORKOUT });
  };

  const handleExerciseDelete = (e, id) => {
    e.stopPropagation();
    setDraftWorkout({
      ...draftWorkout,
      exercises: [
        ...draftWorkout.exercises.filter((exercise) => exercise.id !== id),
      ],
    });
  };

  const handleEditionSmallFormOpen = (e, id) => {
    e.stopPropagation();
    let selectedExercise = draftWorkout.exercises.find(
      (exercise) => exercise.id === id
    );
    dispatch({ type: OPEN_EDITION_SMALL_FORM });
    setIndexSelectedExercise(
      draftWorkout.exercises.findIndex((exercise) => exercise.id === id)
    );
    setValuesWorkoutsFormSmall({
      ...valuesWorkoutsFormSmall,
      name: selectedExercise.name,
      id: selectedExercise.id,
      sets: selectedExercise.sets,
      reps: selectedExercise.reps,
      duration: selectedExercise.duration,
    });
  };

  const handleNewWorkoutSave = async () => {
    try {
      const response = await axios.post(
        `${URL_DATABASE}/workouts.json`,
        draftWorkout
      );
      if (response.status >= 400) {
        throw new Error("Something went wrong!");
      }
      const payload = {
        ...draftWorkout,
        id: response.data.name,
      };
      dispatch({ type: SAVE_NEW_WORKOUT, payload });
      setDraftWorkout(initialDraftWorkout);
      dispatch({ type: CANCEL_NEW_WORKOUT });
      handleShowAlert("Workout successfully сreated!", "success");
      setTimeout(() => handleHideAlert(), 3000);
    } catch (e) {
      handleShowAlert(`httpError: ${e.message}`, "error");
      setTimeout(() => handleHideAlert(), 3000);
    }
  };

  const handleChangedWorkoutSave = async () => {
    try {
      const response = await axios.put(
        `${URL_DATABASE}/workouts/${draftWorkout.id}.json`,
        draftWorkout
      );
      if (response.status >= 400) {
        throw new Error("Something went wrong!");
      }
      dispatch({ type: SAVE_CHANGED_WORKOUT, payload: draftWorkout });
      setDraftWorkout(initialDraftWorkout);
      dispatch({ type: CANCEL_CHANGED_WORKOUT });
      handleShowAlert("Workout successfully сhanged!", "success");
      setTimeout(() => handleHideAlert(), 3000);
    } catch (e) {
      handleShowAlert(`httpError: ${e.message}`, "error");
      setTimeout(() => handleHideAlert(), 3000);
    }
  };

  return (
    <Drawer
      open={creationForm || editionForm}
      anchor="right"
      className={workoutsForm.drawer}
    >
      <div className={workoutsForm.wrapFields}>
        {alertVisible ? <AppAlert /> : null}
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={workoutsForm.title}
        >
          {title}
        </Typography>
        <TextField
          label="Name"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          className={workoutsForm.textField}
          name="name"
          value={name}
          onChange={handleChangeInput}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            className={workoutsForm.textField}
            value={date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <Button
          variant="contained"
          color="primary"
          className={workoutsForm.btnAddExercise}
          onClick={!editionSmallForm ? handleCreationSmallFormOpen : null}
        >
          Add exercise
        </Button>
        {creationSmallForm || editionSmallForm ? (
          <WorkoutsFormSmall
            title={creationSmallForm ? "Add exercise" : "Edit exercise"}
            index={indexSelectedExercise}
          />
        ) : exercises.length ? (
          <TableContainer
            className={workoutsForm.table}
            elevation={3}
            component={Paper}
          >
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell className={workoutsForm.tableHead} align="left">
                    Exercise name
                  </TableCell>
                  <TableCell className={workoutsForm.tableHead} align="center">
                    Sets
                  </TableCell>
                  <TableCell className={workoutsForm.tableHead} align="center">
                    Reps
                  </TableCell>
                  <TableCell className={workoutsForm.tableHead} align="center">
                    Duration
                  </TableCell>
                  <TableCell className={workoutsForm.tableHead} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exercises.map((exercise) => (
                  <TableRow key={Math.random()}>
                    <TableCell align="left">{exercise.name}</TableCell>
                    <TableCell align="center">{exercise.sets}</TableCell>
                    <TableCell align="center">{exercise.reps}</TableCell>
                    <TableCell align="center">{exercise.duration}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={(e) =>
                          handleEditionSmallFormOpen(e, exercise.id)
                        }
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        onClick={(e) => handleExerciseDelete(e, exercise.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
        <Button
          variant="contained"
          onClick={
            creationForm ? handleCreationFormClose : handleEditionFormClose
          }
          className={workoutsForm.btnCancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={workoutsForm.btnSave}
          disabled={isValid}
          onClick={
            creationForm ? handleNewWorkoutSave : handleChangedWorkoutSave
          }
        >
          Save
        </Button>
      </div>
    </Drawer>
  );
};

export default WorkoutsForm;
