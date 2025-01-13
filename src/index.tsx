import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { hydrateRoot } from "react-dom/client";
import { App } from "./App/App";
import { Providers } from "./App/providers";
import "../globals.css";
import { PlatformAPIContext } from "../infrastructure/platform/shared/context";
import { createPlatformAPI } from "../infrastructure/platform";
import { createWindowApi } from "../infrastructure/platform/window/client";

const platformAPI = createPlatformAPI({
  envSpecificAPIs: {
    window: createWindowApi(window),
  },
});

// @ts-ignore
console.log(window.data)

hydrateRoot(
  document.getElementById("app") as HTMLElement,
  <PlatformAPIContext.Provider value={platformAPI}>
    <Router>
      <Providers>
        <App />
      </Providers>
    </Router>
  </PlatformAPIContext.Provider>
);
