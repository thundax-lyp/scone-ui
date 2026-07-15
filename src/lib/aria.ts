export type AriaId = string | null | undefined | false;

export const mergeIds = (...ids: AriaId[]): string | undefined => {
    const uniqueIds = new Set<string>();

    for (const id of ids) {
        if (!id) {
            continue;
        }

        const trimmedId = id.trim();

        if (trimmedId) {
            uniqueIds.add(trimmedId);
        }
    }

    return uniqueIds.size > 0 ? Array.from(uniqueIds).join(" ") : undefined;
};

export const mergeAriaDescribedBy = (...ids: AriaId[]): string | undefined => {
    return mergeIds(...ids);
};

export const ariaBoolean = (value: boolean | null | undefined): true | undefined => {
    return value ? true : undefined;
};

export const hasAriaValue = (value: unknown): boolean => {
    return value !== null && value !== undefined && value !== "";
};

export const ariaValue = <T extends string | number | boolean>(
    value: T | null | undefined,
): T | undefined => {
    if (value === null || value === undefined || value === "") {
        return undefined;
    }

    return value;
};
