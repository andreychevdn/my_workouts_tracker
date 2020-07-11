import React, { useState, useEffect } from 'react';
import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';

import CalendarHead from './components/calendarHead';
import CalendarBody from './components/calendarBody';
import useStyles from '../../../../components/stylesPageTemplate';
import AddWorkout from './components/addWorkout';


function Calendar(props) {
    
    const {firebase, authUser} = props;

    const classes = useStyles();

    let defaultSelectedDay = {
        day: moment().format("D"),
        month: moment().month()
    };

    /*** HOOKS ***/    
    const [dateObject, setDateObject] = useState(moment());
    const [showMonthTable, setShowMonthTable] = useState(false);
    const [selectedDay, setSelected] = useState(defaultSelectedDay);
    // Later add hook for active days from database

    /*** CALENDAR HEAD ***/
    const allMonths = moment.months();
    const currentMonth = () => dateObject.format("MMMM");
    const currentYear = () => dateObject.format("YYYY");

    const setMonth = month => {
        let monthNo = allMonths.indexOf(month);
        let newDateObject = Object.assign({}, dateObject);
        newDateObject = moment(dateObject).set("month", monthNo);
        setDateObject(newDateObject);
        setShowMonthTable(false);
    };

    const toggleMonthSelect = () => setShowMonthTable(!showMonthTable);

    /*** CALENDAR BODY ***/
    const setSelectedDay = day => {
        setSelected({
                day,
                month: currentMonthNum()
        });
         // Later refresh data
    };

    const currentMonthNum = () => dateObject.month();
    const daysInMonth = () => dateObject.daysInMonth();
    const currentDay = () => dateObject.format("D");
    const actualMonth = () => moment().format("MMMM");

    const firstDayOfMonth = () => moment(dateObject).startOf("month").format("d");

   
        
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <CalendarHead
                    allMonths={allMonths}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    setMonth={setMonth}
                    showMonthTable={showMonthTable}
                    toggleMonthSelect={toggleMonthSelect}
                />
                <CalendarBody
                    firstDayOfMonth={firstDayOfMonth}
                    daysInMonth={daysInMonth}
                    currentDay={currentDay}
                    currentMonth={currentMonth}
                    currentMonthNum={currentMonthNum}
                    actualMonth={actualMonth}
                    setSelectedDay={setSelectedDay}
                    selectedDay={selectedDay}
                    weekdays={moment.weekdays()}
                    // activeDays={activeDays} 
                />
            </Grid>
            <Grid item xs={false} md={4} style={{padding: 0}} className={classes.image}>
                {/* <Paper className="paper"> */}
                {/* { editing
                        ?  <>
                                <h3>Edit activity on {selectedDay.day}-{selectedDay.month + 1} </h3>
                                <EditActivity 
                                    activity={activity}
                                    activityKey={activityKey}
                                    authUser={props.authUser}
                                    setEditing={setEditing}
                                    setOpenSnackbar={setOpenSnackbar}
                                    setSnackbarMsg={setSnackbarMsg}
                                />
                            </>
                        :   <>
                                <h3>Add activity on {selectedDay.day}-{selectedDay.month + 1} </h3>
                                <AddActivity 
                                    selectedDay={selectedDay} 
                                    authUser={props.authUser}
                                    setOpenSnackbar={setOpenSnackbar}
                                    setSnackbarMsg={setSnackbarMsg}
                                />
                            </>
                } */}
                {/* </Paper> */}
            </Grid>
            {/* <Grid item xs={12}>
                <AddWorkout/>
            </Grid> */}
            {/* <Grid item xs={12} md={7}> */}
                {/* <Paper className="paper">
                <h3>Activities on {selectedDay.day}-{selectedDay.month + 1}</h3>
                <ActivityList
                    loading={loading}
                    activities={activities}
                    authUser={props.authUser}
                    setOpenSnackbar={setOpenSnackbar}
                    setSnackbarMsg={setSnackbarMsg}
                    editActivity={editActivity}
                />
                </Paper> */}
            {/* </Grid> */}
            {/* <Snackbar 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={openSnackbar} 
                message={snackbarMsg}
            /> */}
        </Grid>
    )
} 

export default Calendar;