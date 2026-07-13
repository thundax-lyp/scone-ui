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
                body: "var(--scone-font-family-body)",
                label: "var(--scone-font-family-label)",
                title: "var(--scone-font-family-title)",
                mono: "var(--scone-font-family-mono)",
            },
            fontSize: {
                body: "var(--scone-font-size-body)",
                label: "var(--scone-font-size-label)",
                title: "var(--scone-font-size-title)",
            },
            transitionDuration: {
                fast: "var(--scone-motion-duration-fast)",
                DEFAULT: "var(--scone-motion-duration-default)",
            },
            transitionTimingFunction: {
                standard: "var(--scone-motion-easing-standard)",
            },
            zIndex: {
                sticky: "var(--scone-z-index-sticky)",
                dropdown: "var(--scone-z-index-dropdown)",
                popover: "var(--scone-z-index-popover)",
                drawer: "var(--scone-z-index-drawer)",
                modal: "var(--scone-z-index-modal)",
                toast: "var(--scone-z-index-toast)",
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
