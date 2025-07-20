---
mode: auto
description: "Frontend UI development standards for Next.js applications"
tags: [frontend, nextjs, ui]
type: "manual"
---
## Next.js Architecture
- Use App Router with server components by default; client components only where stateful interaction is required.
- Implement proper loading states with Suspense boundaries and skeleton components.
- Use Next.js Image component for optimized image loading with proper alt text.
- Implement proper SEO with metadata API and structured data where applicable.
- Use dynamic imports for code splitting and lazy loading of heavy components.

## Form Handling
- Use react-hook-form for all form implementations with proper TypeScript integration.
- Implement client-side validation using Valibot or Zod schemas.
- Provide real-time validation feedback with clear error messages.
- Use controlled components for form inputs with proper state management.
- Implement proper form submission handling with loading states and error handling.

## UI Components and Design System
- Use shadcn/ui components as the foundation; customize through CSS variables and Tailwind.
- Never inline raw HTML tables; use proper table components with sorting and pagination.
- Implement consistent spacing using Tailwind's spacing scale (4px increments).
- Use semantic HTML elements and proper ARIA attributes for accessibility.
- Implement responsive design with mobile-first approach using Tailwind breakpoints.

## State Management
- Use React's built-in state (useState, useReducer) for local component state.
- Use Zustand or React Context for global state management when needed.
- Implement proper data fetching with SWR or TanStack Query for server state.
- Use React.memo, useMemo, and useCallback for performance optimization.
- Avoid prop drilling; use composition patterns and context when appropriate.

## Styling and Theming
- Use Tailwind CSS for styling with consistent design tokens and spacing.
- Implement dark mode support using CSS variables and proper color contrast.
- Use CSS modules or styled-components for component-specific styles when needed.
- Follow consistent naming conventions for CSS classes and custom properties.
- Implement proper focus states and hover effects for interactive elements.

## Cross-References
- See @accessibility for comprehensive accessibility requirements.
- See @performance for frontend performance optimization.
- See @testing-strategy for frontend testing approaches.
- See @coding-standards for TypeScript and component standards.
