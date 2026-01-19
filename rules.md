# Development Rules for AI-Assisted Development

This document establishes strict engineering standards for this Next.js TypeScript portfolio project. These rules guide both AI assistants and developers to maintain code quality, type safety, and long-term maintainability.

All code must adhere to these standards. Exceptions must be documented and justified. These rules prioritize long-term maintainability over short-term speed.

## 1. Introduction & Philosophy

### Purpose

This project follows **strict engineering standards** to ensure:

- Type safety and compile-time error prevention
- Code maintainability and readability
- Consistency across the codebase
- Reduced technical debt

### Target Audience

These rules apply to:

- AI assistants helping with code generation and modification
- All developers working on the project
- Code review processes

### Tooling

This project uses:

- **TypeScript** with `strict: true` enabled in [`tsconfig.json`](tsconfig.json)
- **ESLint** configured in [`eslint.config.mjs`](eslint.config.mjs)
- **Prettier** for code formatting (see `npm run format` and `npm run format:check`)
- **npm scripts**: Use `npm run check` to verify linting, formatting, and type checking

## 2. TypeScript Standards

### Strict Mode

- `strict: true` must remain enabled in [`tsconfig.json`](tsconfig.json)
- Do not disable strict mode or any strict checks
- If strict mode causes issues, fix the underlying problems rather than disabling checks

### Explicit Types

- **Required** for all function parameters and return types
- **Required** for complex objects and data structures
- Type inference is acceptable for simple local variables (e.g., `const count = 0`)

```typescript
// Good: Explicit return type
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Bad: Missing return type
function calculateTotal(items: Item[]) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### No `any` Type

- Avoid `any` type entirely
- Use `unknown` when the type is uncertain, then narrow with type guards
- If `any` seems necessary, reconsider the design or use proper type narrowing

```typescript
// Good: Using unknown with type guard
function parseUserData(data: unknown): User {
  if (isUserData(data)) {
    return data;
  }
  throw new Error("Invalid user data");
}

// Bad: Using any
function parseUserData(data: any): User {
  return data;
}
```

### Type Assertions

- Use type assertions sparingly
- Prefer type guards and runtime validation over assertions
- If assertions are necessary, document why and ensure safety

```typescript
// Good: Type guard
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// Bad: Unsafe assertion
const value = data as string;
```

### Interface vs Type

- Prefer `interface` for object shapes and component props
- Use `type` for unions, intersections, and computed types
- Use `type` when extending/intersecting primitives

```typescript
// Good: Interface for object shape
interface User {
  id: string;
  name: string;
  email: string;
}

// Good: Type for union
type Status = "pending" | "approved" | "rejected";

// Good: Type for complex composition
type AdminUser = User & { permissions: Permission[] };
```

## 3. Code Style & Formatting

### Prettier

- All files must pass `npm run format:check`
- Run `npm run format` before committing
- Do not disable Prettier for specific files or sections
- Prettier configuration is project-wide

### ESLint

- No warnings allowed; fix all ESLint violations
- Do not disable ESLint rules without justification
- If a rule seems incorrect, update the ESLint configuration appropriately
- Check ESLint output with `npm run lint`

### File Length

- Maximum ~300 lines per file
- If a file exceeds this limit, split into smaller, focused modules
- Each file should have a single, clear purpose

### Naming Conventions

- **Components**: PascalCase (e.g., `Hero.tsx`, `UserProfile.tsx`)
- **Functions and variables**: camelCase (e.g., `calculateTotal`, `userCount`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`, `API_BASE_URL`)
- **Types and interfaces**: PascalCase with descriptive names (e.g., `UserData`, `ApiResponse`)

```typescript
// Good: Proper naming
const MAX_ATTEMPTS = 3;
interface UserProfile {
  id: string;
}
function fetchUserData(userId: string): Promise<UserProfile> {}

// Bad: Inconsistent naming
const maxAttempts = 3;
type userProfile = { id: string };
function FetchUserData(UserId: string) {}
```

## 4. Scope Control & Architecture

### Single Responsibility Principle

- One concern per function/component
- Functions should do one thing and do it well
- If a function handles multiple concerns, split it

```typescript
// Good: Single responsibility
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sendEmail(to: string, subject: string, body: string): Promise<void> {
  // Email sending logic
}

// Bad: Multiple responsibilities
function validateAndSendEmail(
  email: string,
  subject: string,
  body: string,
): Promise<void> {
  // Validation AND sending in one function
}
```

### File Organization

- Logical grouping of related functionality
- One component/utility per file (unless tightly related)
- Use clear file and folder names that reflect their purpose
- Group related files in directories (e.g., `components/`, `utils/`, `types/`)

### Dependency Management

- Explicit imports; avoid barrel exports that hide dependencies
- Avoid circular dependencies between modules
- If circular dependencies occur, refactor to break the cycle
- Group imports: external libraries, then internal modules

```typescript
// Good: Clear imports
import { useState, useEffect } from "react";
import { fetchUserData } from "@/utils/api";
import type { User } from "@/types/user";

// Bad: Barrel export hiding dependencies
import { everything } from "@/lib";
```

### Function Complexity

- Keep functions under 50 lines
- If a function exceeds 50 lines, refactor into smaller functions
- Extract complex logic into separate, well-named functions
- Use early returns to reduce nesting

## 5. Documentation Requirements

### JSDoc Comments

- **Required** for all public functions and exported components
- Include `@param` for all parameters
- Include `@returns` for return values (if not void)
- Include `@throws` if the function can throw errors

```typescript
/**
 * Calculates the total price of items with tax applied.
 *
 * @param items - Array of items with price property
 * @param taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @returns Total price including tax
 * @throws {Error} If items array is empty
 */
function calculateTotalWithTax(items: Item[], taxRate: number): number {
  if (items.length === 0) {
    throw new Error("Items array cannot be empty");
  }
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return subtotal * (1 + taxRate);
}
```

### Inline Comments

- Explain "why" for non-obvious decisions, not "what"
- Avoid comments that restate the code
- Use comments to document business logic, edge cases, or workarounds

```typescript
// Good: Explains why
// Using Date.now() instead of new Date() for better performance in tight loops
const timestamp = Date.now();

// Bad: Restates the obvious
// Assign timestamp to Date.now()
const timestamp = Date.now();
```

### Component Documentation

- Document component props with JSDoc
- Add comments for each prop explaining its purpose
- Include usage examples for complex components

```typescript
interface HeroProps {
  /** Full name displayed in the hero section */
  name: string;
  /** Professional role or title */
  role: string;
  /** Brief description of the person (max 200 characters) */
  description: string;
  // ... other props
}

/**
 * Hero component displaying profile information.
 *
 * @example
 * <Hero name="John Doe" role="Software Engineer" description="..." />
 */
export default function Hero({ name, role, description }: HeroProps) {
  // Component implementation
}
```

## 6. Testing Standards

### Unit Tests

- **Required** for complex business logic and utility functions
- Test edge cases, error conditions, and boundary values
- Keep tests focused and isolated
- Mock external dependencies

### Integration Tests

- **Required** for critical user flows
- Test complete workflows end-to-end
- Verify interactions between components/services
- Use realistic test data

### Test Naming

- Descriptive names following pattern: `describe('ComponentName', () => { it('should do X when Y', () => { ... }) })`
- Test names should clearly state what is being tested and expected behavior

```typescript
describe("calculateTotalWithTax", () => {
  it("should calculate total with tax for valid items", () => {
    const items = [{ price: 100 }, { price: 50 }];
    const result = calculateTotalWithTax(items, 0.08);
    expect(result).toBe(162);
  });

  it("should throw error when items array is empty", () => {
    expect(() => calculateTotalWithTax([], 0.08)).toThrow(
      "Items array cannot be empty",
    );
  });
});
```

### Coverage Goals

- Aim for 80%+ coverage on business logic
- Coverage will be enforced by CI when testing infrastructure is added
- Focus coverage on critical paths and business logic, not trivial getters/setters

## 7. AI Collaboration Guidelines

### Decision Explanation

- Always explain architectural choices and trade-offs
- Document why a particular approach was chosen over alternatives
- Include context about constraints or requirements that influenced decisions

### Explicit Patterns

- Prefer explicit code patterns over shortcuts or magic
- Make intent clear through code structure and naming
- Avoid clever one-liners that obscure meaning

```typescript
// Good: Explicit and clear
const isUserActive =
  user.status === "active" && user.lastLoginDate > thirtyDaysAgo;

// Bad: Clever but unclear
const isUserActive =
  user.status === "active" && user.lastLoginDate > Date.now() - 2592000000;
```

### Context Provision

- When making changes, mention affected files and dependencies
- Explain how changes relate to existing code
- Consider impact on other parts of the system

### Code Review Mindset

- AI should suggest best practices, not just quick fixes
- Propose refactorings that improve maintainability
- Flag potential issues even if code "works"

### Refactoring Priority

- Prioritize maintainability and type safety over brevity
- Prefer readable code over clever code
- Refactor when patterns become repetitive or complex

## 8. Git & Version Control

### Commit Messages

- Follow **Conventional Commits** format
- Format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Scope is optional but recommended for larger projects

**Examples:**

```
feat(auth): add user authentication flow
fix(hero): correct image aspect ratio display
docs(readme): update installation instructions
style(prettier): format codebase with Prettier
refactor(utils): extract validation logic into separate function
test(hero): add unit tests for Hero component
chore(deps): update Next.js to 16.1.2
```

### Commit Size

- Small, logical commits
- One concern per commit
- Each commit should represent a complete, working change
- Avoid "WIP" or "fix previous commit" commits

### Branch Strategy

- Use clear, descriptive branch names
- Feature branches for significant changes: `feat/feature-name`
- Bug fix branches: `fix/issue-description`
- Keep branches focused and short-lived

## 9. Dependencies & External Libraries

### Approval Process

- Evaluate necessity before adding dependencies
- Consider maintenance burden and community support
- Prefer well-maintained, popular libraries
- Check if functionality can be implemented with existing dependencies

### Security

- Keep dependencies up to date
- Run `npm audit` regularly to check for vulnerabilities
- Address security vulnerabilities promptly
- Review dependency changes before upgrading

### Bundle Size

- Consider impact of new dependencies on bundle size
- Use bundle analyzers to track size impact
- Prefer lightweight alternatives when possible
- Tree-shake unused code

### Type Definitions

- Ensure TypeScript definitions exist for all dependencies
- Prefer packages with built-in TypeScript support
- Use `@types/*` packages for JavaScript libraries without types
- Avoid dependencies without type definitions unless absolutely necessary

## 10. Exception Handling

### Error Boundaries

- **Required** for React components that may fail
- Implement error boundaries at appropriate component levels
- Provide fallback UI for error states
- Log errors for debugging

```typescript
"use client";

import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: unknown): void {
    // Log error to error reporting service
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
```

### Type-Safe Errors

- Use typed error objects, not string messages
- Create custom error classes when appropriate
- Include context in error objects

```typescript
// Good: Typed error class
class ValidationError extends Error {
  constructor(
    message: string,
    public field: string,
    public value: unknown,
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

// Usage
if (!isValidEmail(email)) {
  throw new ValidationError("Invalid email format", "email", email);
}

// Bad: String error
throw "Invalid email";
```

### Logging

- Log errors with context (what, where, when)
- Use structured logging when possible
- Avoid `console.error` in production; use proper logging service
- Include relevant data in error logs for debugging

---

## Enforcement

These rules are enforced through:

- **Pre-commit checks**: Run `npm run check` before committing
- **CI/CD**: Automated checks in continuous integration (when configured)
- **Code review**: All changes must be reviewed against these standards

Remember: **When in doubt, choose the more maintainable, type-safe, and explicit solution.**
