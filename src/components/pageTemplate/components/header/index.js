import React from 'react';

import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';

import useStyles from './styles';

const Header = ({isOpenSidebar, onSidebarOpen, title,}) => {
    const header = useStyles();

    return (
      <div className={header.root}>
        <CssBaseline/>
        <AppBar position="absolute" 
          className={
            clsx (header.appBar, isOpenSidebar && header.appBarShift)
          }
        >
            <Toolbar className={header.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={onSidebarOpen}
                className={clsx(header.menuButton, 
                                isOpenSidebar && header.menuButtonHidden)}
              >
                <MenuIcon />
              </IconButton>
              <Typography 
                component="h1"
                variant="h6" 
                color="inherit"
                noWrap
                className={header.title}
              >
                {title}
              </Typography>
            </Toolbar>
        </AppBar>
        
      </div>
    );
};

export default Header;