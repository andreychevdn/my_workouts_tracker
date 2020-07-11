import React from 'react';

import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import '../../exercises.css';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: '20px 0 20px',
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ExercisesForm = ({handleDrawerClose, open}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

     return (
        <SwipeableDrawer
            open={open}
            anchor='right'
        > 
          <div class='wrapTextField'>
          <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
              <Select
                native
                value={state.age}
                onChange={handleChange}
                label="Age"
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
            <TextField
              label="Size"
              id="outlined-size-small"
              defaultValue="Small"
              variant="outlined"
              size="small"
              className='textField'
            />
            <TextField
              label="Size"
              id="outlined-size-small"
              defaultValue="Small"
              variant="outlined"
              size="small"
              className='textField'
            />
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue="Default Value"
              variant="outlined"
              className='textField'
            />
            <div class='wrapbtn'>
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
            
          </div>
        </SwipeableDrawer>
    );
};

// export default ExercisesForm;