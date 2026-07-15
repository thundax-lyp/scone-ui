import type * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { LibraryExample } from "./examples";

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

export const App = (): React.JSX.Element => (
    <BrowserRouter basename={routerBasename}>
        <LibraryExample />
    </BrowserRouter>
);
