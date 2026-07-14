import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export interface SconeAccordionItem {
    value: string;
    trigger: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

type SconeAccordionSingleProps = {
    type: "single";
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    collapsible?: boolean;
};

type SconeAccordionMultipleProps = {
    type: "multiple";
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    collapsible?: boolean;
};

export type SconeAccordionProps = (SconeAccordionSingleProps | SconeAccordionMultipleProps) & {
    items?: SconeAccordionItem[];
    children?: React.ReactNode;
    className?: string;
};

export function SconeAccordion({ items, children, className, ...props }: SconeAccordionProps) {
    const content = items
        ? items.map((item) => (
              <AccordionPrimitive.Item
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                  className={cn("border-b border-border last:border-b-0", item.className)}
              >
                  <AccordionPrimitive.Header className="flex">
                      <AccordionPrimitive.Trigger className="group flex flex-1 items-center justify-between gap-3 rounded-md py-3 text-left text-sm font-medium transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
                          {item.trigger}
                          <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-data-open:rotate-180" />
                      </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionPrimitive.Content className="overflow-hidden text-sm text-muted-foreground data-closed:animate-accordion-up data-open:animate-accordion-down">
                      <div className="pb-3">{item.content}</div>
                  </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
          ))
        : children;

    if (props.type === "single") {
        return (
            <AccordionPrimitive.Root
                data-scone-navigation="accordion"
                className={cn("flex w-full flex-col", className)}
                type="single"
                value={props.value}
                defaultValue={props.defaultValue}
                onValueChange={props.onValueChange}
                collapsible={props.collapsible}
            >
                {content}
            </AccordionPrimitive.Root>
        );
    }

    return (
        <AccordionPrimitive.Root
            data-scone-navigation="accordion"
            className={cn("flex w-full flex-col", className)}
            type="multiple"
            value={props.value}
            defaultValue={props.defaultValue}
            onValueChange={props.onValueChange}
        >
            {content}
        </AccordionPrimitive.Root>
    );
}
