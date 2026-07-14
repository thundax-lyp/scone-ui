import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import * as React from "react";

import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";
import type { SconeControlSize, SconeOption } from "@/types/foundation";

import { getSconeControlStateProps, normalizeSconeAriaInvalid } from "./control";
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
        const rootRef = React.useRef<HTMLDivElement>(null);
        const contentRef = React.useRef<HTMLDivElement>(null);
        const currentSearch = searchValue ?? internalSearch;
        const selectedOption = options.find((option) => option.value === currentValue);
        const controlProps = getSconeControlStateProps(field, {
            ...props,
            disabled,
            readOnly,
            "aria-label": ariaLabel ?? props["aria-label"],
            "aria-invalid": normalizeSconeAriaInvalid(invalid ?? props["aria-invalid"]),
        });
        const { readOnly: controlReadOnly, ...comboboxControlProps } = controlProps;
        const isDisabled = controlProps.disabled || controlReadOnly;
        const filteredOptions = options.filter((option) =>
            optionLabelToText(option.label).toLowerCase().includes(currentSearch.toLowerCase()),
        );
        const listboxId = `${controlProps.id ?? "scone-combobox"}-listbox`;

        const updateSearch = (nextValue: string) => {
            if (isDisabled) {
                return;
            }
            if (searchValue === undefined) {
                setInternalSearch(nextValue);
            }
            onSearchValueChange?.(nextValue);
        };

        const updateOpen = React.useCallback(
            (nextOpen: boolean) => {
                if (!isDisabled) {
                    setCurrentOpen(nextOpen);
                }
            },
            [isDisabled, setCurrentOpen],
        );

        const selectOption = (nextValue: string | undefined) => {
            if (!isDisabled) {
                setCurrentValue(nextValue);
                updateSearch("");
                updateOpen(false);
            }
        };

        React.useEffect(() => {
            if (!currentOpen) {
                return;
            }

            const handlePointerDown = (event: PointerEvent) => {
                const target = event.target;
                if (!(target instanceof Node)) {
                    return;
                }
                if (rootRef.current?.contains(target) || contentRef.current?.contains(target)) {
                    return;
                }
                updateOpen(false);
            };

            document.addEventListener("pointerdown", handlePointerDown);
            return () => document.removeEventListener("pointerdown", handlePointerDown);
        }, [currentOpen, updateOpen]);

        return (
            <Popover open={currentOpen} onOpenChange={updateOpen}>
                <div ref={rootRef} data-scone-combobox="" className="relative">
                    <PopoverTrigger asChild>
                        <button
                            ref={ref}
                            type="button"
                            role="combobox"
                            aria-expanded={currentOpen}
                            aria-controls={listboxId}
                            className={cn(
                                "flex w-full min-w-40 items-center justify-between gap-sm rounded-lg border border-input bg-transparent px-2.5 py-1 text-left outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
                                currentValue !== undefined && !isDisabled && "pr-12",
                                comboboxSizeClassNames[size],
                                className,
                            )}
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
                            {...comboboxControlProps}
                            disabled={isDisabled}
                        >
                            <span className={cn(!selectedOption && "text-muted-foreground")}>
                                {selectedOption?.label ?? placeholder}
                            </span>
                            <span className="ml-auto flex items-center gap-xs">
                                {loading ? (
                                    <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                                ) : null}
                                <ChevronsUpDown aria-hidden="true" className="size-4 opacity-50" />
                            </span>
                        </button>
                    </PopoverTrigger>
                    {currentValue !== undefined && !isDisabled ? (
                        <button
                            type="button"
                            aria-label="Clear selection"
                            className="absolute top-1/2 right-7 inline-flex size-4 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                            onClick={(event) => {
                                event.stopPropagation();
                                selectOption(undefined);
                            }}
                        >
                            <X aria-hidden="true" className="size-3.5" />
                        </button>
                    ) : null}
                </div>
                <PopoverContent
                    ref={contentRef}
                    align="start"
                    className="w-(--radix-popover-trigger-width) p-1"
                    onOpenAutoFocus={(event) => {
                        event.preventDefault();
                    }}
                >
                    <Command shouldFilter={false}>
                        <CommandInput
                            aria-label={searchPlaceholder}
                            placeholder={searchPlaceholder}
                            value={currentSearch}
                            onValueChange={updateSearch}
                        />
                        <CommandList id={listboxId} role="listbox">
                            {loading ? (
                                <div className="px-2 py-2 text-sm text-muted-foreground">
                                    Loading
                                </div>
                            ) : filteredOptions.length === 0 ? (
                                <CommandEmpty>{emptyText}</CommandEmpty>
                            ) : (
                                filteredOptions.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        role="option"
                                        aria-selected={option.value === currentValue}
                                        disabled={option.disabled}
                                        onSelect={() => selectOption(option.value)}
                                    >
                                        <span>{option.label}</span>
                                        {option.value === currentValue ? (
                                            <Check aria-hidden="true" className="ml-auto size-4" />
                                        ) : null}
                                    </CommandItem>
                                ))
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        );
    },
);

SconeCombobox.displayName = "SconeCombobox";
