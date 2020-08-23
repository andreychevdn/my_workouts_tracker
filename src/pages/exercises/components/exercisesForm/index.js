import React, { useContext } from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import useStyles from "./styles";
import {
  SAVE_NEW_EXERCISE,
  CANCEL_NEW_EXERCISE,
  CANCEL_CHANGED_EXERCISE,
  SAVE_CHANGED_EXERCISE,
} from "../../reducer/constants";
import { URL_DATABASE } from "../../../../constants";
import { ExercisesContext } from "../../context/exercisesContext";

const ExercisesForm = ({title,}) => {
  const exercisesForm = useStyles();
  const {
    state, dispatch, draftExercise,
    setDraftExercise, initialDraftExercise} = useContext(ExercisesContext);
  let {creationForm, editionForm,} = state;
  let { name, type, description, exampleLink, } = draftExercise;
  const isValid =
    name === "" || type === "" || description === "" || exampleLink === "";

  const handleCreationFormClose = () => {
    setDraftExercise(initialDraftExercise);
    dispatch({type: CANCEL_NEW_EXERCISE});
  };

  const handleEditionFormClose = () => {
    setDraftExercise(initialDraftExercise);
    dispatch({type: CANCEL_CHANGED_EXERCISE});
  };

  const handleChangeInput = (event) => {
    let { name, value } = event.target;
    setDraftExercise({ ...draftExercise, [name]: value });
  };

  const handleNewExerciseSave = async () => {
    const response = await axios.post(
      `${URL_DATABASE}/exercises.json`,
      draftExercise
    );
    const payload = {
      ...draftExercise,
      id: response.data.name,
    };
    dispatch({ type: SAVE_NEW_EXERCISE, payload });
    setDraftExercise(initialDraftExercise);
    dispatch({ type: CANCEL_NEW_EXERCISE });
  };

const handleChangedExerciseSave = async () => {
  const response = await axios.put(
    `${URL_DATABASE}/exercises/${draftExercise.id}.json`,
    draftExercise
  );
  dispatch({type: SAVE_CHANGED_EXERCISE, payload: draftExercise});
  setDraftExercise(initialDraftExercise);
  dispatch({type: CANCEL_CHANGED_EXERCISE});
};

  return (
    <Drawer
      open={creationForm || editionForm}
      anchor="right"
    >
      <div className={exercisesForm.wrapFields}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={exercisesForm.title}
        >
          {title}
        </Typography>
        <TextField
          label="Name"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          name="name"
          className={exercisesForm.textField}
          onChange={handleChangeInput}
          value={name}
        />
        <FormControl variant="outlined" className={exercisesForm.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Type</InputLabel>
          <Select
            native
            onChange={handleChangeInput}
            label="Type"
            name="type"
            value={type}
          >
            <option aria-label="None" value="" />
            <option value='warm up'>WARM UP</option>
            <option value='workout'>WORKOUT</option>
            <option value='stretching'>STRETCHING</option>
            <option value='cardio'>CARDIO</option>
          </Select>
        </FormControl>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          name="description"
          className={exercisesForm.textField}
          onChange={handleChangeInput}
          value={description}
        />
        <TextField
          label="Example link"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          name="exampleLink"
          className={exercisesForm.textField}
          onChange={handleChangeInput}
          value={exampleLink}
        />
        <div className={exercisesForm.wrapButtons}>
          <Button
            variant="contained"
            onClick={creationForm ? handleCreationFormClose : handleEditionFormClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isValid}
            onClick={creationForm ? handleNewExerciseSave :  handleChangedExerciseSave}
          >
            Save
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default ExercisesForm;
