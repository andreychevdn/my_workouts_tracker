import React, {useReducer} from 'react';

import clsx from 'clsx';
import Container from '@material-ui/core/Container';

import useStyles from './styles';
import {WorkoutsContext} from './context/workoutsContext';
import Calendar from './components/calendar';
import PageButton from '../../components/pageButton';
import WorkoutsForm from './components/workoutsForm';
import workoutsReducer from './reducer/workoutsReducer';
import {
  OPEN_CREATION_FORM,
} from './reducer/constants.js';

function WorkoutsTracker({isOpenSidebar}) {
  const workouts = useStyles();
  const initialState = {
    workouts: [],
    creationForm: false,
    editionForm: false,
    additionForm: false,
  };
  const [state, dispatch] = useReducer(workoutsReducer, initialState);
  let {creationForm} = state;
  
  const handleCreationFormOpen = () => {
      dispatch({type: OPEN_CREATION_FORM});
  };
   
  return (
    <WorkoutsContext.Provider
        value={{state, dispatch}}
    >
        <main className={clsx(workouts.content, isOpenSidebar && workouts.appBarShift)}>
        <div className={workouts.appBarSpacer} />
          <Container maxWidth="xl" className={workouts.container}>
            <div className={workouts.wrapButton}>
                <PageButton
                  onCreationFormWorkoutsOpen={handleCreationFormOpen}
                  text='Create workout'
                />
            </div>
            <WorkoutsForm
              open={creationForm} 
              title='Create workout'
            />
            <Calendar/>
          </Container>
        </main>
    </WorkoutsContext.Provider>
  ); 
}

export default WorkoutsTracker;