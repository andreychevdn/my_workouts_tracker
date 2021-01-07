import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import useStyles from "./styles";

const CalendarHead = (props) => {
  const calendarHead = useStyles();
  const {
    allMonths,
    setMonth,
    toggleMonthSelect,
    currentMonth,
    currentYear,
    showMonthTable,
  } = props;

  let months = [];

  allMonths.map((month) => {
    return months.push(
      <TableCell
        colSpan="2"
        className={calendarHead.monthCell}
        key={month}
        onClick={(e) => setMonth(month)}
      >
        <span>{month}</span>
      </TableCell>
    );
  });

  let rows = [];
  let cells = [];

  months.forEach((month, i) => {
    if (i % 3 !== 0 || i === 0) {
      cells.push(month);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(month);
    }
  });

  rows.push(cells);

  let monthList = rows.map((row, i) => <TableRow key={i}>{row}</TableRow>);

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      className={calendarHead.monthSelector}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              className={calendarHead.toggleMonth}
              colSpan="4"
              onClick={() => toggleMonthSelect()}
            >
              {currentMonth()}
              <ArrowDropDownIcon className={calendarHead.arrowIcon} />
            </TableCell>
            <TableCell colSpan="4">{currentYear()}</TableCell>
          </TableRow>
        </TableHead>
        {showMonthTable ? (
          <TableBody>
            <TableRow>
              <TableCell
                colSpan="5"
                className={calendarHead.selectMonthTitle}
              >
                Select a month
              </TableCell>
            </TableRow>
            {monthList}
          </TableBody>
        ) : null}
      </Table>
    </TableContainer>
  );
};

export default CalendarHead;
