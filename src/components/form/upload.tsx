import { Upload } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";

import { getSconeControlStateProps, normalizeSconeAriaInvalid } from "./control";
import { useSconeFieldContext } from "./field";

export interface SconeUploadRejection {
    file: File;
    reason: "accept" | "maxFiles" | "maxSize" | "beforeAdd";
    message: string;
}

export interface SconeUploadProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "type"
> {
    value?: File[];
    defaultValue?: File[];
    onValueChange?: (files: File[]) => void;
    beforeAdd?: (file: File, currentFiles: File[]) => boolean | Promise<boolean>;
    onReject?: (rejection: SconeUploadRejection) => void;
    maxFiles?: number;
    maxSize?: number;
    ariaLabel?: string;
    invalid?: boolean;
    buttonLabel?: React.ReactNode;
}

function acceptsFile(file: File, accept: string | undefined): boolean {
    if (!accept) {
        return true;
    }

    return accept.split(",").some((part) => {
        const rule = part.trim().toLowerCase();

        if (!rule) {
            return true;
        }

        if (rule.startsWith(".")) {
            return file.name.toLowerCase().endsWith(rule);
        }

        if (rule.endsWith("/*")) {
            return file.type.toLowerCase().startsWith(rule.slice(0, -1));
        }

        return file.type.toLowerCase() === rule;
    });
}

export const SconeUpload = React.forwardRef<HTMLInputElement, SconeUploadProps>(
    (
        {
            value,
            defaultValue,
            onValueChange,
            beforeAdd,
            onReject,
            maxFiles,
            maxSize,
            accept,
            multiple = false,
            ariaLabel = "Choose files",
            invalid,
            buttonLabel = "Choose files",
            disabled,
            readOnly,
            className,
            ...props
        },
        ref,
    ) => {
        const field = useSconeFieldContext();
        const inputRef = React.useRef<HTMLInputElement | null>(null);
        const [files, setFiles] = useControllableState<File[]>({
            value,
            defaultValue: defaultValue ?? [],
            onValueChange,
        });
        const controlProps = getSconeControlStateProps(field, {
            ...props,
            disabled,
            readOnly,
            "aria-label": ariaLabel,
            "aria-invalid": normalizeSconeAriaInvalid(invalid ?? props["aria-invalid"]),
        });
        const { readOnly: controlReadOnly, ...uploadInputControlProps } = controlProps;
        const isDisabled = controlProps.disabled || controlReadOnly;
        const currentFiles = files ?? [];

        const reject = (file: File, reason: SconeUploadRejection["reason"], message: string) => {
            onReject?.({ file, reason, message });
        };

        const handleFiles = async (selectedFiles: FileList | null) => {
            if (!selectedFiles || isDisabled) {
                return;
            }

            const acceptedFiles = [...currentFiles];

            for (const file of Array.from(selectedFiles)) {
                if (!acceptsFile(file, accept)) {
                    reject(file, "accept", `File ${file.name} does not match accept.`);
                    continue;
                }

                if (maxSize !== undefined && file.size > maxSize) {
                    reject(file, "maxSize", `File ${file.name} exceeds maxSize.`);
                    continue;
                }

                if (maxFiles !== undefined && acceptedFiles.length >= maxFiles) {
                    reject(file, "maxFiles", `File ${file.name} exceeds maxFiles.`);
                    continue;
                }

                if (beforeAdd) {
                    const canAdd = await beforeAdd(file, acceptedFiles);
                    if (!canAdd) {
                        reject(file, "beforeAdd", `File ${file.name} was rejected by beforeAdd.`);
                        continue;
                    }
                }

                if (multiple) {
                    acceptedFiles.push(file);
                } else {
                    acceptedFiles.splice(0, acceptedFiles.length, file);
                }
            }

            setFiles(acceptedFiles);
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        };

        return (
            <div data-scone-upload="" className={cn("space-y-xs", className)}>
                <input
                    ref={(node) => {
                        inputRef.current = node;
                        if (typeof ref === "function") {
                            ref(node);
                        } else if (ref) {
                            ref.current = node;
                        }
                    }}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    className="sr-only"
                    onChange={(event) => {
                        void handleFiles(event.currentTarget.files);
                    }}
                    {...uploadInputControlProps}
                    disabled={isDisabled}
                />
                <button
                    type="button"
                    disabled={isDisabled}
                    className="inline-flex h-8 items-center gap-sm rounded-lg border border-input bg-transparent px-2.5 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => inputRef.current?.click()}
                >
                    <Upload aria-hidden="true" className="size-4" />
                    {buttonLabel}
                </button>
                {currentFiles.length > 0 ? (
                    <ul className="space-y-1 text-sm text-muted-foreground">
                        {currentFiles.map((file) => (
                            <li key={`${file.name}-${file.size}`}>{file.name}</li>
                        ))}
                    </ul>
                ) : null}
            </div>
        );
    },
);

SconeUpload.displayName = "SconeUpload";
