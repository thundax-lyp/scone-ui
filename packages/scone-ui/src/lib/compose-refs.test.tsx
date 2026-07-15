import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { composeRefs } from "./compose-refs";

describe("composeRefs", () => {
    it("writes the same node to callback and object refs", () => {
        const callbackRef = vi.fn();
        const objectRef = createRef<HTMLButtonElement>();
        const node = document.createElement("button");

        const ref = composeRefs<HTMLButtonElement>(callbackRef, objectRef);
        ref(node);

        expect(callbackRef).toHaveBeenCalledWith(node);
        expect(objectRef.current).toBe(node);
    });

    it("ignores empty refs", () => {
        const objectRef = createRef<HTMLDivElement>();
        const node = document.createElement("div");

        const ref = composeRefs<HTMLDivElement>(undefined, null, objectRef);
        ref(node);

        expect(objectRef.current).toBe(node);
    });

    it("propagates null during cleanup", () => {
        const callbackRef = vi.fn();
        const objectRef = createRef<HTMLInputElement>();
        const node = document.createElement("input");

        const ref = composeRefs<HTMLInputElement>(callbackRef, objectRef);
        ref(node);
        ref(null);

        expect(callbackRef).toHaveBeenLastCalledWith(null);
        expect(objectRef.current).toBeNull();
    });
});
