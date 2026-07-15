import { useCallback, useState } from "react";

export interface UseControllableStateOptions<T> {
    value?: T;
    defaultValue?: T | (() => T);
    onValueChange?: (value: T) => void;
}

export type ControllableStateSetter<T> = (next: T | ((previous: T | undefined) => T)) => void;

export const useControllableState = <T>({
    value,
    defaultValue,
    onValueChange,
}: UseControllableStateOptions<T>): [
    value: T | undefined,
    setValue: ControllableStateSetter<T>,
] => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    // `undefined` is the uncontrolled sentinel for the current public contract.
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : uncontrolledValue;

    const setValue = useCallback<ControllableStateSetter<T>>(
        (next) => {
            const nextValue =
                typeof next === "function"
                    ? (next as (previous: T | undefined) => T)(currentValue)
                    : next;

            if (Object.is(currentValue, nextValue)) {
                return;
            }

            if (!isControlled) {
                setUncontrolledValue(nextValue);
            }

            onValueChange?.(nextValue);
        },
        [currentValue, isControlled, onValueChange],
    );

    return [currentValue, setValue];
};
