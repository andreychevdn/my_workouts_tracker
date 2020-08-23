import React, {useContext} from 'react';
import axios from 'axios';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';

import useStyles from './styles';
import {URL_DATABASE} from '../../../../constants';
import {
    DELETE_EXERCISE,
    DUPLICATE_EXERCISE,
    OPEN_EDITION_FORM,
} from '../../reducer/constants';
import { ExercisesContext } from '../../context/exercisesContext';

const ExercisesAccordion = ({id, name, type, description, exampleLink}) => {
    const ExercisesAccordion = useStyles();
    const {
        state, dispatch, 
        setDraftExercise,
    } = useContext(ExercisesContext);
    let {exercises} = state;
        
    const handleExerciseDelete = async (id, e) => {
        e.stopPropagation();
        const response = await axios.delete(`${URL_DATABASE}/exercises/${id}.json`);
        dispatch({type: DELETE_EXERCISE, payload: id});
    };

    const handleExerciseDuplicate = async (id, e) => {
        e.stopPropagation();
        const selectedExercise = exercises.find((exercise) => exercise.id == id);
        const response = await axios.post(`${URL_DATABASE}/exercises.json`, selectedExercise);
        const payload = {
            ...selectedExercise,
            id: response.data.name
        };
        dispatch({type: DUPLICATE_EXERCISE, payload});
    };

    const handleEditionFormOpen = (id, e) => {
        e.stopPropagation();
        dispatch({type: OPEN_EDITION_FORM});
        const selectedExercise = exercises.find((exercise) => exercise.id == id);
        setDraftExercise(selectedExercise);
    };

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <div className={ExercisesAccordion.wrapItems}>
                    <div>
                        <Typography style={{fontSize: 21}}>
                            <span className={ExercisesAccordion.span}>Name: </span>&nbsp;{name}
                        </Typography>
                        <Typography>
                            <span className={ExercisesAccordion.span}>Type:</span>&nbsp;{type}
                        </Typography>
                        <Typography>
                            <span className={ExercisesAccordion.span}>Example Link:</span>&nbsp;{exampleLink}
                        </Typography>
                    </div>
                    <div>
                        <IconButton
                            className={ExercisesAccordion.iconButton}
                            onClick={e => handleEditionFormOpen(id, e)}
                        >
                            <EditIcon/>
                        </IconButton>
                        <IconButton
                            className={ExercisesAccordion.iconButton}
                            onClick={e => handleExerciseDelete(id, e)}
                        >
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton
                            className={ExercisesAccordion.iconButton}
                            onClick={e => handleExerciseDuplicate(id, e)} 
                        >
                            <FileCopyIcon/>
                        </IconButton>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    <span className={ExercisesAccordion.span}>Description:</span>&nbsp;{description} 
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default ExercisesAccordion; 
