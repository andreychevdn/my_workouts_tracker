import React, {useContext} from 'react';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';

import useStyles from './styles';
import {WorkoutsContext} from '../../context/workoutsContext';
import WorkoutsFormSmall from './components/workoutsFormSmall';
import {
  CANCEL_NEW_WORKOUT,
  OPEN_ADDITION_FORM
} from '../../reducer/constants.js';

const WorkoutsForm = ({title}) => {
  const workoutsForm = useStyles();
  const {state, dispatch} = useContext(WorkoutsContext);
  let {creationForm, additionForm} = state;
  const currentDate = moment().format('YYYY-MM-DD'); 
  
  const handleCreationFormClose = () => {
    dispatch({type: CANCEL_NEW_WORKOUT})
  };

  const handleAdditionFormOpen = () => {
    dispatch({type: OPEN_ADDITION_FORM})
  };

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   setState({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  // };

    return (
      <Drawer
      open={creationForm}
      anchor='right'
      > 
        <div className={workoutsForm.wrapFields}>
          <Typography 
              component="h1"
              variant="h6" 
              color="inherit"
              noWrap
              className={workoutsForm.title}
          >
            {title}
          </Typography>
          <TextField
            label="Name"
            id="outlined-size-small"
            variant="outlined"
            size="small"
            className={workoutsForm.textField}
          />
          <form className={workoutsForm.container} noValidate>
            <TextField
              id="date"
              type="date"
              defaultValue={currentDate}
              className={workoutsForm.datePickers}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          <ListItem
            button
            className={workoutsForm.iconButton}
            onClick={handleAdditionFormOpen}
            >
            <ListItemIcon>
                <AddBoxTwoToneIcon className={workoutsForm.icon}/>
            </ListItemIcon>
            <ListItemText primary="Add exercise" />
          </ListItem>
          {additionForm ? <WorkoutsFormSmall/> : null}
          <div className={workoutsForm.wrapButtons}>
            <Button
                variant="contained"
                onClick={handleCreationFormClose}
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
        </div>
      </Drawer>
    );
};

export default WorkoutsForm;