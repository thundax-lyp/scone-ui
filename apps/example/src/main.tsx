import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app";
import "scone-ui/styles.css";

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
