import React from 'react';

import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const WorkoutForm = ({handleDrawerClose, open}) => {
    return (
        <SwipeableDrawer
            open={open}
            anchor='right'
        >
          <div style={{width: 900}}>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleDrawerClose}
              >
                Cancel
            </Button>
            <Button
                variant="contained"
                color="primary"
                
              >
                Save
            </Button>
          </div>
        </SwipeableDrawer>
    );
};

// export default WorkoutForm;