import React from 'react';

import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';

import useStyles from '../stylesPageTemplate';


const Header = (props) => {
    const{openSidebar, handleSidebarOpen, title} = props;
    const pageTemplate = useStyles();

    return (
      <div className={pageTemplate.root}>
        <CssBaseline/>
        <AppBar position="absolute" 
          className={
            clsx (pageTemplate.appBar, openSidebar && pageTemplate.appBarShift)
          }
        >
            <Toolbar className={pageTemplate.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleSidebarOpen}
                className={clsx(pageTemplate.menuButton, 
                          openSidebar && pageTemplate.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
              <Typography 
                component="h1"
                variant="h6" 
                color="inherit"
                noWrap
                className={pageTemplate.title}
              >
                {title}
              </Typography>
            </Toolbar>
        </AppBar>
      </div>
    );
};

export default Header;