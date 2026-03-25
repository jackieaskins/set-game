# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this Set Game repository.

## Project Overview

This is a **SvelteKit TypeScript** project implementing a daily Set card game. The project uses:

- **Framework**: SvelteKit with Svelte 5 (modern syntax)
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm
- **Styling**: Scoped CSS with modern CSS features
- **State Management**: Class-based state with Svelte reactivity
- **Build Tool**: Vite

## Development Commands

### Core Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Sync SvelteKit (run after adding new routes)
pnpm prepare
```

### Code Quality Commands

```bash
# Type checking (recommended before commits)
pnpm check

# Type checking with watch mode
pnpm check:watch

# Lint and format check
pnpm lint

# Auto-format code
pnpm format
```

### Pre-commit Hooks

The project automatically runs on every commit:

- `eslint --fix` - Auto-fixes linting issues
- `prettier --write` - Formats code
- `cz check` - Validates commit message format

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode**: Enabled
- **Explicit types**: Required for function return types (`@typescript-eslint/explicit-module-boundary-types`)
- **No any**: Avoid `any` types, use proper typing
- **Readonly**: Use `readonly` for immutable properties

### Import Patterns

```typescript
// Internal library imports - use $lib alias
import { Card, Alert } from "$lib/components";
import { CARD_SVG_WIDTH } from "$lib/constants";
import { type CardDetails } from "$lib/types";

// Relative imports for component-specific files
import DiamondShape from "./DiamondShape.svelte";
import OvalShape from "./OvalShape.svelte";
```

### Svelte 5 Modern Syntax

```typescript
// Props destructuring with $props()
let { cardDetails, disabled = false, isSelected = false }: CardProps = $props();

// Reactive state with $state()
let selectedCards: CardDetails[] = $state([]);

// Computed values with $derived()
let hasSelectedMaxCards = $derived(selectedCards.length >= 3);

// Computed callbacks with $derived.by()
let fill = $derived.by(() => {
  switch (pattern) {
    case Pattern.Solid:
      return color;
    case Pattern.Striped:
      return `url(#${patternId})`;
    case Pattern.Outlined:
      return "none";
  }
});

// Side effects with $effect()
$effect(() => {
  if (pageVisibilityState.isVisible) {
    timer.start();
  } else {
    timer.pause();
  }
});
```

### Component Structure

```svelte
<script lang="ts">
  // 1. Imports (external libraries first, then internal)
  // 2. Type definitions (interfaces, types)
  // 3. Constants and mappings
  // 4. Props with $props()
  // 5. State with $state()
  // 6. Derived values with $derived()
  // 7. Effects with $effect()
  // 8. Functions and event handlers
</script>

<!-- Template with snippets for reusable parts -->
{#snippet cardSVG()}
  <SVG>...</SVG>
{/snippet}

<!-- Component usage -->
{@render cardSVG()}

<style>
  /* Scoped styles with CSS variables */
  .card {
    --select-color: #d3d3d3;
    background-color: white;
  }

  /* Modern CSS nesting */
  button.card {
    &:hover:enabled {
      border-color: var(--select-color);
    }
  }
</style>
```

### State Management Pattern

```typescript
// Class-based state with Svelte reactivity
export default class GameState {
  // Public reactive properties
  public readonly date = new SvelteDate();

  // Private state
  #sets: CardSet[] = $state([]);

  // Constructor with dependency injection
  public constructor(messageState: MessageState) {
    // Effects for side effects
    $effect(() => {
      // Auto-save to localStorage
      localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
    });
  }

  // Public getters for computed values
  public get timeElapsed(): number {
    return this.#timer.timeElapsed + this.#timerOffset;
  }

  // Public methods for state mutations
  public tryAddSet(cards: CardDetails[]): void {
    if (!isValidSet(cards)) {
      this.#messageState.message = { type: "error", text: "Not a set. :(" };
      return;
    }
    this.#sets = [new CardSet(cards), ...this.#sets];
  }
}
```

### Type Definitions

```typescript
// Const assertions for enums
export const Color = {
  Red: "red",
  Green: "green",
  Purple: "purple",
} as const;
export type Color = (typeof Color)[keyof typeof Color];

// Readonly interfaces for data transfer
export interface CardDetailsJSON {
  readonly count: Count;
  readonly color: Color;
  readonly pattern: Pattern;
  readonly shape: Shape;
}

// Class definitions with public readonly properties
export class CardDetails {
  constructor(
    public readonly count: Count,
    public readonly color: Color,
    public readonly pattern: Pattern,
    public readonly shape: Shape,
  ) {}
}
```

### CSS Guidelines

- **Scoped styles**: Each component has its own scoped `<style>` block
- **CSS variables**: Use for theme colors and repeated values
- **Modern nesting**: Use `&` for nested selectors
- **Mobile-first**: Design for touch devices with `touch-action: manipulation`
- **System fonts**: Use the defined font stack from `main.css`

### Error Handling

```typescript
// User-friendly error messages through state
public tryAddSet(cards: CardDetails[]): void {
  if (!isValidSet(cards)) {
    this.#messageState.message = {
      type: "error",
      text: "Not a set. :("
    };
    return;
  }

  if (this.sets.some((set) => set.hasAllCards(cards))) {
    this.#messageState.message = {
      type: "error",
      text: "You already found that set. :("
    };
    return;
  }

  // Success case
  this.#messageState.message = {
    type: "success",
    text: "Yay! You found a new set!"
  };
}
```

### File Organization

```
src/lib/
├── components/          # Reusable UI components
│   ├── Card/           # Component-specific folder
│   │   ├── Card.svelte
│   │   ├── DiamondShape.svelte
│   │   └── index.ts    # Barrel export
│   └── index.ts        # Main barrel export
├── context/            # Svelte context providers
├── state/              # State management classes
├── utils/              # Utility functions
├── types.ts            # Type definitions
└── constants.ts        # Application constants
```

### Naming Conventions

- **Components**: PascalCase (`Card.svelte`, `GameState.svelte.ts`)
- **Variables/Functions**: camelCase (`selectedCards`, `tryAddSet`)
- **Constants**: UPPER_SNAKE_CASE (`CARD_SVG_WIDTH`, `ONE_SECOND_MS`)
- **Types**: PascalCase (`CardDetails`, `MessageType`)
- **Interfaces**: PascalCase with `I` prefix avoided (use descriptive names)

### Testing

**Note**: This project currently has no test framework configured. When adding tests:

1. Choose an appropriate testing framework (Vitest recommended for SvelteKit)
2. Add test configuration to `package.json` and `vite.config.ts`
3. Follow the project's existing patterns for test organization

### Git Workflow

- **Branch**: Main development happens on `main` branch
- **Commits**: Use commitizen for conventional commit messages
- **Pre-commit**: Automatic formatting and linting
- **Deployment**: GitHub Actions for static site deployment

## Common Patterns

### Context Usage

```typescript
// Set context in parent component
const gameState = setGameContext(new GameState(alertState));

// Get context in child component
const gameState = getGameContext();
```

### Barrel Exports

```typescript
// src/lib/components/index.ts
export * from "./Alert";
export * from "./Card";
export * from "./SVG";

// Usage in other files
import { Alert, Card, SVG } from "$lib/components";
```

### Component Props Interface

```typescript
interface CardProps {
  cardDetails: CardDetails;
  disabled?: boolean;
  isSelected?: boolean;
  onclick?: () => void;
}
```

## Development Notes

- The project uses **pnpm** as the package manager - always use `pnpm` commands
- **Svelte 5** modern syntax is required - avoid legacy Svelte syntax
- **TypeScript strict** mode is enabled - all types must be explicit
- **No test framework** is currently configured - tests need to be added if needed
- **Pre-commit hooks** will automatically format and lint code
- **LocalStorage** is used for game state persistence
- **Daily game** logic uses date-based seed for card generation
