### Resume Preview Spacing Inventory

Updated: 2025-09-13 (20px section gaps, 10px item gaps, 5px line gap, unbold titles)

This document summarizes all spacing-related rules (margins, paddings, gaps, line-heights, letter-spacing, and page margins) affecting the resume preview and print output.

#### Global/layout
- **body** (`src/index.css`): margin 0
- **Right column wrapper** (`src/App.js` → `PreviewSection`): padding 20px

#### Preview UI shell (`src/components/PreviewPanel.js`)
- **Header (`PreviewHeader`)**: padding 16px 20px
- **Title (`PreviewTitle`)**: margin 0; gap 12px
- **Viewport (`PreviewViewport`)**: padding 20px
- **Iframe (`PrintIframe`)**: width 850px; height 1100px
- **Floating controls (`FloatingControls`)**: bottom 20px; right 20px
- **Download button (`DownloadButton`)**: padding 12px 18px; gap 8px

#### Printable page (screen preview) (`src/components/PrintableResume.css`)
- **Page box (`.print-page`)**: width 8.5in; min-height 11in; margin 16px auto
- **Content container (`.resume-content`)**: padding 0.25in; font-size 13px; line-height calc(1em + 5px)
  - Section spacing: `.resume-content > div { margin-bottom: 20px }` and last child 0

#### Printable page (actual print) (`@media print` in `src/components/PrintableResume.css`)
- **Page margins (`@page`)**: 0.25in
- **`.resume-content`**: padding 0 (page margin provides the edge spacing)
- **Helpers**: `.no-print` hidden; `.avoid-break`, `.section`, and item classes only set break rules (no extra margins)

#### Personal section (`src/components/PrintableResume.css`)
- **`.personal-section`**: margin-bottom 0; padding-bottom 0
- **`.name`**: margin-top 0; margin-bottom 0; letter-spacing 1px; uppercase
- **`.contact-info`**: horizontal gap only via `gap: 0 8px`
- **`.contact-item:not(:last-child)::after`**: pipe separator with margin-left 8px

- **`.section`**: margin-bottom 0
- **`.section-title`**: font-size 14px; font-weight 400; margin-top 0; margin-bottom 8px; padding-bottom 0; border-bottom 2px; letter-spacing 0.5px

- **`.experience-item`**: margin-bottom 10px; last-child 0
- **`.experience-header`**: margin-bottom 0; gap 8px
- **`.bullet-list`**: margin 0 0 0 18px
- **`.bullet-item`**: margin-bottom 0; line-height inherits (5px gap)

- **`.skills-stack`**: gap 10px
- **`.skill-category`**: gap 10px; line-height inherits (5px gap)

- **`.education-item`**: margin-bottom 10px; last-child 0
- **`.education-header`**: gap 8px

- **`.project-item`**: margin-bottom 10px; last-child 0
- **`.project-title`**: margin-top 0; margin-bottom 0
- **`.project-skills`**: margin-bottom 0
- **`.project-description`**: line-height inherits (5px gap)

- **`.other-item`**: margin-bottom 10px; last-child 0
- **`.other-title`**: margin-top 0; margin-bottom 0
- **`.other-content`**: line-height inherits (5px gap)

#### Dev-only preview note (`src/components/PrintableResume.js`)
- Inline style: margin-top 2rem; padding 1rem

Notes
- On screen: outer page margin is 16px (`.print-page`) and inner content padding is 0.25in (`.resume-content`).
- On print: `.resume-content` padding is removed and spacing is provided by `@page { margin: 0.25in; }`.
- Section-to-section spacing comes from section-title margins and each section’s item margins; `.section` itself has no margin.
- Contact row spacing comes from container gap (8px) and the pipe’s left margin (8px) on all but the last item.

