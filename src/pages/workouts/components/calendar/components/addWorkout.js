import React from 'react';
import Button from '@material-ui/core/Button';

function AddWorkout({handleDrawerOpen}) {
  
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleDrawerOpen}
    >
      Add workout
    </Button>
  );
}

export default AddWorkout;