import React, { useContext } from "react";
import axios from "axios";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import IconButton from "@material-ui/core/IconButton";

import useStyles from "./styles";
import { URL_DATABASE } from "../../../../constants";
import {
  DELETE_EXERCISE,
  DUPLICATE_EXERCISE,
  OPEN_EDITION_FORM,
} from "../../reducer/constants";
import { ExercisesContext } from "../../context/exercisesContext";
import { AlertContext } from "../../../../alertContext/alertContext";

const ExercisesAccordion = ({ id, name, type, description, exampleLink }) => {
  const exercisesAccordion = useStyles();
  const { state, dispatch, setDraftExercise } = useContext(ExercisesContext);
  let { exercises } = state;
  const { handleShowAlert, handleHideAlert } = useContext(AlertContext);

  const handleExerciseDelete = async (id, e) => {
    try {
      e.stopPropagation();
      const response = await axios.delete(
        `${URL_DATABASE}/exercises/${id}.json`
      );
      if (response.status >= 400) {
        throw new Error("Something went wrong!");
      }
      dispatch({ type: DELETE_EXERCISE, payload: id });
      handleShowAlert("Exercise successfully deleted!", "success");
      setTimeout(() => handleHideAlert(), 3000);
    } catch (e) {
      handleShowAlert(`httpError: ${e.message}`, "error");
      setTimeout(() => handleHideAlert(), 3000);
    }
  };

  const handleExerciseDuplicate = async (id, e) => {
    try {
      e.stopPropagation();
      const selectedExercise = exercises.find((exercise) => exercise.id === id);
      const response = await axios.post(
        `${URL_DATABASE}/exercises.json`,
        selectedExercise
      );
      if (response.status >= 400) {
        throw new Error("Something went wrong!");
      }
      const payload = {
        ...selectedExercise,
        id: response.data.name,
      };
      dispatch({ type: DUPLICATE_EXERCISE, payload });
      handleShowAlert("Exercise successfully duplicated!", "success");
      setTimeout(() => handleHideAlert(), 3000);
    } catch (e) {
      handleShowAlert(`httpError: ${e.message}`, "error");
      setTimeout(() => handleHideAlert(), 3000);
    }
  };

  const handleEditionFormOpen = (id, e) => {
    e.stopPropagation();
    dispatch({ type: OPEN_EDITION_FORM });
    const selectedExercise = exercises.find((exercise) => exercise.id === id);
    setDraftExercise(selectedExercise);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className={exercisesAccordion.wrapItems}>
          <div>
            <Typography className={exercisesAccordion.name}>
              <span className={exercisesAccordion.span}>Name: </span>&nbsp;
              {name}
            </Typography>
            <Typography className={exercisesAccordion.typography}>
              <span className={exercisesAccordion.span}>Type:</span>&nbsp;{type}
            </Typography>
            <Typography className={exercisesAccordion.typography}>
              <span className={exercisesAccordion.span}>Example Link:</span>
              &nbsp;{exampleLink}
            </Typography>
          </div>
          <div>
            <IconButton
              className={exercisesAccordion.iconButton}
              onClick={(e) => handleEditionFormOpen(id, e)}
            >
              <EditIcon className={exercisesAccordion.icon} />
            </IconButton>
            <IconButton
              className={exercisesAccordion.iconButton}
              onClick={(e) => handleExerciseDelete(id, e)}
            >
              <DeleteIcon className={exercisesAccordion.icon} />
            </IconButton>
            <IconButton
              className={exercisesAccordion.iconButton}
              onClick={(e) => handleExerciseDuplicate(id, e)}
            >
              <FileCopyIcon className={exercisesAccordion.icon} />
            </IconButton>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <span className={exercisesAccordion.span}>Description:</span>&nbsp;
          {description}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default ExercisesAccordion;
