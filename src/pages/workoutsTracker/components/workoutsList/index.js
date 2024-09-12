import React, { useContext } from "react";
import axios from "axios";

import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
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
import AppAlert from "../../../../components/alert";
import {
  HIDE_WORKOUTS_LIST,
  DELETE_WORKOUT,
  OPEN_EDITION_FORM,
} from "../../reducer/constants";
import { URL_DATABASE } from "../../../../constants/index";

const WorkoutsList = ({ title }) => {
  const workoutsList = useStyles();
  const { handleShowAlert, handleHideAlert, alert } = useContext(AlertContext);
  let { alertVisible } = alert;
  const { state, dispatch, setDraftWorkout } = useContext(WorkoutsContext);
  let { workouts, workoutsTable, activeDay } = state;
  let activeDayWorkouts = [];

  if (activeDay) {
    activeDayWorkouts = workouts.filter(
      (workout) => workout.date === activeDay
    );
  }

  const handleWorkoutsListHide = () => {
    dispatch({ type: HIDE_WORKOUTS_LIST });
  };

  const handleEditionFormOpen = (e, id) => {
    e.stopPropagation();
    dispatch({ type: OPEN_EDITION_FORM });
    const selectedWorkout = workouts.find((workout) => workout.id === id);
    setDraftWorkout(selectedWorkout);
  };

  const handleWorkoutDelete = async (e, id) => {
    try {
      e.stopPropagation();
      const response = await axios.delete(
        `${URL_DATABASE}/workouts/${id}.json`
      );
      if (response.status >= 400) {
        throw new Error("Something went wrong!");
      }
      dispatch({ type: DELETE_WORKOUT, payload: id });
      handleShowAlert("Workout successfully deleted!", "success");
      setTimeout(() => handleHideAlert(), 3000);
    } catch (e) {
      handleShowAlert(`httpError: ${e.message}`, "error");
      setTimeout(() => handleHideAlert(), 3000);
    }
  };

  return (
    <Drawer open={workoutsTable} anchor="left">
      <div className={workoutsList.wrap}>
        {alertVisible ? <AppAlert /> : null}
        <CloseIcon fontSize="default" onClick={handleWorkoutsListHide} />
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={workoutsList.title}
        >
          {title}
        </Typography>
        <TableContainer className={workoutsList.container}>
          {activeDayWorkouts.length ? (
            activeDayWorkouts.map((workout) => (
              <TableContainer
                key={Math.random()}
                className={workoutsList.table}
                component={Paper}
                elevation={3}
              >
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        className={workoutsList.tableHead}
                        align="center"
                        colSpan={3}
                      >
                        Workout
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        className={workoutsList.tableHead}
                        align="left"
                      >
                        Name
                      </TableCell>
                      <TableCell
                        className={workoutsList.tableHead}
                        align="center"
                      >
                        Date
                      </TableCell>
                      <TableCell
                        className={workoutsList.tableHead}
                        align="center"
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">{workout.name}</TableCell>
                      <TableCell align="center">{workout.date}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={(e) => handleEditionFormOpen(e, workout.id)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          onClick={(e) => handleWorkoutDelete(e, workout.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        className={workoutsList.tableHead}
                        align="center"
                        colSpan={4}
                      >
                        Exercises
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        className={workoutsList.tableHead}
                        align="left"
                      >
                        Name
                      </TableCell>
                      <TableCell
                        className={workoutsList.tableHead}
                        align="center"
                      >
                        Sets
                      </TableCell>
                      <TableCell
                        className={workoutsList.tableHead}
                        align="center"
                      >
                        Reps
                      </TableCell>
                      <TableCell
                        className={workoutsList.tableHead}
                        align="center"
                      >
                        Duration
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {workout.exercises
                      ? workout.exercises.map((exercise) => (
                          <TableRow key={Math.random()}>
                            <TableCell align="left">{exercise.name}</TableCell>
                            <TableCell align="center">
                              {exercise.sets}
                            </TableCell>
                            <TableCell align="center">
                              {exercise.reps}
                            </TableCell>
                            <TableCell align="center">
                              {exercise.duration}
                            </TableCell>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
            ))
          ) : (
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={workoutsList.warning}
            >
              NO WORKOUTS!
            </Typography>
          )}
        </TableContainer>
      </div>
    </Drawer>
  );
};

export default WorkoutsList;
