# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Korean-language React project demonstrating large-scale web application development patterns based on Addy Osmani's "Building Large Scale Web Apps: A React Field Guide". The project serves as a practical implementation and study guide for 18 chapters covering modern React development practices.

## Development Commands

### Core Commands

- `pnpm dev` - Start development server (Vite)
- `pnpm build` - Build for production (TypeScript compile + Vite build)
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting without writing
- `pnpm preview` - Preview production build

### Testing

- `pnpm test:unit` - Run Jest unit tests
- `pnpm test:e2e` - Run Playwright e2e tests with UI
- Unit tests: Located in `src/tests/unit/` with pattern `*.test.(ts|tsx)`
- E2E tests: Located in `src/tests/e2e/` with pattern `*.spec.ts`
- Test setup: `src/setupTests.ts` (configured in Jest)

## Architecture

### Tech Stack

- **Framework**: React 19 with TypeScript
- **Routing**: React Router 7
- **Build Tool**: Vite
- **Testing**: Jest (unit) + Playwright (e2e)
- **Linting**: ESLint 9 with TypeScript ESLint
- **Formatting**: Prettier 3.6 (integrated with ESLint via eslint-config-prettier)
- **Analytics**: Statsig (web analytics, A/B testing, session replay)

### Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── base/         # Base components (ConfettiButton)
│   ├── common/       # Common components (StatsigProvider)
│   ├── context/      # Context-related components
│   └── counter/      # Counter feature components
├── contexts/         # React contexts
│   └── colorScheme/  # Color scheme context and provider
├── hooks/            # Custom React hooks
├── pages/            # Route components (lazy-loaded except main routes)
├── reducers/         # useReducer logic
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── tests/            # Test files (unit + e2e)
```

### Key Patterns

- **Lazy Loading**: Most pages are lazy-loaded with `React.lazy()`
- **Context Pattern**: Color scheme management via React Context
- **Component Composition**: Modular component structure (Post, PostHeader, PostContent, PostFooter)
- **Custom Hooks**: Reusable logic in hooks directory
- **Type Safety**: Full TypeScript integration with strict typing

### Features Demonstrated

- Dynamic imports with interaction triggers
- Intersection Observer for performance optimization
- Context API with useReducer
- RTL text support
- A/B testing with Statsig
- Color scheme detection and management

## Path Aliases

- `@/*` maps to `src/*` (configured in Jest, may need Vite config update for consistency)

## Notes Structure

The `/notes` directory contains Korean documentation for each chapter (ch1-ch18) with implementation examples and explanations. These serve as reference material for understanding the demonstrated patterns.
