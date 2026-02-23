import React from "react";
import ReactDOM from "react-dom";
import CustomerApp from "./App";
import ErrorBoundary from "../shared/ErrorBoundary";

ReactDOM.render(
  <ErrorBoundary appName="Customer">
    <CustomerApp />
  </ErrorBoundary>,
  document.getElementById("root")
);
