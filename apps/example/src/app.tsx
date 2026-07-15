import type * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { LibraryExample } from "./examples";

export const App = (): React.JSX.Element => (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
        <LibraryExample />
    </BrowserRouter>
);
