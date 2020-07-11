import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '../stylesPageTemplate';

function Sidebar(props) {
    const {openSidebar, handleSidebarClose} = props;
    const pageTemplate = useStyles();
 
    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(pageTemplate.drawerPaper, 
                !openSidebar && pageTemplate.drawerPaperClose),
            }}
            open={openSidebar}
            >
            <div className={pageTemplate.toolbarIcon}>
                <IconButton
                    onClick={handleSidebarClose}
                >
                <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListSubheader
                    inset
                    className={pageTemplate.subheader}
                >
                    Menu
                </ListSubheader>
                <Link to='/workouts' className={pageTemplate.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <DateRangeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Workouts" />
                    </ListItem>
                </Link>
                <Link to='/exercises' className={pageTemplate.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <FitnessCenterIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Exercises" />
                    </ListItem>
                </Link>
            </List>
            <Divider />
        </Drawer>
    );
}

export default Sidebar;