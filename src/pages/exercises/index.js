import React from 'react';
import './exercises.css';

import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Button from '@material-ui/core/Button';

import useStyles from '../../components/stylesPageTemplate';
// import ExercisesForm from './components/exercisesForm';

const Exercises = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
      <>  
        {/* <ExercisesForm
                open={open}
                handleDrawerClose={handleDrawerClose}
            /> */}
        <main className={clsx(classes.content, props.open && classes.appBarShift)}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
            <div className='wrapButton'>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDrawerOpen}
                >
                    Add exercises
                </Button>
            </div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div>
                        <Typography>
                            <span style={{fontSize: 21}}>Name:</span> 
                        </Typography>
                        <Typography>
                            <span>Type:</span> 
                        </Typography>
                        <Typography>
                            <span>Example:</span> 
                        </Typography>
                    </div>
                    <div>
                        <EditIcon style={{fontSize: 'medium'}}/>
                        <DeleteIcon style={{fontSize: 'medium'}}/>
                        <FileCopyIcon style={{fontSize: 'medium'}}/>
                    </div>
                    
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <span>Description:</span> 
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div>
                        <Typography>
                            <span style={{fontSize: 21}}>Name:</span> 
                        </Typography>
                        <Typography>
                            <span>Type:</span> 
                        </Typography>
                        <Typography>
                            <span>Example:</span> 
                        </Typography>
                    </div>
                    <div>
                        <EditIcon style={{fontSize: 'medium'}}/>
                        <DeleteIcon style={{fontSize: 'medium'}}/>
                        <FileCopyIcon style={{fontSize: 'medium'}}/>
                    </div>
                    
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <span>Description:</span> 
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div>
                        <Typography>
                            <span style={{fontSize: 21}}>Name:</span> 
                        </Typography>
                        <Typography>
                            <span>Type:</span> 
                        </Typography>
                        <Typography>
                            <span>Example:</span> 
                        </Typography>
                    </div>
                    <div>
                        <EditIcon style={{fontSize: 'medium'}}/>
                        <DeleteIcon style={{fontSize: 'medium'}}/>
                        <FileCopyIcon style={{fontSize: 'medium'}}/>
                    </div>
                    
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <span>Description:</span> 
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Container>
        </main>
     </>   
    );
};

export default Exercises;