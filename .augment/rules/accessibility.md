---
type: "manual"
description: "Web accessibility guidelines and WCAG compliance standards"
tags: [accessibility, a11y, wcag, inclusive-design]
---

# Accessibility Rules

## WCAG 2.1 AA Compliance
- All interactive elements must be keyboard accessible with visible focus indicators.
- Provide alternative text for all images, icons, and non-text content.
- Ensure color contrast ratios meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text).
- Use semantic HTML elements (headings, lists, buttons, links) for proper structure.
- Implement proper heading hierarchy (h1 → h2 → h3) without skipping levels.

## Screen Reader Support
- Use ARIA labels, descriptions, and roles where semantic HTML is insufficient.
- Ensure all form inputs have associated labels or aria-label attributes.
- Provide skip links for keyboard users to bypass repetitive navigation.
- Use aria-live regions for dynamic content updates and notifications.
- Test with screen readers (NVDA, JAWS, VoiceOver) during development.

## Keyboard Navigation
- All interactive elements must be reachable and operable via keyboard only.
- Implement logical tab order that follows visual layout and content flow.
- Provide keyboard shortcuts for frequently used actions where appropriate.
- Ensure modal dialogs trap focus and return focus to trigger element on close.
- Use proper focus management in single-page applications during route changes.

## Visual Design
- Do not rely solely on color to convey information or indicate actions.
- Ensure text can be resized up to 200% without horizontal scrolling.
- Provide sufficient spacing between interactive elements (minimum 44px touch targets).
- Use clear, simple language and provide definitions for technical terms.
- Implement dark mode support with proper contrast ratios.

## Testing and Validation
- Run automated accessibility tests using axe-core or similar tools in CI/CD.
- Perform manual testing with keyboard-only navigation.
- Test with actual assistive technologies, not just automated tools.
- Include accessibility testing in the definition of done for all features.
- Conduct periodic accessibility audits with external experts.

## Cross-References
- See @frontend-ui for UI component accessibility requirements.
- See @testing-strategy for accessibility testing integration.
- See @code-review-automation for automated accessibility checks.
