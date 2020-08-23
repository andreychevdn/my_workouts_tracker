import React, {useReducer, useEffect, useState} from 'react';
import axios from 'axios';

import clsx from 'clsx';
import Container from '@material-ui/core/Container';

import useStyles from './styles';
import ExercisesForm from './components/exercisesForm';
import ExercisesAccordion from './components/exercisesAccordion';
import exercisesReducer from './reducer/exercisesReducer';
import {ExercisesContext} from './context/exercisesContext';
import {
    OPEN_CREATION_FORM,
    FETCH_EXERCISES,
} from './reducer/constants.js';
import {URL_DATABASE} from '../../constants';
import Footer from '../../components/footer';


const Exercises = ({isOpenSidebar}) => {
    const exercises = useStyles();
    const initialState = {
        exercises: [], 
        creationForm: false,
        editionForm: false,
    };
    const [state, dispatch] = useReducer(exercisesReducer, initialState);
    let {creationForm} = state;
    const initialDraftExercise = {
        name: "",
        type: "",
        description: "",
        exampleLink: "",
        id: "",
    };
    const [draftExercise, setDraftExercise] = useState(initialDraftExercise);

    const fetchExercises = async () => {
        const response = await axios.get(`${URL_DATABASE}/exercises.json`);
        
        if(response.data) {
            const payload = Object.keys(response.data).map((key) => {
                return {
                    ...response.data[key],
                    id: key
                };
            });
            dispatch({type: FETCH_EXERCISES, payload});
        }
    };

    const handleCreationFormOpen = () => {
        dispatch({type: OPEN_CREATION_FORM});
    };

    useEffect(() => {
        fetchExercises();
        // eslint-disable-next-line
    }, []);

    return (
        <ExercisesContext.Provider
            value={{
                state, dispatch,
                draftExercise, setDraftExercise,
                initialDraftExercise,
            }}
        >
            <ExercisesForm
                title={creationForm ? "Create exercise" : "Edit exercise"}
            />
        
            <main className={clsx(exercises.content, isOpenSidebar && exercises.appBarShift)}>
                <div className={exercises.appBarSpacer} />
                <Container maxWidth="xl" className={exercises.container}>
                    {state.exercises.map((exercise) => {
                        return <ExercisesAccordion
                                    key={exercise.id}
                                    name={exercise.name}
                                    type={exercise.type}
                                    exampleLink={exercise.exampleLink}
                                    description={exercise.description}
                                    id={exercise.id}
                                />;
                    })}
                    
                </Container>
                <Footer
                    text='Create exercise'
                    isOpenSidebar={isOpenSidebar}
                    onCreationFormExercisesOpen={handleCreationFormOpen}
                />
            </main>    
        </ExercisesContext.Provider>
    );
};

export default Exercises;