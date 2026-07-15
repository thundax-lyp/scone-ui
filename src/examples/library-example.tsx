import type * as React from "react";

import {
    DataTable,
    Page,
    Section,
    SconeAlert,
    SconeBadge,
    SconeButton,
    SconeStatistic,
    type SconeTableColumn,
} from "@/index";

type ExampleComponentRow = {
    id: string;
    family: string;
    status: string;
    coverage: string;
};

const componentRows: ExampleComponentRow[] = [
    {
        id: "form",
        family: "Form",
        status: "Ready",
        coverage: "Fields, inputs, validation states",
    },
    {
        id: "data-display",
        family: "Data display",
        status: "Ready",
        coverage: "Table, list, descriptions, badges",
    },
    {
        id: "patterns",
        family: "Admin patterns",
        status: "Ready",
        coverage: "Page, Section, FilterBar, DataTable",
    },
];

const componentColumns: Array<SconeTableColumn<ExampleComponentRow>> = [
    {
        key: "family",
        title: "Family",
        dataIndex: "family",
    },
    {
        key: "status",
        title: "Status",
        render: (_value, record) => <SconeBadge count={record.status} tone="success" />,
    },
    {
        key: "coverage",
        title: "Example coverage",
        dataIndex: "coverage",
    },
];

export const LibraryExample = (): React.JSX.Element => {
    return (
        <Page.Root maxWidth="wide" density="comfortable" className="min-h-screen">
            <Page.Header
                title="scone-ui component library"
                description="A local example that exercises public components and admin patterns through the package entry surface."
                actions={<SconeButton>Review exports</SconeButton>}
            />

            <Page.Main aria-label="Component library example">
                <div className="flex min-w-0 flex-col gap-lg">
                    <Section.Root
                        title="Readiness snapshot"
                        description="Reusable UI primitives and admin patterns stay separate from product routing, requests, and business rules."
                    >
                        <Section.Content>
                            <div className="grid gap-md md:grid-cols-3">
                                <SconeStatistic
                                    title="Component families"
                                    value="7"
                                    description="Form, data, layout, feedback, navigation, media, patterns"
                                />
                                <SconeStatistic
                                    title="Public entry"
                                    value="1"
                                    description="Consumers import from the package root"
                                    tone="info"
                                />
                                <SconeStatistic
                                    title="Recipe exports"
                                    value="0"
                                    description="Recipes remain documentation-only"
                                    tone="success"
                                />
                            </div>
                        </Section.Content>
                    </Section.Root>

                    <SconeAlert
                        tone="info"
                        title="Library boundary"
                        description="This example uses public scone-ui components only; product-specific state and workflows belong in consuming applications."
                    />

                    <Section.Root
                        title="Component inventory"
                        description="A compact DataTable pattern example with search intent and table rendering."
                        actions={<SconeButton variant="secondary">Open guide</SconeButton>}
                    >
                        <Section.Content>
                            <DataTable.Root>
                                <DataTable.FilterBar
                                    defaultSearchValue=""
                                    searchPlaceholder="Search component families"
                                    onApply={() => undefined}
                                />
                                <DataTable.Toolbar title="Library surface" />
                                <DataTable.TableRegion
                                    ariaLabel="Release queue"
                                    columns={componentColumns}
                                    dataSource={componentRows}
                                    rowKey="id"
                                />
                            </DataTable.Root>
                        </Section.Content>
                    </Section.Root>
                </div>
            </Page.Main>
        </Page.Root>
    );
};
