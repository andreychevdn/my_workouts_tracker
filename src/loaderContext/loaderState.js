import React, { useState } from "react";

import { LoaderContext } from "./loaderContext";

const LoaderState = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);

  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderState;
