import { describe, expect, it } from "vitest";

import { cn } from "./cn";
import { cn as compatCn } from "./utils";

describe("cn", () => {
    it("merges conditional class inputs", () => {
        expect(cn("inline-flex", false, null, undefined, { hidden: false, flex: true })).toBe(
            "inline-flex flex",
        );
    });

    it("merges nested array and object inputs", () => {
        expect(cn(["px-2", ["py-1", { "text-sm": true }]])).toBe("px-2 py-1 text-sm");
    });

    it("resolves Tailwind class conflicts", () => {
        expect(cn("px-2 py-1", "px-4", "text-sm", "text-base")).toBe("py-1 px-4 text-base");
    });

    it("keeps the legacy utils entry compatible", () => {
        expect(compatCn("px-2", "px-4")).toBe("px-4");
    });
});
