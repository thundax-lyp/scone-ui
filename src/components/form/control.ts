import type * as React from "react";

import { mergeAriaDescribedBy, mergeIds } from "@/lib/aria";

import type { SconeFieldContextValue } from "./field";

export type SconeAriaInvalid = boolean | "true" | "false";

export interface SconeControlStateProps {
    id?: string;
    name?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
    "aria-invalid"?: SconeAriaInvalid;
    "aria-required"?: boolean | "true" | "false";
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
}

export function normalizeSconeAriaInvalid(
    value: React.AriaAttributes["aria-invalid"] | undefined,
): SconeAriaInvalid | undefined {
    if (value === true || value === "true") {
        return true;
    }

    if (value === false || value === "false") {
        return undefined;
    }

    return undefined;
}

export function getSconeControlStateProps(
    field: SconeFieldContextValue | null,
    props: SconeControlStateProps,
): SconeControlStateProps {
    if (!field) {
        return props;
    }

    const disabled = props.disabled ?? field.disabled;
    const readOnly = props.readOnly ?? field.readOnly;
    const required = props.required ?? field.required;
    const invalid = props["aria-invalid"] ?? field.invalid;

    return {
        ...props,
        id: props.id ?? field.fieldId,
        name: props.name ?? field.name,
        "aria-labelledby": mergeIds(props["aria-labelledby"], field.labelId),
        "aria-describedby": mergeAriaDescribedBy(
            props["aria-describedby"],
            field.descriptionId,
            field.messageId,
        ),
        "aria-invalid": invalid || undefined,
        "aria-required": required || undefined,
        disabled: disabled || undefined,
        readOnly: readOnly || undefined,
        required: required || undefined,
    };
}
