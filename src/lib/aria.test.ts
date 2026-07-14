import { describe, expect, it } from "vitest";

import { ariaBoolean, ariaValue, hasAriaValue, mergeAriaDescribedBy, mergeIds } from "./aria";

describe("aria helpers", () => {
    it("merges ids while removing empty values and duplicates", () => {
        expect(mergeIds("label", undefined, "", false, "description", "label")).toBe(
            "label description",
        );
    });

    it("returns undefined when no ids are present", () => {
        expect(mergeIds(undefined, null, false, "")).toBeUndefined();
    });

    it("merges aria-describedby ids", () => {
        expect(mergeAriaDescribedBy("field-description", "field-error")).toBe(
            "field-description field-error",
        );
    });

    it("omits false boolean aria attributes", () => {
        expect(ariaBoolean(true)).toBe(true);
        expect(ariaBoolean(false)).toBeUndefined();
        expect(ariaBoolean(undefined)).toBeUndefined();
    });

    it("detects present aria values", () => {
        expect(hasAriaValue("message")).toBe(true);
        expect(hasAriaValue(0)).toBe(true);
        expect(hasAriaValue(false)).toBe(true);
        expect(hasAriaValue("")).toBe(false);
        expect(hasAriaValue(null)).toBe(false);
        expect(hasAriaValue(undefined)).toBe(false);
    });

    it("normalizes aria values", () => {
        expect(ariaValue("polite")).toBe("polite");
        expect(ariaValue(0)).toBe(0);
        expect(ariaValue(false)).toBe(false);
        expect(ariaValue("")).toBeUndefined();
        expect(ariaValue(undefined)).toBeUndefined();
    });
});
