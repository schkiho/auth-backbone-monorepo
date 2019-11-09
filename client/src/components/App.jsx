import React from "react";
import Navbar from "./Navbar";

const App = props => {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
};

export default App;
