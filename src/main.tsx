import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

//import "@mantine/dates/styles.css";
//import "@mantine/dropzone/styles.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading something....</div>}>
      <App />
    </React.Suspense>
  </React.StrictMode>,
);
