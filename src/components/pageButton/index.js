import React, {useContext} from 'react';

import Button from '@material-ui/core/Button';

const PageButton = ({ text, onCreationFormExercisesOpen,
                    onCreationFormWorkoutsOpen}) => {
    
    return (
        <Button
            variant="contained"
            color="primary"
            onClick={
                    text === 'Create exercise' ? 
                    onCreationFormExercisesOpen : 
                    onCreationFormWorkoutsOpen
                }
        >
            {text}
        </Button>
    );
};

export default PageButton;