# Product

## Register

product

## Users

The primary users are TypeScript full-stack developers, template authors, open-source contributors, and team members who need to evaluate stack choices quickly. They usually know which frontend, backend, API layer, database, ORM, authentication, and deployment options they want. They need a trustworthy tool that turns those choices into a clean project scaffold.

Their context is task-driven. They generate projects from the CLI, configure stacks in the web Stack Builder, copy commands, read docs to confirm best practices, and inspect generated output in previews. The interface should help them decide, adjust, copy, and verify quickly. It should not try to sell the concept back to them.

## Product Purpose

Better T Stack is a modern CLI and visual Stack Builder for generating end-to-end type-safe TypeScript projects. Its value is not hiding technical choices. Its value is making those choices explicit, composable, minimal, and easy to replace.

A successful interface helps users complete three jobs faster:

1. Understand the current stack choices.
2. Notice incompatibilities, missing requirements, or recommended adjustments.
3. Get a command or generated project that can be run immediately.

Generated templates should follow the same promise: polished by default, low on ceremony, and easy to turn into a real product.

## Brand Personality

precise, terminal-native, restrained

The tone should feel like a credible developer tool: accurate, direct, and concise. The visual system may borrow from terminals, file trees, command blocks, and workbench layouts, but it should never sacrifice readability to cosplay a terminal. Senior developers should read the product as actively maintained infrastructure, not as a marketing template.

## Anti-References

Avoid low-quality SaaS landing-page patterns: oversized hero sections, vague value claims, repetitive icon-card grids, decorative metrics, and empty marketing composition.

Avoid glassmorphism as a default language. Do not rely on blur, translucent panels, glowing backgrounds, or floating decoration to create perceived quality.

Avoid gradient text. Primary color should express action, selection, focus, and state. It should not be used as decoration.

Avoid motion that does not serve the generation workflow. Motion is allowed for state changes, feedback, loading, reveal, and collapse. Nothing else needs choreography.

Avoid modifying shadcn/Base UI component templates for one-off styling. Style should come from tokens, composition, layout, and generated page shells so the normal shadcn install and replacement path stays intact.

## Design Principles

1. Practice the generator's promise. The product and generated templates should express minimal templates, zero bloat, and choose only what you need.
2. Configuration is the product. The most important content is the current stack, command, compatibility state, file preview, and next action.
3. Terminal-native, not terminal cosplay. Use mono labels, command blocks, file-tree language, and compact panels, while keeping interactions modern and readable.
4. Tokens over forks. Use color, type, radius, spacing, and composed components to create the style. Do not turn shared shadcn/Base UI components into private one-off components.
5. Dense when useful. Developer tools can carry more information density, but every panel still needs clear boundaries, stable layout, and readable hierarchy.
6. No fake affordances. If something looks clickable, searchable, copyable, or configurable, it should either work or be visually presented as static content.

## Template Direction

Generated templates should look close to the Better T Stack builder itself: compact, neutral, structured, and workbench-like. They should feel good enough to start from without becoming so branded that users need to undo the style immediately.

Auth screens should be quiet and coherent with the rest of the shell. Forms should use compact cards, rounded controls, clear labels, visible focus states, and real provider actions only when the generated stack actually supports them.

Headers should be narrow, predictable, and utility-focused. Navigation, theme controls, repository links, docs search, and auth entry points should use familiar affordances.

## Accessibility And Inclusion

The default target is WCAG AA. Every interactive element must support keyboard access and visible focus. Color must not be the only way to express state. State should also be supported by text, iconography, or structure.

Motion must respect reduced-motion preferences and must not block the core task. Generated templates must remain readable on mobile and desktop. Buttons, commands, long paths, and technical labels must not overflow their containers.
