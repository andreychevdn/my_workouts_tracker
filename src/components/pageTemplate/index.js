import React from "react";

import MenuSidebar from "./components/menuSidebar";
import Header from "./components/header";
import useStyles from "./styles";

const PageTemplate = ({ title, children }) => {
  const pageTemplate = useStyles();
  const [isOpenSidebar, setIsOpenSidebar] = React.useState(false);

  const handleSidebarOpen = () => {
    setIsOpenSidebar(true);
  };
  const handleSidebarClose = () => {
    setIsOpenSidebar(false);
  };

  return (
    <div className={pageTemplate.root}>
      <Header
        isOpenSidebar={isOpenSidebar}
        onSidebarOpen={handleSidebarOpen}
        title={title}
      />
      <MenuSidebar
        isOpenSidebar={isOpenSidebar}
        onSidebarClose={handleSidebarClose}
      />
      {React.cloneElement(children, { isOpenSidebar: isOpenSidebar })}
    </div>
  );
};

export default PageTemplate;
