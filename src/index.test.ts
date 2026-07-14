import { describe, expect, expectTypeOf, it } from "vitest";

import {
    ariaBoolean,
    ariaValue,
    AppShell,
    cn,
    composeRefs,
    DataTable,
    FilterBar,
    hasAriaValue,
    mergeAriaDescribedBy,
    mergeIds,
    notification,
    SconeAlert,
    SconeAccordion,
    SconeAvatar,
    SconeBadge,
    SconeButton,
    SconeBreadcrumb,
    SconeCard,
    SconeCheckbox,
    SconeCompact,
    SconeCombobox,
    SconeConfirm,
    SconeDatePicker,
    SconeCollapsible,
    SconeCommand,
    SconeDescriptions,
    SconeDialog,
    SconeDropdown,
    SconeDrawer,
    SconeEmpty,
    SconeField,
    SconeFieldGroup,
    SconeForm,
    SconeFormActions,
    SconeFormSection,
    SconeImage,
    SconeInline,
    SconeInput,
    SconeList,
    SconeLoading,
    SconeMenu,
    SconeNotificationProvider,
    SconeNumberInput,
    SconeParagraph,
    SconePasswordInput,
    SconePagination,
    SconeProgress,
    SconeRadioGroup,
    SconeScrollArea,
    SconeSearchInput,
    SconeSeparator,
    SconeSelect,
    SconeSlider,
    SconeSegmented,
    SconeSplitPane,
    SconeStack,
    SconeStatistic,
    SconeSwitch,
    SconeTable,
    SconeTabs,
    SconeTag,
    SconeText,
    SconeTextArea,
    SconeTooltip,
    SconeTimeline,
    SconeTitle,
    SconeToastProvider,
    SconeToolbar,
    SconeTree,
    SconeTypography,
    SconeUpload,
    Page,
    Section,
    toast,
    useControllableState,
    useSconeFieldContext,
    useSconeFormContext,
} from "./index";
import type {
    AppShellAsideProps,
    AppShellSidebarProps,
    Breakpoint,
    DataTableAction,
    DataTablePaginationProps,
    DataTableRootProps,
    DataTableTableRegionProps,
    FilterBarFilters,
    FilterBarRootProps,
    FilterBarState,
    Key,
    NotificationCloseReason,
    NotificationOptions,
    NotificationPlacement,
    NotificationService,
    OverlayCloseReason,
    ResponsiveValue,
    SconeAlertProps,
    SconeAlign,
    SconeAvatarProps,
    SconeBaseItem,
    SconeButtonProps,
    SconeBreadcrumbProps,
    SconeCheckboxProps,
    SconeComboboxProps,
    SconeCommandItem,
    SconeCommandProps,
    SconeConfirmProps,
    SconeControlSize,
    SconeDatePickerProps,
    SconeDensity,
    SconeDialogProps,
    SconeDrawerProps,
    SconeDropdownProps,
    SconeEmptyProps,
    SconeFieldContextValue,
    SconeFieldGroupProps,
    SconeFieldRootProps,
    SconeFormActionsProps,
    SconeFormContextValue,
    SconeFormProps,
    SconeFormSectionProps,
    SconeImageProps,
    SconeInputProps,
    SconeInlineProps,
    SconeLoadingProps,
    SconeMenuProps,
    SconeNavigationItem,
    SconeNotificationItem,
    SconeNotificationProviderProps,
    SconeNumberInputProps,
    SconeOption,
    SconeOrientation,
    SconePasswordInputProps,
    SconePaginationChangeReason,
    SconePaginationProps,
    SconePaginationState,
    SconeProgressProps,
    SconeRadioGroupProps,
    SconeSearchInputProps,
    SconeSelectProps,
    SconeSegmentedProps,
    SconeRowSelection,
    SconeSide,
    SconeSliderProps,
    SconeSplitPaneProps,
    SconeSplitPaneSizePreset,
    SconeStackProps,
    SconeSpacingToken,
    SconeStatus,
    SconeSwitchProps,
    SconeTableColumn,
    SconeTextAreaProps,
    SconeTabsItem,
    SconeTabsProps,
    SconeTreeNode,
    SconeTreeProps,
    SconeTimelineItem,
    SconeTone,
    SconeToastItem,
    SconeToastProviderProps,
    SconeUploadProps,
    SconeUploadRejection,
    ToastCloseReason,
    ToastOptions,
    ToastPosition,
    ToastService,
    PageRootProps,
    PageStickyActionsProps,
    SectionHeaderProps,
    SectionRootProps,
} from "./index";

describe("public index exports", () => {
    it("exports foundation types from the public entry", () => {
        expectTypeOf<Key>().toEqualTypeOf<string | number>();
        expectTypeOf<Breakpoint>().toEqualTypeOf<"sm" | "md" | "lg" | "xl">();
        expectTypeOf<ResponsiveValue<string>>().toEqualTypeOf<
            string | Partial<Record<Breakpoint, string>>
        >();
        expectTypeOf<SconeTone>().toEqualTypeOf<
            "neutral" | "info" | "success" | "warning" | "danger"
        >();
        expectTypeOf<SconeSpacingToken>().toEqualTypeOf<
            "none" | "xs" | "sm" | "md" | "lg" | "xl"
        >();
        expectTypeOf<SconeControlSize>().toEqualTypeOf<"sm" | "md" | "lg">();
        expectTypeOf<SconeDensity>().toEqualTypeOf<"compact" | "default" | "comfortable">();
        expectTypeOf<SconeOrientation>().toEqualTypeOf<"horizontal" | "vertical">();
        expectTypeOf<SconeAlign>().toEqualTypeOf<"start" | "center" | "end">();
        expectTypeOf<SconeSide>().toEqualTypeOf<"top" | "right" | "bottom" | "left">();
        expectTypeOf<SconeStatus>().toEqualTypeOf<"idle" | "active" | "success" | "error">();
        expectTypeOf<OverlayCloseReason>().toEqualTypeOf<
            "escape" | "outside" | "closeButton" | "footerAction" | "programmatic"
        >();
        expectTypeOf<SconePaginationState>().toEqualTypeOf<{
            page: number;
            pageSize: number;
            total: number;
        }>();
        expectTypeOf<SconePaginationChangeReason>().toEqualTypeOf<"page" | "pageSize">();
        expectTypeOf<SconeRowSelection<{ id: string }>["selectedRowKeys"]>().toEqualTypeOf<Key[]>();
        expectTypeOf<SconeOption["value"]>().toEqualTypeOf<string>();
        expectTypeOf<SconeBaseItem["key"]>().toEqualTypeOf<Key>();
        expectTypeOf<SconeTableColumn<{ id: string }>["key"]>().toEqualTypeOf<Key>();
        expectTypeOf<SconeTimelineItem["key"]>().toEqualTypeOf<Key>();
    });

    it("exports layout component APIs", () => {
        expect(typeof SconeStack).toBe("object");
        expect(typeof SconeInline).toBe("object");
        expect(typeof SconeCompact).toBe("object");
        expect(typeof SconeToolbar).toBe("object");
        expect(typeof SconeSeparator).toBe("object");
        expect(typeof SconeScrollArea).toBe("object");
        expect(typeof SconeSplitPane).toBe("object");

        expectTypeOf<SconeStackProps["gap"]>().toEqualTypeOf<SconeSpacingToken | undefined>();
        expectTypeOf<SconeInlineProps["wrap"]>().toEqualTypeOf<boolean | undefined>();
        expectTypeOf<SconeSplitPaneSizePreset>().toEqualTypeOf<
            "narrow" | "medium" | "wide" | "fill"
        >();
        expectTypeOf<SconeSplitPaneProps["onSizeCommit"]>().toEqualTypeOf<
            ((size: string) => void) | undefined
        >();
    });

    it("exports navigation and pattern component APIs", () => {
        expect(typeof SconePagination).toBe("object");
        expect(typeof AppShell).toBe("object");
        expect(typeof AppShell.Root).toBe("function");
        expect(typeof AppShell.Main).toBe("function");
        expect(typeof Page).toBe("object");
        expect(typeof Page.Content).toBe("function");
        expect(typeof Section).toBe("object");
        expect(typeof Section.Header).toBe("function");
        expect(typeof FilterBar).toBe("object");
        expect(typeof FilterBar.Search).toBe("function");
        expect(typeof DataTable).toBe("object");
        expect(typeof DataTable.Root).toBe("function");
        expect(typeof DataTable.TableRegion).toBe("function");
        expect(typeof DataTable.Pagination).toBe("function");

        expectTypeOf<SconePaginationProps["state"]>().toEqualTypeOf<SconePaginationState>();
        expectTypeOf<AppShellSidebarProps["onCollapsedChange"]>().toEqualTypeOf<
            ((collapsed: boolean) => void) | undefined
        >();
        expectTypeOf<AppShellAsideProps["onOpenChange"]>().toEqualTypeOf<
            ((open: boolean) => void) | undefined
        >();
        expectTypeOf<PageRootProps["maxWidth"]>().toEqualTypeOf<
            "narrow" | "content" | "wide" | "full" | undefined
        >();
        expectTypeOf<PageStickyActionsProps["align"]>().toEqualTypeOf<
            "start" | "end" | "between" | undefined
        >();
        expectTypeOf<SectionRootProps["density"]>().toEqualTypeOf<SconeDensity | undefined>();
        expectTypeOf<SectionHeaderProps["actions"]>().toEqualTypeOf<React.ReactNode>();
        expectTypeOf<FilterBarFilters>().toEqualTypeOf<Record<string, unknown>>();
        expectTypeOf<FilterBarState>().toEqualTypeOf<{
            searchValue: string;
            filters: FilterBarFilters;
        }>();
        expectTypeOf<FilterBarRootProps["onApply"]>().toEqualTypeOf<
            ((state: FilterBarState) => void) | undefined
        >();
        expectTypeOf<DataTableAction["key"]>().toEqualTypeOf<Key>();
        expectTypeOf<DataTableRootProps<{ id: string }>["rowSelection"]>().toEqualTypeOf<
            SconeRowSelection<{ id: string }> | undefined
        >();
        expectTypeOf<DataTableTableRegionProps<{ id: string }>["rowKey"]>().toEqualTypeOf<
            string | ((record: { id: string }) => Key) | undefined
        >();
        expectTypeOf<DataTablePaginationProps["onChange"]>().toEqualTypeOf<
            | ((nextState: SconePaginationState, reason: SconePaginationChangeReason) => void)
            | undefined
        >();
    });

    it("exports feedback and overlay component APIs", () => {
        expect(typeof SconeAlert).toBe("object");
        expect(typeof SconeEmpty).toBe("object");
        expect(typeof SconeLoading).toBe("object");
        expect(typeof SconeProgress).toBe("object");
        expect(typeof SconeDrawer).toBe("object");
        expect(typeof SconeDialog).toBe("object");
        expect(typeof SconeConfirm).toBe("object");
        expect(typeof SconeToastProvider).toBe("function");
        expect(typeof SconeNotificationProvider).toBe("function");
        expect(typeof toast.show).toBe("function");
        expect(typeof notification.open).toBe("function");

        expectTypeOf<SconeAlertProps["tone"]>().toEqualTypeOf<SconeTone | undefined>();
        expectTypeOf<SconeEmptyProps["action"]>().toEqualTypeOf<React.ReactNode>();
        expectTypeOf<SconeLoadingProps["size"]>().toEqualTypeOf<SconeControlSize | undefined>();
        expectTypeOf<SconeProgressProps["status"]>().toEqualTypeOf<SconeStatus | undefined>();
        expectTypeOf<SconeDrawerProps["onRequestClose"]>().toEqualTypeOf<
            ((reason: OverlayCloseReason) => void) | undefined
        >();
        expectTypeOf<SconeDialogProps["onRequestClose"]>().toEqualTypeOf<
            ((reason: OverlayCloseReason) => void) | undefined
        >();
        expectTypeOf<SconeConfirmProps["onConfirm"]>().toEqualTypeOf<
            (() => void | Promise<void>) | undefined
        >();
        expectTypeOf<ToastPosition>().toEqualTypeOf<
            "top-left" | "top-right" | "bottom-left" | "bottom-right"
        >();
        expectTypeOf<ToastCloseReason>().toEqualTypeOf<
            "timeout" | "closeButton" | "programmatic"
        >();
        expectTypeOf<ToastOptions["tone"]>().toEqualTypeOf<SconeTone | undefined>();
        expectTypeOf<SconeToastItem["id"]>().toEqualTypeOf<string>();
        expectTypeOf<SconeToastProviderProps["maxVisible"]>().toEqualTypeOf<number | undefined>();
        expectTypeOf<ToastService["show"]>().toEqualTypeOf<(options: ToastOptions) => string>();
        expectTypeOf<NotificationPlacement>().toEqualTypeOf<
            "top-left" | "top-right" | "bottom-left" | "bottom-right"
        >();
        expectTypeOf<NotificationCloseReason>().toEqualTypeOf<"closeButton" | "programmatic">();
        expectTypeOf<NotificationOptions["title"]>().toEqualTypeOf<React.ReactNode>();
        expectTypeOf<SconeNotificationItem["id"]>().toEqualTypeOf<string>();
        expectTypeOf<SconeNotificationProviderProps["maxVisible"]>().toEqualTypeOf<
            number | undefined
        >();
        expectTypeOf<NotificationService["open"]>().toEqualTypeOf<
            (options: NotificationOptions) => string
        >();
    });

    it("exports form component APIs", () => {
        expect(typeof SconeForm).toBe("object");
        expect(typeof SconeField).toBe("object");
        expect(typeof SconeFieldGroup).toBe("object");
        expect(typeof SconeFormSection).toBe("object");
        expect(typeof SconeFormActions).toBe("object");
        expect(typeof SconeButton).toBe("object");
        expect(typeof SconeInput).toBe("object");
        expect(typeof SconeSearchInput).toBe("object");
        expect(typeof SconePasswordInput).toBe("object");
        expect(typeof SconeTextArea).toBe("object");
        expect(typeof SconeSelect).toBe("object");
        expect(typeof SconeCombobox).toBe("object");
        expect(typeof SconeSwitch).toBe("object");
        expect(typeof SconeCheckbox).toBe("object");
        expect(typeof SconeRadioGroup).toBe("object");
        expect(typeof SconeNumberInput).toBe("object");
        expect(typeof SconeSlider).toBe("object");
        expect(typeof SconeDatePicker).toBe("object");
        expect(typeof SconeUpload).toBe("object");
        expect(typeof useSconeFormContext).toBe("function");
        expect(typeof useSconeFieldContext).toBe("function");

        expectTypeOf<SconeFormProps["requiredMark"]>().toEqualTypeOf<
            boolean | "optional" | undefined
        >();
        expectTypeOf<SconeFormContextValue["requiredMark"]>().toEqualTypeOf<
            boolean | "optional" | undefined
        >();
        expectTypeOf<SconeFieldRootProps["invalid"]>().toEqualTypeOf<boolean | undefined>();
        expectTypeOf<SconeFieldContextValue["fieldId"]>().toEqualTypeOf<string>();
        expectTypeOf<SconeFieldGroupProps["columns"]>().toEqualTypeOf<1 | 2 | 3 | undefined>();
        expectTypeOf<SconeFormSectionProps["title"]>().toEqualTypeOf<React.ReactNode>();
        expectTypeOf<SconeFormActionsProps["align"]>().toEqualTypeOf<SconeAlign | undefined>();
        expectTypeOf<SconeButtonProps["variant"]>().toEqualTypeOf<
            | "default"
            | "outline"
            | "secondary"
            | "ghost"
            | "destructive"
            | "link"
            | null
            | undefined
        >();
        expectTypeOf<SconeInputProps["size"]>().toEqualTypeOf<SconeControlSize | undefined>();
        expectTypeOf<SconeSearchInputProps["clearable"]>().toEqualTypeOf<boolean | undefined>();
        expectTypeOf<SconePasswordInputProps["visibilityLabel"]>().toEqualTypeOf<
            string | undefined
        >();
        expectTypeOf<SconeTextAreaProps["autoSize"]>().toEqualTypeOf<boolean | undefined>();
        expectTypeOf<SconeSelectProps["options"]>().toEqualTypeOf<SconeOption[]>();
        expectTypeOf<SconeComboboxProps["options"]>().toEqualTypeOf<SconeOption[]>();
        expectTypeOf<SconeSwitchProps["onCheckedChange"]>().toEqualTypeOf<
            ((checked: boolean) => void) | undefined
        >();
        expectTypeOf<SconeCheckboxProps["onCheckedChange"]>().toEqualTypeOf<
            ((checked: boolean) => void) | undefined
        >();
        expectTypeOf<SconeRadioGroupProps["options"]>().toEqualTypeOf<SconeOption[]>();
        expectTypeOf<SconeNumberInputProps["onValueChange"]>().toEqualTypeOf<
            ((value: number | undefined) => void) | undefined
        >();
        expectTypeOf<SconeSliderProps["value"]>().toEqualTypeOf<number[] | undefined>();
        expectTypeOf<SconeDatePickerProps["onValueChange"]>().toEqualTypeOf<
            ((value: Date | undefined) => void) | undefined
        >();
        expectTypeOf<SconeUploadProps["onReject"]>().toEqualTypeOf<
            ((rejection: SconeUploadRejection) => void) | undefined
        >();
    });

    it("exports public utilities from the public entry", async () => {
        expect(cn("px-2", "px-4")).toBe("px-4");
        expect(typeof composeRefs).toBe("function");
        expect(typeof useControllableState).toBe("function");
        expect(mergeIds("label", "description")).toBe("label description");
        expect(mergeAriaDescribedBy("description", "error")).toBe("description error");
        expect(ariaBoolean(false)).toBeUndefined();
        expect(hasAriaValue(0)).toBe(true);
        expect(ariaValue("polite")).toBe("polite");

        const publicExports = await import("./index");

        expect(Object.keys(publicExports).sort()).toEqual(
            [
                "AppShell",
                "DataTable",
                "FilterBar",
                "Page",
                "Section",
                "SconeAccordion",
                "SconeAlert",
                "SconeAvatar",
                "SconeBadge",
                "SconeButton",
                "SconeBreadcrumb",
                "SconeCard",
                "SconeCheckbox",
                "SconeCollapsible",
                "SconeCommand",
                "SconeCompact",
                "SconeCombobox",
                "SconeConfirm",
                "SconeDatePicker",
                "SconeDescriptions",
                "SconeDialog",
                "SconeDrawer",
                "SconeDropdown",
                "SconeDropdownItem",
                "SconeDropdownLabel",
                "SconeDropdownSeparator",
                "SconeEmpty",
                "SconeField",
                "SconeFieldGroup",
                "SconeForm",
                "SconeFormActions",
                "SconeFormSection",
                "SconeImage",
                "SconeInline",
                "SconeInput",
                "SconeList",
                "SconeLoading",
                "SconeMenu",
                "SconeNotificationProvider",
                "SconeNumberInput",
                "SconeParagraph",
                "SconePasswordInput",
                "SconePagination",
                "SconeProgress",
                "SconeRadioGroup",
                "SconeScrollArea",
                "SconeSearchInput",
                "SconeSegmented",
                "SconeSeparator",
                "SconeSelect",
                "SconeSlider",
                "SconeSplitPane",
                "SconeStack",
                "SconeStatistic",
                "SconeSwitch",
                "SconeTable",
                "SconeTabs",
                "SconeTag",
                "SconeText",
                "SconeTextArea",
                "SconeTimeline",
                "SconeTitle",
                "SconeToastProvider",
                "SconeToolbar",
                "SconeTooltip",
                "SconeTree",
                "SconeTypography",
                "SconeUpload",
                "ariaBoolean",
                "ariaValue",
                "cn",
                "composeRefs",
                "hasAriaValue",
                "mergeAriaDescribedBy",
                "mergeIds",
                "notification",
                "toast",
                "useControllableState",
                "useSconeFieldContext",
                "useSconeFormContext",
            ].sort(),
        );
    });

    it("exports data display components from the public entry", () => {
        expect(typeof SconeTypography).toBe("object");
        expect(typeof SconeText).toBe("object");
        expect(typeof SconeTitle).toBe("object");
        expect(typeof SconeParagraph).toBe("object");
        expect(typeof SconeCard).toBe("object");
        expect(typeof SconeTable).toBe("object");
        expect(typeof SconeDescriptions).toBe("object");
        expect(typeof SconeList).toBe("object");
        expect(typeof SconeTag).toBe("object");
        expect(typeof SconeBadge).toBe("object");
        expect(typeof SconeStatistic).toBe("object");
        expect(typeof SconeTimeline).toBe("object");
    });

    it("exports navigation and media component APIs", async () => {
        expect(SconeAccordion).toBeDefined();
        expect(SconeBreadcrumb).toBeDefined();
        expect(SconeCollapsible).toBeDefined();
        expect(SconeCommand).toBeDefined();
        expect(SconeDropdown).toBeDefined();
        expect(SconeMenu).toBeDefined();
        expect(SconeSegmented).toBeDefined();
        expect(SconeTabs).toBeDefined();
        expect(SconeTooltip).toBeDefined();
        expect(SconeTree).toBeDefined();
        expect(SconeImage).toBeDefined();
        expect(SconeAvatar).toBeDefined();

        expectTypeOf<SconeBreadcrumbProps["items"][number]["key"]>().toEqualTypeOf<Key>();
        expectTypeOf<SconeSegmentedProps["options"]>().toEqualTypeOf<SconeOption<string>[]>();
        expectTypeOf<SconeTabsItem["value"]>().toEqualTypeOf<string>();
        expectTypeOf<SconeTabsProps["activationMode"]>().toEqualTypeOf<
            "automatic" | "manual" | undefined
        >();
        expectTypeOf<SconeNavigationItem["key"]>().toEqualTypeOf<string>();
        expectTypeOf<SconeMenuProps["onSelect"]>().toEqualTypeOf<
            ((key: string, item: SconeNavigationItem) => void) | undefined
        >();
        expectTypeOf<SconeCommandItem["keywords"]>().toEqualTypeOf<string[] | undefined>();
        expectTypeOf<SconeCommandProps["onSelect"]>().toEqualTypeOf<
            ((key: string, item: SconeCommandItem) => void) | undefined
        >();
        expectTypeOf<SconeDropdownProps["align"]>().toEqualTypeOf<
            "start" | "center" | "end" | undefined
        >();
        expectTypeOf<SconeTreeNode["key"]>().toEqualTypeOf<Key>();
        expectTypeOf<SconeTreeProps["onExpand"]>().toEqualTypeOf<
            ((keys: Key[], info: { node: SconeTreeNode; expanded: boolean }) => void) | undefined
        >();
        expectTypeOf<SconeImageProps["objectFit"]>().toEqualTypeOf<
            "cover" | "contain" | undefined
        >();
        expectTypeOf<SconeAvatarProps["shape"]>().toEqualTypeOf<"circle" | "square" | undefined>();
    });
});
