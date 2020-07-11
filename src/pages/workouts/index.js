import React from 'react';

import clsx from 'clsx';
import Container from '@material-ui/core/Container';

import useStyles from '../../components/stylesPageTemplate';
import Calendar from './components/calendar';
import AddWorkout from './components/calendar/components/addWorkout';
// import WorkoutForm from './components/workoutForm';



function Workouts(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
   
  return (
    <main className={clsx(classes.content, props.openDrawer && classes.appBarShift)}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="xl" className={classes.container}>
        <div className={classes.wrapButton}>
            <AddWorkout
              handleDrawerOpen={handleDrawerOpen}
            />
        </div>
        {/* <WorkoutForm
           handleDrawerClose={handleDrawerClose}
           open={open} 
        /> */}
        <Calendar/>
      </Container>
    </main>
  ); 
}

export default Workouts;