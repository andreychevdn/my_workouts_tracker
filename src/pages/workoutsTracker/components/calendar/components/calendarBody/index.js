import React, { useContext } from "react";
import nextId from "react-id-generator";
import moment from "moment";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { WorkoutsContext } from "../../../../context/workoutsContext";
import { LoaderContext } from "../../../../../../loaderContext/loaderContext";
import { SHOW_WORKOUTS_LIST } from "../../../../reducer/constants";
import useStyles from "./styles";

const CalendarBody = (props) => {
  const calendarBody = useStyles();
  const { state, dispatch } = useContext(WorkoutsContext);
  let { workouts } = state;
  const { showLoader, hideLoader } = useContext(LoaderContext);
  const {
    firstDayOfMonth,
    daysInMonth,
    currentMonthNum,
    weekdays,
    currentYear,
  } = props;

  const handleWorkoutsListShow = (day) => {
    showLoader();
    setTimeout(() => hideLoader(), 1500);
    const activeDayDate = {
      day,
      month: currentMonthNum(),
      year: currentYear(),
    };
    const payload = moment(activeDayDate).format("MM-DD-YYYY");
    dispatch({ type: SHOW_WORKOUTS_LIST, payload });
  };

  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(<TableCell key={nextId()}>{""}</TableCell>);
  }

  let monthDays = [];
  for (let d = 1; d <= daysInMonth(); d++) {
    let activeDayCell = [calendarBody.tableCell];
    let formatActiveDay;

    let formattedDate = {
      day: d,
      month: currentMonthNum(),
      year: currentYear(),
    };
    let activeDate = moment(formattedDate).format("MM-DD-YYYY");
    if (workouts.findIndex((workout) => workout.date === activeDate) !== -1) {
      formatActiveDay = calendarBody.activeDay;
      activeDayCell.push(calendarBody.activeTableCell);
    } else {
      activeDate = "";
    }

    monthDays.push(
      <TableCell
        key={d}
        className={activeDayCell.join(" ")}
        onClick={activeDate ? () => handleWorkoutsListShow(d) : null}
      >
        <span className={formatActiveDay}>{d}</span>
      </TableCell>
    );
  }

  let totalSlots = [...blanks, ...monthDays];
  let rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table className={calendarBody.calendar}>
        <TableHead>
          <TableRow>
            {weekdays.map((day, i) => (
              <TableCell
                key={i}
                style={{ background: "#efefef" }}
                className={calendarBody.tableCell}
              >
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((day, i) => (
            <TableRow key={i}>{day}</TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CalendarBody;
