import * as React from "react";

import { cn } from "@/lib/cn";

export interface SconeFormContextValue {
    disabled?: boolean;
    readOnly?: boolean;
    requiredMark?: boolean | "optional";
}

const SconeFormContext = React.createContext<SconeFormContextValue>({});

export const useSconeFormContext = (): SconeFormContextValue => {
    return React.useContext(SconeFormContext);
};

export interface SconeFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    disabled?: boolean;
    readOnly?: boolean;
    requiredMark?: boolean | "optional";
}

export const SconeForm = React.forwardRef<HTMLFormElement, SconeFormProps>(
    (
        {
            disabled,
            readOnly,
            requiredMark,
            className,
            children,
            "aria-disabled": ariaDisabled,
            ...props
        },
        ref,
    ) => {
        const contextValue = React.useMemo(
            () => ({ disabled, readOnly, requiredMark }),
            [disabled, readOnly, requiredMark],
        );

        return (
            <SconeFormContext.Provider value={contextValue}>
                <form
                    ref={ref}
                    aria-disabled={ariaDisabled ?? (disabled || undefined)}
                    data-scone-form=""
                    data-disabled={disabled || undefined}
                    data-readonly={readOnly || undefined}
                    className={cn("space-y-md", className)}
                    {...props}
                >
                    {children}
                </form>
            </SconeFormContext.Provider>
        );
    },
);

SconeForm.displayName = "SconeForm";
