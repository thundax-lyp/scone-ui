import * as React from "react";

import { useControllableState } from "@/lib/use-controllable-state";

import {
    getSconeControlStateProps,
    normalizeSconeAriaInvalid,
    type SconeControlStateProps,
} from "./control";
import { useSconeFieldContext } from "./field";

type SconeTextControlElement = HTMLInputElement | HTMLTextAreaElement;

interface UseSconeTextControlOptions<
    TElement extends SconeTextControlElement,
    TControlProps extends SconeControlStateProps,
> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    onChange?: React.ChangeEventHandler<TElement>;
    ariaLabel?: string;
    invalid?: boolean;
    controlProps: TControlProps;
}

export function useSconeTextControl<
    TElement extends SconeTextControlElement,
    TControlProps extends SconeControlStateProps,
>({
    value,
    defaultValue,
    onValueChange,
    onChange,
    ariaLabel,
    invalid,
    controlProps,
}: UseSconeTextControlOptions<TElement, TControlProps>) {
    const field = useSconeFieldContext();
    const [currentValue, setCurrentValue] = useControllableState<string>({
        value,
        defaultValue,
        onValueChange,
    });
    const resolvedControlProps = getSconeControlStateProps(field, {
        ...controlProps,
        "aria-label": ariaLabel ?? controlProps["aria-label"],
        "aria-invalid": normalizeSconeAriaInvalid(invalid ?? controlProps["aria-invalid"]),
    }) as TControlProps & SconeControlStateProps;

    const handleChange = React.useCallback<React.ChangeEventHandler<TElement>>(
        (event) => {
            setCurrentValue(event.currentTarget.value);
            onChange?.(event);
        },
        [onChange, setCurrentValue],
    );

    return {
        currentValue,
        setCurrentValue,
        controlProps: resolvedControlProps,
        handleChange,
    };
}
