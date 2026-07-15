import * as React from "react";
import { Slot } from "radix-ui";

import { mergeAriaDescribedBy, mergeIds } from "@/lib/aria";
import { cn } from "@/lib/cn";

import { useSconeFormContext } from "./form";

export interface SconeFieldContextValue {
    fieldId: string;
    labelId: string;
    descriptionId: string;
    messageId: string;
    name?: string;
    invalid?: boolean;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    requiredMark?: boolean | "optional";
}

const SconeFieldContext = React.createContext<SconeFieldContextValue | null>(null);

export const useSconeFieldContext = (): SconeFieldContextValue | null => {
    return React.useContext(SconeFieldContext);
};

const useRequiredSconeFieldContext = (componentName: string): SconeFieldContextValue => {
    const context = useSconeFieldContext();

    if (!context) {
        throw new Error(`${componentName} must be used inside SconeField.Root.`);
    }

    return context;
};

export interface SconeFieldRootProps extends React.HTMLAttributes<HTMLDivElement> {
    name?: string;
    label?: React.ReactNode;
    description?: React.ReactNode;
    message?: React.ReactNode;
    invalid?: boolean;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
}

const SconeFieldRoot = React.forwardRef<HTMLDivElement, SconeFieldRootProps>(
    (
        {
            id,
            name,
            label,
            description,
            message,
            invalid,
            required,
            disabled,
            readOnly,
            className,
            children,
            ...props
        },
        ref,
    ) => {
        const generatedId = React.useId();
        const fieldId = id ?? `scone-field-${generatedId}`;
        const formContext = useSconeFormContext();
        const resolvedDisabled = disabled ?? formContext.disabled;
        const resolvedReadOnly = readOnly ?? formContext.readOnly;
        const resolvedRequired = required;

        const contextValue = React.useMemo<SconeFieldContextValue>(
            () => ({
                fieldId,
                labelId: `${fieldId}-label`,
                descriptionId: `${fieldId}-description`,
                messageId: `${fieldId}-message`,
                name,
                invalid,
                required: resolvedRequired,
                disabled: resolvedDisabled,
                readOnly: resolvedReadOnly,
                requiredMark: formContext.requiredMark,
            }),
            [
                fieldId,
                formContext.requiredMark,
                invalid,
                name,
                resolvedDisabled,
                resolvedReadOnly,
                resolvedRequired,
            ],
        );

        return (
            <SconeFieldContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    role="group"
                    aria-labelledby={label ? contextValue.labelId : undefined}
                    data-scone-field=""
                    data-invalid={invalid || undefined}
                    data-disabled={resolvedDisabled || undefined}
                    data-readonly={resolvedReadOnly || undefined}
                    className={cn("space-y-xs", className)}
                    {...props}
                >
                    {label !== undefined ? <SconeFieldLabel>{label}</SconeFieldLabel> : null}
                    {description !== undefined ? (
                        <SconeFieldDescription>{description}</SconeFieldDescription>
                    ) : null}
                    {children}
                    {message !== undefined ? (
                        <SconeFieldMessage>{message}</SconeFieldMessage>
                    ) : null}
                </div>
            </SconeFieldContext.Provider>
        );
    },
);
SconeFieldRoot.displayName = "SconeField.Root";

export interface SconeFieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    requiredMark?: boolean | "optional";
}

const SconeFieldLabel = React.forwardRef<HTMLLabelElement, SconeFieldLabelProps>(
    ({ className, children, requiredMark, ...props }, ref) => {
        const context = useRequiredSconeFieldContext("SconeField.Label");
        const mark = requiredMark ?? context.requiredMark;
        const showRequired = context.required && mark !== false;
        const showOptional = !context.required && mark === "optional";

        return (
            <label
                ref={ref}
                id={context.labelId}
                htmlFor={context.fieldId}
                className={cn("block text-sm font-medium text-foreground", className)}
                {...props}
            >
                {children}
                {showRequired ? (
                    <span aria-hidden="true" className="ml-1 text-destructive">
                        *
                    </span>
                ) : null}
                {showOptional ? (
                    <span className="ml-1 text-xs font-normal text-muted-foreground">Optional</span>
                ) : null}
            </label>
        );
    },
);
SconeFieldLabel.displayName = "SconeField.Label";

export interface SconeFieldControlProps extends React.HTMLAttributes<HTMLElement> {
    asChild?: boolean;
}

const SconeFieldControl = React.forwardRef<HTMLElement, SconeFieldControlProps>(
    ({ asChild = true, children, className, id, ...props }, ref) => {
        const context = useRequiredSconeFieldContext("SconeField.Control");
        const describedBy = mergeAriaDescribedBy(
            props["aria-describedby"],
            context.descriptionId,
            context.messageId,
        );
        const controlProps = {
            id: id ?? context.fieldId,
            name: context.name,
            "aria-labelledby": mergeIds(props["aria-labelledby"], context.labelId),
            "aria-describedby": describedBy,
            "aria-invalid": context.invalid || undefined,
            "aria-required": context.required || undefined,
            disabled: context.disabled || undefined,
            readOnly: context.readOnly || undefined,
            "data-invalid": context.invalid || undefined,
            "data-disabled": context.disabled || undefined,
            "data-readonly": context.readOnly || undefined,
            className,
            ...props,
        };

        if (asChild) {
            return (
                <Slot.Root ref={ref} {...controlProps}>
                    {children}
                </Slot.Root>
            );
        }

        return (
            <div ref={ref as React.Ref<HTMLDivElement>} {...controlProps}>
                {children}
            </div>
        );
    },
);
SconeFieldControl.displayName = "SconeField.Control";

export type SconeFieldDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const SconeFieldDescription = React.forwardRef<HTMLParagraphElement, SconeFieldDescriptionProps>(
    ({ className, ...props }, ref) => {
        const context = useRequiredSconeFieldContext("SconeField.Description");

        return (
            <p
                ref={ref}
                id={context.descriptionId}
                className={cn("text-sm text-muted-foreground", className)}
                {...props}
            />
        );
    },
);
SconeFieldDescription.displayName = "SconeField.Description";

export type SconeFieldMessageProps = React.HTMLAttributes<HTMLParagraphElement>;

const SconeFieldMessage = React.forwardRef<HTMLParagraphElement, SconeFieldMessageProps>(
    ({ className, ...props }, ref) => {
        const context = useRequiredSconeFieldContext("SconeField.Message");

        return (
            <p
                ref={ref}
                id={context.messageId}
                role={context.invalid ? "alert" : undefined}
                className={cn(
                    "text-sm",
                    context.invalid ? "text-destructive" : "text-muted-foreground",
                    className,
                )}
                {...props}
            />
        );
    },
);
SconeFieldMessage.displayName = "SconeField.Message";

export const SconeField = {
    Root: SconeFieldRoot,
    Label: SconeFieldLabel,
    Control: SconeFieldControl,
    Description: SconeFieldDescription,
    Message: SconeFieldMessage,
};
