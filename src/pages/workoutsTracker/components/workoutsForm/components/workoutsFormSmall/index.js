import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Slider from '@material-ui/core/Slider';

import useStyles from './styles';
import {WorkoutsContext} from '../../../../context/workoutsContext';
import {
  CLOSE_ADDITION_FORM
} from '../../../../reducer/constants.js';
import { URL_DATABASE } from '../../../../../../constants';


const WorkoutsFormSmall = () => {
    const workoutsFormSmall = useStyles();
    const {state, dispatch} = useContext(WorkoutsContext);
    const initialValuesWorkoutsFormSmall = {
      selectOption: [],
      exercise: "",
      sets: "",
      reps: "",
      duration: null
    };
    const [valuesWorkoutsFormSmall, setValuesWorkoutsFormSmall] = useState(initialValuesWorkoutsFormSmall);
    let {selectOption, exercise, sets, reps, duration} = valuesWorkoutsFormSmall;
    const isValid =
    exercise === "" || sets === "" || reps === "" || duration === null;

    const fetchExercises = async () => {
      const response = await axios.get(`${URL_DATABASE}/exercises.json`);
      
      if(response.data) {
          const exercises = Object.keys(response.data).map((key) => {
            return {
              ...response.data[key],
              id: key
            }
          });
          setValuesWorkoutsFormSmall({
            ...valuesWorkoutsFormSmall,
            selectOption: exercises
          });
      }
      
  };

   
    useEffect(() => {
        fetchExercises();
        // eslint-disable-next-line
    }, []);

    const handleChangeInput = (event) => {
        let {name, value} = event.target;
        setValuesWorkoutsFormSmall({
          ...valuesWorkoutsFormSmall,
          [name]: value
        });
    };

    const handleChangeSlider = (event, value) => {
      setValuesWorkoutsFormSmall({
        ...valuesWorkoutsFormSmall,
            duration: value
      });
    };

    const handleAdditionFormClose = () => {
        dispatch({type: CLOSE_ADDITION_FORM});
    };

    return (
        <Paper elevation={3} className={workoutsFormSmall.paper}>
            <Typography 
                component="h1"
                variant="h6" 
                color="inherit"
                noWrap
                className={workoutsFormSmall.title}
            >
                Add exercise
            </Typography>
            <FormControl variant="outlined" className={workoutsFormSmall.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Exercises</InputLabel>
              <Select
                native
                onChange={handleChangeInput}
                label="Exercises"
                name="exercise"
                value={exercise}
              >
                <option aria-label="None" value="" />
                {selectOption.map((exercise) => {
                  return <option key={exercise.id} value={exercise.name}>{exercise.name}</option>
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
                onClick={handleAdditionFormClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={isValid}
              >
                Save
              </Button>
            </div>
        </Paper>
    );
};

export default WorkoutsFormSmall;









