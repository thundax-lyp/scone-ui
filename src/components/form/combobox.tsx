import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";
import type { SconeControlSize, SconeOption } from "@/types/foundation";

import { getSconeControlStateProps } from "./control";
import { useSconeFieldContext } from "./field";

export interface SconeComboboxProps<Value extends string = string> extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "value" | "defaultValue"
> {
    options: Array<SconeOption<Value>>;
    value?: Value;
    defaultValue?: Value;
    onValueChange?: (value: Value | undefined) => void;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    searchValue?: string;
    onSearchValueChange?: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: React.ReactNode;
    loading?: boolean;
    ariaLabel?: string;
    invalid?: boolean;
    readOnly?: boolean;
    size?: SconeControlSize;
}

const comboboxSizeClassNames: Record<SconeControlSize, string> = {
    sm: "h-7 text-sm",
    md: "h-8 text-sm",
    lg: "h-9 text-base",
};

function optionLabelToText(label: React.ReactNode): string {
    return typeof label === "string" || typeof label === "number" ? String(label) : "";
}

export const SconeCombobox = React.forwardRef<HTMLButtonElement, SconeComboboxProps>(
    (
        {
            options,
            value,
            defaultValue,
            onValueChange,
            open,
            defaultOpen,
            onOpenChange,
            searchValue,
            onSearchValueChange,
            placeholder = "Select...",
            searchPlaceholder = "Search...",
            emptyText = "No results",
            loading = false,
            ariaLabel,
            invalid,
            readOnly,
            disabled,
            size = "md",
            className,
            ...props
        },
        ref,
    ) => {
        const field = useSconeFieldContext();
        const [currentValue, setCurrentValue] = useControllableState<string | undefined>({
            value,
            defaultValue,
            onValueChange: onValueChange as ((value: string | undefined) => void) | undefined,
        });
        const [currentOpen, setCurrentOpen] = useControllableState<boolean>({
            value: open,
            defaultValue: defaultOpen ?? false,
            onValueChange: onOpenChange,
        });
        const [internalSearch, setInternalSearch] = React.useState("");
        const currentSearch = searchValue ?? internalSearch;
        const selectedOption = options.find((option) => option.value === currentValue);
        const controlProps = getSconeControlStateProps(field, {
            ...props,
            disabled,
            readOnly,
            "aria-label": ariaLabel ?? props["aria-label"],
            "aria-invalid": invalid ?? props["aria-invalid"],
        });
        const isDisabled = controlProps.disabled || controlProps.readOnly;
        const filteredOptions = options.filter((option) =>
            optionLabelToText(option.label).toLowerCase().includes(currentSearch.toLowerCase()),
        );

        const updateSearch = (nextValue: string) => {
            if (searchValue === undefined) {
                setInternalSearch(nextValue);
            }
            onSearchValueChange?.(nextValue);
        };

        const updateOpen = (nextOpen: boolean) => {
            if (!isDisabled) {
                setCurrentOpen(nextOpen);
            }
        };

        const selectOption = (nextValue: string | undefined) => {
            setCurrentValue(nextValue);
            updateSearch("");
            updateOpen(false);
        };

        return (
            <div data-scone-combobox="" className="relative">
                <button
                    ref={ref}
                    type="button"
                    role="combobox"
                    aria-expanded={currentOpen}
                    aria-controls={`${controlProps.id ?? "scone-combobox"}-listbox`}
                    className={cn(
                        "flex w-full min-w-40 items-center justify-between gap-sm rounded-lg border border-input bg-transparent px-2.5 py-1 text-left outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
                        comboboxSizeClassNames[size],
                        className,
                    )}
                    onClick={() => updateOpen(!currentOpen)}
                    onKeyDown={(event) => {
                        if (
                            event.key === "ArrowDown" ||
                            event.key === "Enter" ||
                            event.key === " "
                        ) {
                            event.preventDefault();
                            updateOpen(true);
                        }
                    }}
                    {...controlProps}
                    disabled={isDisabled}
                    readOnly={undefined}
                >
                    <span className={cn(!selectedOption && "text-muted-foreground")}>
                        {selectedOption?.label ?? placeholder}
                    </span>
                    <span className="ml-auto flex items-center gap-xs">
                        {loading ? (
                            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                        ) : null}
                        {currentValue !== undefined && !isDisabled ? (
                            <span
                                role="button"
                                tabIndex={-1}
                                aria-label="Clear selection"
                                className="inline-flex size-4 items-center justify-center"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    selectOption(undefined);
                                }}
                            >
                                <X aria-hidden="true" className="size-3.5" />
                            </span>
                        ) : null}
                        <ChevronsUpDown aria-hidden="true" className="size-4 opacity-50" />
                    </span>
                </button>
                {currentOpen ? (
                    <div className="absolute z-50 mt-1 w-full rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10">
                        <input
                            aria-label={searchPlaceholder}
                            className="mb-1 h-8 w-full rounded-md bg-input/30 px-2 text-sm outline-none"
                            value={currentSearch}
                            placeholder={searchPlaceholder}
                            onChange={(event) => updateSearch(event.currentTarget.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Escape") {
                                    updateOpen(false);
                                }
                                if (
                                    event.key === "Enter" &&
                                    filteredOptions[0] &&
                                    !filteredOptions[0].disabled
                                ) {
                                    selectOption(filteredOptions[0].value);
                                }
                            }}
                        />
                        <div
                            id={`${controlProps.id ?? "scone-combobox"}-listbox`}
                            role="listbox"
                            className="max-h-60 overflow-y-auto"
                        >
                            {loading ? (
                                <div className="px-2 py-2 text-sm text-muted-foreground">
                                    Loading
                                </div>
                            ) : filteredOptions.length === 0 ? (
                                <div className="px-2 py-2 text-sm text-muted-foreground">
                                    {emptyText}
                                </div>
                            ) : (
                                filteredOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        role="option"
                                        aria-selected={option.value === currentValue}
                                        disabled={option.disabled}
                                        className="flex w-full items-center gap-sm rounded-md px-2 py-1.5 text-left text-sm outline-none hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                                        onClick={() => selectOption(option.value)}
                                    >
                                        <span>{option.label}</span>
                                        {option.value === currentValue ? (
                                            <Check aria-hidden="true" className="ml-auto size-4" />
                                        ) : null}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    },
);

SconeCombobox.displayName = "SconeCombobox";
