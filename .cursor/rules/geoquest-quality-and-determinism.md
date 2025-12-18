# GeoQuest Quality & Determinism Rules

## Code Quality

### No Console Logs
- ❌ Remove all `console.log()`, `console.error()`, `console.warn()` from production code
- ✅ Use proper error handling and React error boundaries instead
- ✅ For debugging, use `console.debug()` with a guard: `if (import.meta.env.DEV) console.debug(...)`

### Type Safety
- ❌ Never use `any` type
- ✅ Use `unknown` if type is truly unknown, then narrow with type guards
- ✅ If `any` is unavoidable, add inline comment: `// eslint-disable-next-line @typescript-eslint/no-explicit-any -- [justification]`

## Accessibility

### Semantic HTML
- ✅ Use semantic elements: `<button>`, `<article>`, `<section>`, `<nav>`, `<main>`
- ❌ Avoid `<div onClick>` - use `<button>` instead
- ✅ Use proper heading hierarchy (`<h1>` → `<h2>` → `<h3>`)

### Descriptive Labels
- ✅ All buttons must have descriptive text or `aria-label`
- ✅ Form inputs must have associated `<label>` or `aria-labelledby`
- ✅ Icons-only buttons require `aria-label`: `<button aria-label="Close dialog">✕</button>`

## Determinism for Testing

### Date Injection Pattern
Any "daily" logic (e.g., daily quiz selection) must accept an optional `Date` parameter:

```typescript
// ✅ Good: Date can be injected for testing
function getDailyQuiz(date: Date = new Date()): QuizQuestion {
  const dayKey = date.toDateString()
  // ... deterministic logic using dayKey
}

// ❌ Bad: Hard-coded Date, not testable
function getDailyQuiz(): QuizQuestion {
  const dayKey = new Date().toDateString()
  // ... cannot test with different dates
}
```

### Pure Functions
- ✅ Daily logic functions should be pure (same input → same output)
- ✅ Accept `Date` as parameter with default: `date: Date = new Date()`
- ✅ Use UTC dates for consistency: `date.toISOString().split('T')[0]`

## Examples

### ❌ Bad
```typescript
function getDailyQuiz() {
  console.log('Fetching quiz')
  const today: any = new Date()
  return quizData[today.getDay()]
}
```

### ✅ Good
```typescript
function getDailyQuiz(date: Date = new Date()): QuizQuestion {
  const dayKey = date.toISOString().split('T')[0] // YYYY-MM-DD
  return quizData[dayKey] ?? getDefaultQuiz()
}
```

