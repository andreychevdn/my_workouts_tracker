import React from 'react';

import AppBar from '@material-ui/core/AppBar';

import Sidebar from '../sidebar';
import Header from '../header';
import useStyles from '../stylesPageTemplate';

const PageTemplate = ({title, children}) => {
  const pageTemplate = useStyles();
  const [openSidebar, setOpenSidebar] = React.useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };
  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  return (
      <div className={pageTemplate.root}>
        <Header
          openSidebar={openSidebar}
          handleSidebarOpen={handleSidebarOpen}
          title={title}
        />
        <Sidebar
          openSidebar={openSidebar}
          handleSidebarClose={handleSidebarClose}
        />
        {React.cloneElement(children, {openSidebar: openSidebar})}
      </div>
  );
};

export default PageTemplate;