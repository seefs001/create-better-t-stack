---
name: Better T Stack
description: Modern CLI and Stack Builder for scaffolding type-safe TypeScript projects.
colors:
  background-light: "oklch(0.955 0.004 279)"
  card-light: "oklch(0.99 0.003 279)"
  foreground-light: "oklch(0.19 0.01 279)"
  primary-light: "oklch(0.22 0.012 279)"
  primary-foreground-light: "oklch(0.985 0.004 279)"
  secondary-light: "oklch(0.92 0.005 279)"
  muted-light: "oklch(0.92 0.005 279)"
  muted-foreground-light: "oklch(0.55 0.012 279)"
  accent-light: "oklch(0.92 0.005 279)"
  border-light: "oklch(0.88 0.006 279)"
  ring-light: "oklch(0.7 0.012 279)"
  background-dark: "oklch(0.15 0.01 279)"
  card-dark: "oklch(0.21 0.01 279)"
  foreground-dark: "oklch(0.985 0.004 279)"
  primary-dark: "oklch(0.92 0.006 279)"
  primary-foreground-dark: "oklch(0.21 0.01 279)"
  muted-dark: "oklch(0.27 0.01 279)"
  muted-foreground-dark: "oklch(0.72 0.008 279)"
  border-dark: "oklch(0.985 0.004 279 / 10%)"
  destructive-light: "oklch(0.58 0.22 27)"
  destructive-dark: "oklch(0.7 0.19 22)"
typography:
  display:
    fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0em"
  headline:
    fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "0em"
  title:
    fontFamily: "var(--font-geist), ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0em"
  body:
    fontFamily: "var(--font-geist), ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "0em"
  label:
    fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "0.025em"
rounded:
  base: "0.625rem"
  sm: "calc(var(--radius) - 4px)"
  md: "calc(var(--radius) - 2px)"
  lg: "var(--radius)"
  xl: "calc(var(--radius) + 4px)"
  auth-card: "1rem"
  auth-control: "1rem"
  pill: "999px"
spacing:
  unit: "0.25rem"
  compact: "0.5rem"
  control-gap: "0.75rem"
  panel: "1rem"
  section: "1.5rem"
  page: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.primary-light}"
    textColor: "{colors.primary-foreground-light}"
    rounded: "{rounded.lg}"
    padding: "0 10px"
    height: "32px"
  button-outline:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.lg}"
    padding: "0 10px"
    height: "32px"
  auth-card:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.auth-card}"
    padding: "20px 24px"
  auth-field:
    backgroundColor: "{colors.muted-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.auth-control}"
    height: "44px"
  command-surface:
    backgroundColor: "{colors.muted-light}"
    textColor: "{colors.foreground-light}"
    rounded: "{rounded.xl}"
    padding: "12px"
---

# Design System: Better T Stack

## 1. Overview

**Creative North Star: "The Typed Workbench"**

Better T Stack should feel like a compact workbench for senior developers. It is dense, legible, stateful, and action-oriented. It can borrow from terminals, file trees, command blocks, and mono labels, but it must not pretend to be a terminal at the cost of usability.

The register is product. Design serves stack selection, generation, preview, command copying, docs reading, auth flows, and dashboard surfaces. Familiar controls are a strength: buttons, inputs, menus, tabs, file trees, preview panels, search links, and auth entry points should behave as users expect.

The system rejects low-quality SaaS landing patterns, glassmorphism, gradient text, repeated marketing card grids, fake metrics, and decorative motion. Generated templates inherit the same rules: polished by default, easy to replace, and not over-branded.

**Key Characteristics:**

- Terminal-native labels: `CLI_COMMAND`, `STACK_BUILDER`, `PROJECT_STATUS`, `WORKBENCH_RULES`.
- Restrained shadcn-neutral palette, with primary reserved for action, selection, focus, and live state.
- Flat or tonal surfaces first. Shadows are reserved for overlays, hover, and focused panels.
- Dense panels with clear borders, stable layout, and no nested card clutter.
- Base UI backed shadcn components, styled through tokens and composition.
- Generated content must look designed without becoming a marketing page.

## 2. Colors

The palette is based on shadcn-neutral structure with a slight violet-gray tint. Light mode uses a gray canvas instead of pure white so auth cards, headers, command surfaces, and generated dashboards feel grounded. Dark mode supports long-running code-adjacent work.

### Primary

- **Neutral Ink Primary** (`oklch(0.22 0.012 279)`): light-mode primary actions, selected state, focus affordances, command prompts, and key state.
- **Soft Neutral Primary** (`oklch(0.92 0.006 279)`): dark-mode primary actions and selected state.

### Supporting Surfaces

- **Light Workbench Canvas** (`oklch(0.955 0.004 279)`): default page background for generated web templates.
- **Light Card Surface** (`oklch(0.99 0.003 279)`): cards, auth panels, popovers, and primary content surfaces.
- **Muted Utility Surface** (`oklch(0.92 0.005 279)`): inputs, secondary controls, command surfaces, hover states, and low-emphasis panels.
- **Light Workbench Border** (`oklch(0.88 0.006 279)`): panel boundaries, input borders, separators, and header dividers.

### Text

- **Ink Text** (`oklch(0.19 0.01 279)`): primary light-mode text.
- **Dim Metadata** (`oklch(0.55 0.012 279)`): secondary copy, metadata, hints, and inactive navigation.
- **Dark Text** (`oklch(0.985 0.004 279)`): primary dark-mode text.
- **Dark Metadata** (`oklch(0.72 0.008 279)`): secondary dark-mode text.

### Semantic

- **Validation Red** (`oklch(0.58 0.22 27)`, dark `oklch(0.7 0.19 22)`): destructive actions, validation errors, failed generation, and compatibility failures.

### Named Rules

**The Action-Only Accent Rule.** Primary is for actions, selection, focus, state, and command prompts. Do not use it as decoration.

**The No Gradient Text Rule.** Emphasis comes from weight, size, mono labels, or solid color. Do not use gradient text.

**The Real Surface Rule.** The default generated app background is `oklch(0.955 0.004 279)`, not pure white. Cards use `oklch(0.99 0.003 279)`.

## 3. Typography

**Display Font:** Geist Mono, then SFMono-Regular, Menlo, Monaco, Consolas, monospace.
**Body Font:** Geist, then ui-sans-serif, system-ui, sans-serif.
**Label Font:** Geist Mono.

Mono identifies objects: commands, files, package names, technical labels, state markers, and copyable content. Sans carries body copy and normal controls. Do not introduce a decorative display font.

### Hierarchy

- **Display** (700, 1.25rem, 1.2): page-level tool headings, command titles, and file-like labels.
- **Headline** (700, 1.125rem, 1.25): panel headings, auth titles, and generated shell headings.
- **Title** (500, 0.875rem, 1.4): card titles, form group titles, status titles, and menu labels.
- **Body** (400, 0.75rem, 1.625): product descriptions, status descriptions, list descriptions, and helper text.
- **Label** (500, 0.6875rem, 1.25, uppercase): panel labels, metadata, section labels, badges, and technical tags.

### Named Rules

**The Mono Means Object Rule.** Mono is for commands, files, technical names, state labels, and copyable content. Do not set all body copy in mono.

**The Fixed Scale Rule.** Product surfaces use fixed rem scale. Do not use fluid heading sizes in app shells or tool panels.

## 4. Elevation

The system is flat by default. Layering comes from background tone, border, ring, and stable spacing. Shadow is a supporting effect, not the source of quality.

### Shadow Vocabulary

- **Subtle Surface** (`0px 4px 6px 0px hsl(240 30% 25% / 0.12), 0px 1px 2px -1px hsl(240 30% 25% / 0.12)`): light-mode lightweight overlays and hover states.
- **Auth Focus Surface** (`0px 18px 50px oklch(0.2 0.01 279 / 0.10)`): centered auth panels and high-focus generated cards.
- **Dark Overlay** (`0px 4px 8px 0px hsl(240 30% 5% / 0.2), 0px 1px 2px -1px hsl(240 30% 5% / 0.15)`): dark-mode dropdowns, popovers, and overlays.
- **Panel Ring** (`ring-1 ring-border/35` or `border border-border`): default panel hierarchy. Prefer this over shadow.

### Named Rules

**The Flat By Default Rule.** Static surfaces use borders, rings, and tonal changes. Overlays, hover states, focus cards, and clickable previews may use shadow.

## 5. Generated Template Rules

These rules apply to files emitted by `packages/template-generator/templates`.

### Shared Tokens

- Generated shadcn/Base UI templates must include the neutral OKLCH tokens from this document.
- The shared UI package is the style foundation. Do not fork shared shadcn/Base UI component templates for one-off page styling.
- Buttons, inputs, cards, dropdowns, labels, and skeletons should keep standard shadcn/Base UI behavior and familiar states.
- Long commands, package names, file paths, and labels must wrap or scroll instead of overflowing.

### Header

- Headers are narrow and utility-focused: `h-14`, `max-w-6xl`, border bottom, and `bg-card/90`.
- Search-looking controls must be real. They either link to docs or open a real search interface.
- GitHub, theme, auth, and docs actions should use familiar icon or text affordances.
- Header style should stay close to better-auth-ui's restrained shell, not a large marketing nav.

### Home Shell

- Generated home content should feel like a small workbench: stack status, command output, file preview, and rules.
- Use labels such as `GENERATED_STACK`, `CLI_COMMAND`, `PROJECT_STATUS`, and `WORKBENCH_RULES`.
- Avoid oversized hero sections, fake metrics, repeated icon-card grids, and vague slogans.
- Page texture may use subtle grid lines, but content must remain readable.

### Auth Forms

- Better Auth forms use compact centered cards, `max-w-md`, `rounded-2xl`, `p-5 sm:p-6`, visible rings, and restrained shadow.
- Inputs use `h-11`, muted surfaces, rounded controls, clear labels, and visible focus rings.
- Submit actions may use a rounded pill form, but the card itself should remain compact.
- Do not show passkey, OAuth, reset, or provider actions unless the generated stack actually supports them.

### Dashboards And User Menus

- Dashboard surfaces should show useful authenticated state, not a plain `Dashboard` heading.
- Destructive menu actions use the shared destructive variant, not ad hoc red utility classes.
- User menus, empty states, and status panels should follow the same neutral tokens as the shell.

## 6. Components

### Buttons

- **Shape:** shared UI defaults to `rounded-lg`. Icon and small sizes follow the tighter radius tokens.
- **Primary:** `bg-primary text-primary-foreground`, 32px default height, 36px large height.
- **Hover / Focus:** hover uses a slight background change. Focus uses `focus-visible:ring-3 focus-visible:ring-ring/50`.
- **Secondary / Ghost:** outline uses border and background. Ghost only reveals muted background on hover.

### Chips

- **Style:** technical choices, presets, and package managers use small mono labels, usually `bg-muted/20 px-2 py-1 text-[11px] uppercase`.
- **State:** selected uses a subtle primary tint. Unselected uses muted foreground, with stronger foreground only on hover.

### Cards / Containers

- **Corner Style:** shared `Card` defaults to `rounded-xl`. Inner panels use `rounded-lg` or `rounded-md`.
- **Background:** primary surfaces use `bg-card`, internal command blocks use muted surfaces.
- **Shadow Strategy:** no shadow by default. Use rings and borders first.
- **Internal Padding:** compact panels use 8 to 12px, regular panels use 16px, roomy page sections use at most 24px.

### Inputs / Fields

- **Style:** compact product fields use clear borders, muted surfaces, readable placeholder color, and no decorative glow.
- **Focus:** focus must be visible through border and ring.
- **Error / Disabled:** error uses destructive border and tint. Disabled lowers opacity and removes pointer interaction.

### Navigation

- **Style:** top and side navigation remain compact. Active state uses muted background or primary tint, not a saturated block.
- **Typography:** brand and tool state may use mono. Navigation labels stay short.
- **Responsive Behavior:** mobile uses structural changes such as collapsed navigation or segmented controls, not fluid typography.

## 7. Do's And Don'ts

### Do

- Use `oklch(0.22 0.012 279)` or `oklch(0.92 0.006 279)` for primary action, selection, focus, and command prompts.
- Use mono uppercase labels for objects and state, such as `CLI_COMMAND`, `SELECTED_STACK`, and `COMPATIBILITY_LOG`.
- Build hierarchy with `bg-muted`, `ring-1`, `border-border/50`, and stable spacing.
- Keep Base UI backed shadcn components replaceable.
- Make every visible affordance real.
- Keep generated templates polished, compact, and easy to replace.

### Don't

- Do not create low-quality SaaS landing pages with oversized heroes, vague slogans, or repeated icon-card grids.
- Do not use glassmorphism as the default visual language.
- Do not use gradient text.
- Do not use decorative motion that does not communicate state.
- Do not fork or rewrite shadcn/Base UI component templates for local style wins.
- Do not use colored side stripes wider than 1px. Use full borders, icons, badges, or background tint instead.
- Do not add fake provider buttons, fake search, or fake settings controls.
