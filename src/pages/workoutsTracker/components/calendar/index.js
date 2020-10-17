import React, { useState, } from "react";
import moment from "moment";

import Grid from "@material-ui/core/Grid";

import CalendarHead from "./components/calendarHead";
import CalendarBody from "./components/calendarBody";
import useStyles from "./styles";

const Calendar = () => {
  const classes = useStyles();
  const [dateObject, setDateObject] = useState(moment());
  const [showMonthTable, setShowMonthTable] = useState(false);
  const allMonths = moment.months();
  const currentMonth = () => dateObject.format("MMMM");
  const currentYear = () => dateObject.format("YYYY");
  const setMonth = (month) => {
    let monthNo = allMonths.indexOf(month);
    let newDateObject = moment(dateObject).set("month", monthNo);
    setDateObject(newDateObject);
    setShowMonthTable(false);
  };
  const toggleMonthSelect = () => setShowMonthTable(!showMonthTable);
  const currentMonthNum = () => dateObject.month();
  const daysInMonth = () => dateObject.daysInMonth();
  const firstDayOfMonth = () => moment(dateObject).startOf("month").format("d");

  return (
    <Grid container>
      <Grid item xs={12} sm={8} md={7} lg={6} className={classes.calendar}>
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
          currentMonthNum={currentMonthNum}
          weekdays={moment.weekdays()}
          currentYear={currentYear}
        />
      </Grid>
      <Grid item sm={4} md={5} lg={6}>
        <div className={classes.image}></div>
      </Grid>
    </Grid>
  );
};

export default Calendar;
