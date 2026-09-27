---
name: Academic Internship Matrix
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#44474e'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#495f86'
  primary: '#001534'
  on-primary: '#ffffff'
  primary-container: '#122a4e'
  on-primary-container: '#7c92bc'
  inverse-primary: '#b1c7f4'
  secondary: '#006a63'
  on-secondary: '#ffffff'
  secondary-container: '#99efe5'
  on-secondary-container: '#006f67'
  tertiary: '#261000'
  on-tertiary: '#ffffff'
  tertiary-container: '#442100'
  on-tertiary-container: '#da7808'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3ff'
  primary-fixed-dim: '#b1c7f4'
  on-primary-fixed: '#001b3e'
  on-primary-fixed-variant: '#31476c'
  secondary-fixed: '#9cf2e8'
  secondary-fixed-dim: '#80d5cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
  data-mono:
    fontFamily: Be Vietnam Pro
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  gutter-desktop: 1.5rem
  gutter-tablet: 1rem
  gutter-mobile: 0.75rem
  margin-desktop: 2rem
  margin-mobile: 1rem
---

## Brand & Style

### Brand Personality & Philosophy
The design system balances academic rigor with corporate efficiency. Built for university internship management, it serves three core user groups: university coordinators, enterprise mentors, and students. The visual voice is authoritative, structured, and trustworthy, yet approachable and encouraging for early-career students.

### Aesthetic Movement
Corporate / Modern with structured editorial balance. The aesthetic uses crisp structural dividers, soft surface layers, focused accent hits, and disciplined typography. It avoids playful or casual visual noise in favor of high-legibility data density, clear grading rubrics, and definitive operational statuses.

## Colors

### Color Hierarchy & Roles
- **Primary (`#122A4E` - Deep Academic Navy):** Anchors navigation bars, primary actions, prominent typography, and institutional identity. Communicates security, credibility, and academic standard.
- **Secondary (`#0F766E` - Deep Teal / Cyan):** Highlights active states, interactive buttons, progress metrics, success flags, and system-level verified badges.
- **Tertiary (`#D97706` - Warm Amber / Gold):** Reserved for rubric star ratings, evaluation scores, attention callouts, pending approval states, and deadline warnings.
- **Neutral (`#64748B` - Slate Grey):** Defines secondary body copy, subtle borders, inactive tab labels, and auxiliary data labels.

### Surface Architecture
- **Base Background:** `#F8FAFC` (Cool Off-White) provides soft contrast without the glare of pure white.
- **Surface Elevation 1 (Cards & Panels):** `#FFFFFF` with fine `#E2E8F0` border strokes.
- **Surface Elevation 2 (Muted Sections & Filters):** `#F1F5F9`.
- **Contrast Text Primary:** `#0F172A`.
- **Contrast Text Secondary:** `#475569`.

## Typography

### Vietnamese Typographic Optimization
Typography relies on **Be Vietnam Pro** for general reading surfaces, form controls, and structured rubric tables. It natively accounts for stacked diacritical marks in Vietnamese (huyền, sắc, hỏi, ngã, nặng, and combined accents như ệ, ỗ, ứ), preventing unintended line-height clipping and uneven baseline drift.

**Manrope** is used strictly for structural headlines, scores, dashboard KPI summaries, and major module headers. Its geometric balance brings precision and clarity to corporate evaluation headers.

### Rules of Usage
- Diacritic-safe vertical spacing: Always maintain a line-height multiplier of at least 1.4x–1.6x for `body` styles to avoid tone mark collision.
- Uppercase transformations must be limited to small tags (`label-sm`), never long Vietnamese sentences.

## Layout & Spacing

### Grid Model
The layout adheres to a 12-column responsive fluid grid anchored by a fixed left-hand navigation sidebar (64px collapsed, 260px expanded).

- **Desktop (1280px+):** 12 columns, 24px gutters, 32px side margins. Max container constraint: 1440px for content dashboards.
- **Tablet (768px - 1279px):** 8 columns, 16px gutters, 24px margins. Rubric scoring tables scroll horizontally on pinned student columns.
- **Mobile (320px - 767px):** 4 columns, 12px gutters, 16px margins. Multi-column forms convert into single-column vertical stacks.

### Density and Information Rhythm
- Evaluation metrics and grading inputs follow a compact 8px baseline rhythm (`space-xs` and `space-sm`) to maximize visible criteria without overwhelming scrolling.
- Structural separation between discrete rubrics and student dossiers uses `space-xl` (32px).

## Elevation & Depth

Visual hierarchy uses tonal surface containment paired with soft ambient shadows to support data clarity:

- **Flat/Embedded (Level 0):** Background canvas (`#F8FAFC`) and nested table headers (`#F1F5F9`). No elevation or shadow.
- **Surface Elevation (Level 1):** Student profile cards, rubric matrix panels, feedback input areas. Uses a 1px border stroke (`#E2E8F0`) paired with subtle ambient diffusion:
  `box-shadow: 0px 1px 3px 0px rgba(18, 42, 78, 0.04), 0px 1px 2px -1px rgba(18, 42, 78, 0.02)`.
- **Interactive Hover / Floating Cards (Level 2):** Applied when hovering over actionable student rows or active grading criteria cards:
  `box-shadow: 0px 4px 12px -2px rgba(18, 42, 78, 0.08), 0px 2px 6px -2px rgba(18, 42, 78, 0.04)`.
- **Modal / Assessment Dialogs (Level 3):** Modal overlays for detailed rubric criteria or mentor final endorsements:
  `box-shadow: 0px 20px 25px -5px rgba(18, 42, 78, 0.1), 0px 10px 10px -5px rgba(18, 42, 78, 0.04)`.

Dark tonal layers or high-contrast heavy drop shadows are forbidden. All shadows carry a faint Navy hue tint (`rgba(18, 42, 78, ...)`) to match the primary brand identity.

## Shapes

The interface implements a refined, rounded geometric profile matching modern institutional standards:

- **Primary Cards & Rubric Containers:** Use `rounded-xl` (12px to 16px) for an approachable, contained feel.
- **Form Controls & Inputs:** Standardized at `rounded-md` (8px) for structural crispness inside dense scoring tables.
- **Badges, Status Pills, and Stepper Nodes:** `rounded-full` (9999px) to preserve distinct functional shapes next to square data cells.
- **Interactive Feedback Boxes:** 12px outer radius with soft internal 8px padding boundaries.

## Components

### Buttons
- **Primary:** Solid `#122A4E` with white text, font `label-md`, radius 8px. Hover shifts to `#1E3A8A`.
- **Secondary / Action:** Solid `#0F766E` with white text. Used for "Submit Evaluation", "Approve Report", and "Export Transcript".
- **Outline:** 1px border `#CBD5E1`, text `#1E293B`, hover background `#F8FAFC`.
- **Warning/Pending Action:** Solid `#D97706` text-white for re-submission requests.

### Student Dossier Cards
- Composed with an elevated white container (`rounded-xl`, 16px padding).
- Top zone: Student avatar (48px, rounded-full), Vietnamese full name (Manrope 16px Bold), Student ID (MSSV) in monospace font, and company assignment pill badge.
- Middle zone: Quick metrics grid (Attendance rate, Assigned Mentor, Current Milestone week).
- Bottom zone: Quick action bar with internship agreement preview and rubric report trigger.

### Rubric Matrix & Scoring Tables
- Grid of evaluation criteria divided into rows (e.g., Kỹ năng chuyên môn, Tác phong doanh nghiệp, Báo cáo thực tập).
- Scoring levels use horizontal segmented control chips (1 to 5 scale or 1 to 10 scale). Selecting a score illuminates the chip in teal `#0F766E` with bold white text.
- Score description popover appears inline on focus to clarify criterion weight and academic standards.

### Star Ratings & Metric Summaries
- Mentor rating uses solid SVG stars in `#D97706`.
- Aggregate grade displays show a dual metric badge: e.g., "8.5 / 10.0" prominently in Manrope 22px bold with an adjacent percentile ranking badge.

### Feedback & Mentor Observation Inputs
- Multi-line textarea enclosed in 1px `#CBD5E1` border with a subtle top label.
- Focus state: Border transitions to `#0F766E` with a 3px outer glow `rgba(15, 118, 110, 0.15)`.
- Features contextual quick-insert prompt tags below the field (e.g., "+ Đúng tiến độ", "+ Cần cải thiện báo cáo tuần", "+ Chủ động giao tiếp").

### Progress Tracking Bar & Timeline Stepper
- Displays the internship timeline across 4 key stages: Giao đề tài → Giữa kỳ → Đánh giá doanh nghiệp → Bảo vệ hội đồng.
- Completed stages: Deep teal node with white checkmark icon; connecting line in solid `#0F766E`.
- Current stage: Navy `#122A4E` ring with animated pulsing inner dot; bold title.
- Upcoming stage: Light slate `#E2E8F0` node with grey text.