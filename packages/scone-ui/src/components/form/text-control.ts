import * as React from "react";

import { useControllableState, type ControllableStateSetter } from "@/lib/use-controllable-state";

import {
    getSconeControlStateProps,
    normalizeSconeAriaInvalid,
    type SconeControlStateProps,
} from "./control";
import { useSconeFieldContext } from "./field";

type SconeTextControlElement = HTMLInputElement | HTMLTextAreaElement;
type SconeTextControlProps = Omit<SconeControlStateProps, "aria-invalid"> & {
    "aria-invalid"?: React.AriaAttributes["aria-invalid"];
};

interface UseSconeTextControlOptions<
    TElement extends SconeTextControlElement,
    TControlProps extends SconeTextControlProps,
> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    onChange?: React.ChangeEventHandler<TElement>;
    ariaLabel?: string;
    invalid?: boolean;
    controlProps: TControlProps;
}

interface UseSconeTextControlResult<
    TElement extends SconeTextControlElement,
    TControlProps extends SconeTextControlProps,
> {
    currentValue: string | undefined;
    setCurrentValue: ControllableStateSetter<string>;
    controlProps: TControlProps & SconeControlStateProps;
    handleChange: React.ChangeEventHandler<TElement>;
}

export const useSconeTextControl = <
    TElement extends SconeTextControlElement,
    TControlProps extends SconeTextControlProps,
>({
    value,
    defaultValue,
    onValueChange,
    onChange,
    ariaLabel,
    invalid,
    controlProps,
}: UseSconeTextControlOptions<TElement, TControlProps>): UseSconeTextControlResult<
    TElement,
    TControlProps
> => {
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
    } as SconeControlStateProps) as TControlProps & SconeControlStateProps;

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
};
