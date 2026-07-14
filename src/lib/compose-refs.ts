import type * as React from "react";

type MutableRef<T> = {
    current: T | null;
};

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null): void {
    if (!ref) {
        return;
    }

    if (typeof ref === "function") {
        ref(value);
        return;
    }

    (ref as MutableRef<T>).current = value;
}

export function composeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
    return (value) => {
        for (const ref of refs) {
            setRef(ref, value);
        }
    };
}
