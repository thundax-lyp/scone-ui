export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "var(--scone-color-background)",
                foreground: "var(--scone-color-foreground)",
                muted: "var(--scone-color-muted)",
                "muted-foreground": "var(--scone-color-muted-foreground)",
                border: "var(--scone-color-border)",
                ring: "var(--scone-color-ring)",
                primary: "var(--scone-color-primary)",
                "primary-foreground": "var(--scone-color-primary-foreground)",
                neutral: "var(--scone-color-neutral)",
                info: "var(--scone-color-info)",
                success: "var(--scone-color-success)",
                warning: "var(--scone-color-warning)",
                danger: "var(--scone-color-danger)",
            },
            spacing: {
                "2xs": "var(--scone-spacing-2xs)",
                xs: "var(--scone-spacing-xs)",
                sm: "var(--scone-spacing-sm)",
                md: "var(--scone-spacing-md)",
                lg: "var(--scone-spacing-lg)",
                xl: "var(--scone-spacing-xl)",
            },
            borderRadius: {
                sm: "var(--scone-radius-sm)",
                md: "var(--scone-radius-md)",
                lg: "var(--scone-radius-lg)",
                full: "var(--scone-radius-full)",
            },
            boxShadow: {
                sm: "var(--scone-shadow-sm)",
                md: "var(--scone-shadow-md)",
                lg: "var(--scone-shadow-lg)",
            },
            fontFamily: {
                body: "var(--scone-font-body)",
                label: "var(--scone-font-label)",
                title: "var(--scone-font-title)",
                mono: "var(--scone-font-mono)",
            },
            transitionDuration: {
                fast: "var(--scone-duration-fast)",
                DEFAULT: "var(--scone-duration-default)",
            },
            transitionTimingFunction: {
                standard: "var(--scone-easing-standard)",
            },
            zIndex: {
                sticky: "var(--scone-z-sticky)",
                dropdown: "var(--scone-z-dropdown)",
                popover: "var(--scone-z-popover)",
                drawer: "var(--scone-z-drawer)",
                modal: "var(--scone-z-modal)",
                toast: "var(--scone-z-toast)",
            },
            height: {
                "control-sm": "var(--scone-control-height-sm)",
                "control-md": "var(--scone-control-height-md)",
                "control-lg": "var(--scone-control-height-lg)",
            },
            minHeight: {
                "hit-area": "var(--scone-hit-area-min)",
            },
            size: {
                "icon-sm": "var(--scone-icon-size-sm)",
                "icon-md": "var(--scone-icon-size-md)",
                "icon-lg": "var(--scone-icon-size-lg)",
            },
        },
    },
};
