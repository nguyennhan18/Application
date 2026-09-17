---
name: Executive Intern
colors:
  surface: '#faf9fe'
  surface-dim: '#dad9df'
  surface-bright: '#faf9fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f8'
  surface-container: '#eeedf3'
  surface-container-high: '#e9e7ed'
  surface-container-highest: '#e3e2e7'
  on-surface: '#1a1b1f'
  on-surface-variant: '#414755'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f1f0f5'
  outline: '#717786'
  outline-variant: '#c1c6d7'
  surface-tint: '#005bc1'
  primary: '#0058bc'
  on-primary: '#ffffff'
  primary-container: '#0070eb'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#006e28'
  on-secondary: '#ffffff'
  secondary-container: '#6ffb85'
  on-secondary-container: '#00732a'
  tertiary: '#894d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#ac6300'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#72fe88'
  secondary-fixed-dim: '#53e16f'
  on-secondary-fixed: '#002107'
  on-secondary-fixed-variant: '#00531c'
  tertiary-fixed: '#ffdcbf'
  tertiary-fixed-dim: '#ffb874'
  on-tertiary-fixed: '#2d1600'
  on-tertiary-fixed-variant: '#6a3b00'
  background: '#faf9fe'
  on-background: '#1a1b1f'
  surface-variant: '#e3e2e7'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 41px
    letterSpacing: -0.4px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.3px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 25px
    letterSpacing: -0.2px
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.1px
  body-sm:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.5px
  label-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-main: 16px
  gutter-grid: 12px
  stack-gap: 8px
  section-padding: 24px
---

## Brand & Style

This design system is built for a professional, high-utility mobile environment. The personality is efficient, reliable, and native-first, following a **Modern Corporate** aesthetic heavily influenced by iOS design patterns.

The target audience consists of HR managers and program coordinators who require a clear, high-density overview of intern performance, scheduling, and documentation. The UI prioritizes clarity over decoration, using ample whitespace and a systematic approach to depth to reduce cognitive load. 

**Design Principles:**
- **Native Familiarity:** Leverage standard mobile interaction patterns to minimize the learning curve.
- **Visual Hygiene:** Maintain high contrast and clear boundaries between content modules.
- **Precision:** Use deliberate alignment and consistent scaling to convey a sense of institutional stability.

## Colors

The palette is rooted in functional color theory. The **Primary Corporate Blue** is used exclusively for interactive elements and primary brand touchpoints. 

- **Primary (#007AFF):** Used for buttons, active states, and navigation icons.
- **Success (#34C759):** Applied to approval statuses, completed tasks, and positive performance metrics.
- **Warning (#FF9500):** Reserved for pending reviews, upcoming deadlines, and mid-tier alerts.
- **Neutral/Background:** We use a tiered grayscale system. `#F2F2F7` serves as the base canvas, while `#FFFFFF` is used for foreground cards and containers to create a clear "layered" hierarchy.
- **Semantic Text:** Use pure black (`#000000`) for headings and a deep gray (`#3C3C43`) with 60% opacity for secondary labels.

## Typography

This design system utilizes **Inter** as a functional alternative to SF Pro, ensuring high legibility and a systematic, neutral appearance. 

The hierarchy is built on a "Large Title" philosophy. Primary screens should lead with a `headline-lg` to ground the user. Body text follows a strict 17pt standard for optimal mobile readability. 

For meta-data (such as intern IDs or dates), use `label-caps` to distinguish supplemental information from core content. On mobile devices, ensure that any text smaller than `body-sm` is used sparingly and only for non-critical information.

## Layout & Spacing

The layout follows a **Fluid Content Model** optimized for a single-column mobile view. 

- **Margins:** A consistent 16px horizontal margin is applied to all screens to ensure content does not bleed into the edge of the device.
- **Rhythm:** Vertical spacing follows an 8px base grid. Use 8px for related elements (labels and inputs) and 16px or 24px to separate distinct content groups or sections.
- **Safe Areas:** Adhere strictly to system safe areas for top navigation bars and bottom home indicators.
- **Alignment:** All text should be left-aligned to maintain a strong vertical scan line, except for centered primary action buttons.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Ambient Shadows**.

- **Level 0 (Base):** The `#F2F2F7` background. This is the lowest point of the UI.
- **Level 1 (Cards):** Pure white containers (`#FFFFFF`) used for intern profiles, task cards, and list items. These utilize a very soft, diffused shadow: `0px 2px 8px rgba(0, 0, 0, 0.05)`.
- **Level 2 (Modals/Overlays):** These sit above the UI with a 20% backdrop blur and a more pronounced shadow: `0px 10px 20px rgba(0, 0, 0, 0.1)`.

Avoid heavy borders; use light dividers (`#C6C6C8`) only when items are stacked within the same white container.

## Shapes

The design system employs a **Rounded** shape language to feel modern and accessible.

- **Primary Cards:** 12px to 16px corner radius.
- **Buttons:** 10px corner radius or fully pill-shaped (100px) for high-emphasis actions.
- **Inputs & Controls:** 10px corner radius.
- **Status Badges:** Fully rounded (pill) to distinguish them from interactive buttons.

This consistent use of a 10px-16px range mirrors the native iOS "Continuous Corner" aesthetic, providing a smooth visual transition between elements.

## Components

### Buttons
- **Primary Action:** Solid `#007AFF` background with white text. High-emphasis, full-width at the bottom of screens or centered.
- **Secondary Action:** Ghost style (Blue text on a light blue tint background or transparent background).

### Cards
- White background, 12px rounded corners, and a 1px subtle gray stroke or soft ambient shadow. Cards should contain a header, body, and occasionally a footer for action links.

### Segmented Controls
- Used for filtering (e.g., "All Interns", "Active", "Pending"). Use the native styling: a gray recessed track with a white sliding cap for the active state.

### Input Fields
- Inset style with a light gray background (`#767680` at 12% opacity) or a simple white field with a clear bottom border. 

### Chips & Status Indicators
- Use the **Success Mint** and **Warning Amber** colors for status chips. Text within these chips should be semi-bold and high-contrast against the tinted background of the chip.

### Lists
- Standardized row height (minimum 44px for touch targets). Use chevron-right icons to indicate drill-down navigation.