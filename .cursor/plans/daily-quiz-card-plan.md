# Daily Quiz Card Feature - Implementation Plan

## Overview
Add a "Daily Quiz Card" feature to GeoQuest Kids that displays a geography-related quiz question on the main page. The feature will start with mock data (deterministic local quiz) and later integrate with Open Trivia DB API.

---

## 1. Component Location & Integration

### Component Location
- **File**: `src/components/DailyQuizCard.tsx`
- **Styles**: `src/components/DailyQuizCard.css`
- **Service**: `src/services/quizApi.ts` (following the pattern of `countriesApi.ts`)

### Integration with App Component
The `DailyQuizCard` component should be integrated into `App.tsx` in the main content area:

```tsx
// In App.tsx
<main className="app-main">
  <DailyQuizCard />  {/* New component - appears at top */}
  <CountrySearch onSearchClick={() => setShowSpotlight(true)} />
  {showSpotlight && <CountrySpotlight onClose={() => setShowSpotlight(false)} />}
</main>
```

**Rationale**: 
- Placed above `CountrySearch` to give it visual prominence as a daily feature
- Maintains separation of concerns (component in `components/`, service logic in `services/`)
- Follows existing component pattern (TSX + CSS files)

---

## 2. Quiz Data Shape (TypeScript Interface)

### Proposed Interface Structure

**Location**: `src/services/quizApi.ts`

```typescript
export interface QuizQuestion {
  id: string
  question: string
  category: string  // e.g., "Geography", "Countries"
  difficulty: 'easy' | 'medium' | 'hard'
  type: 'multiple' | 'boolean'
  correctAnswer: string
  incorrectAnswers: string[]
  allAnswers: string[]  // Shuffled array of correct + incorrect
  explanation?: string  // Optional explanation shown after answer
}

export interface QuizResponse {
  question: QuizQuestion
  timestamp: number  // For daily rotation logic
  source: 'mock' | 'api'  // Track data source
}
```

**Alternative (Open Trivia DB API shape)**:
```typescript
// Matches Open Trivia DB response format
export interface OpenTriviaQuestion {
  category: string
  type: 'multiple' | 'boolean'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string  // HTML entities need decoding
  correct_answer: string
  incorrect_answers: string[]
}
```

**Rationale**:
- `allAnswers` pre-shuffled for UI simplicity
- `explanation` optional for kid-friendly learning
- `source` field enables debug mode visibility
- Separate interface for API response allows transformation layer

---

## 3. 6-Step Implementation Plan

### Step 1: Create TypeScript Interfaces & Mock Data
**Method**: **Agent**
- Create `src/services/quizApi.ts` with `QuizQuestion` and `QuizResponse` interfaces
- Implement mock quiz data (3-5 geography questions, deterministic)
- Create `getDailyQuizQuestion()` function that returns mock data
- Include date-based selection logic (same question per day)

**Deliverables**:
- TypeScript interfaces defined
- Mock function returning deterministic quiz question
- Date-based selection (e.g., `new Date().toDateString()` as seed)

---

### Step 2: Build DailyQuizCard Component (Mock-First)
**Method**: **Agent**
- Create `DailyQuizCard.tsx` component
- Create `DailyQuizCard.css` with kid-friendly styling
- Implement UI: question display, answer buttons, feedback (correct/incorrect)
- Use `useState` for selected answer, show result state
- Integrate with mock `getDailyQuizQuestion()` function
- Add loading state (using existing `LoadingSpinner` component)

**Deliverables**:
- Functional component with mock data
- Responsive, kid-friendly UI
- Answer selection and feedback display
- Loading state handling

---

### Step 3: Integrate DailyQuizCard into App Component
**Method**: **Agent**
- Update `App.tsx` to import and render `DailyQuizCard`
- Update `App.css` if needed for layout (quiz card positioning)
- Ensure responsive design (mobile-friendly)

**Deliverables**:
- DailyQuizCard visible on main page
- Proper layout integration
- No breaking changes to existing features

---

### Step 4: Create Open Trivia DB API Integration
**Method**: **Agent**
- Research Open Trivia DB API endpoint structure
- Create `fetchQuizFromAPI()` function in `quizApi.ts`
- Implement category filtering (Geography category: `category=22`)
- Add HTML entity decoding (e.g., `&quot;` → `"`)
- Transform API response to `QuizQuestion` interface
- Add error handling and fallback to mock data

**Deliverables**:
- API integration function
- Response transformation layer
- Error handling with mock fallback
- API tests (see Test Plan section)

---

### Step 5: Add Debug Mode & Browser Validation
**Method**: **Plan** (with Agent assistance)
- Add debug mode toggle (query param `?debug=true` or localStorage flag)
- In debug mode, display: question source (mock/api), timestamp, raw API response
- Add `@browser` validation: test in Chrome, Safari, Firefox
- Verify accessibility (keyboard navigation, screen reader support)
- Test on mobile devices (responsive design)

**Deliverables**:
- Debug mode implementation
- Browser compatibility validation
- Accessibility improvements
- Mobile responsiveness verified

---

### Step 6: Add Custom Hook & Command
**Method**: **Manual** (with Agent assistance)
- Create custom hook: `useDailyQuiz()` in `src/hooks/useDailyQuiz.ts`
- Hook should: fetch quiz, handle loading/error states, manage answer selection
- Create npm script command: `npm run quiz:test` (runs quiz-specific tests)
- Add Rule: Update `.cursorrules` or create rule file for quiz feature conventions
- Document hook usage in component

**Deliverables**:
- Custom React hook for quiz logic
- npm command for quiz testing
- Development rule/guideline document
- Hook documentation

---

## 4. Risks & Limitations of AI Assistance

### Risk 1: API Response Format Mismatch
**Risk**: Open Trivia DB API may return data in unexpected formats or change their schema, causing runtime errors that AI-generated code might not anticipate.

**Mitigation**: 
- Implement comprehensive error handling with fallback to mock data
- Add API response validation (type guards)
- Include API contract tests that verify expected response shape
- Monitor API changes and update transformation layer accordingly

**AI Limitation**: AI may not account for all edge cases in API responses (e.g., missing fields, HTML entity variations, encoding issues).

---

### Risk 2: Date-Based Determinism Logic Complexity
**Risk**: Daily quiz rotation logic (same question per day) may have timezone issues, date calculation bugs, or fail to reset properly, leading to incorrect "daily" behavior.

**Mitigation**:
- Use UTC dates for consistency across timezones
- Add unit tests for date-based selection logic
- Implement clear date boundaries (midnight UTC)
- Add debug logging to track date calculations

**AI Limitation**: AI-generated date logic may not consider timezone edge cases or daylight saving time transitions, requiring manual review and testing.

---

## 5. Minimal Test Plan

### What to Test

#### Unit Tests (Vitest)
1. **Mock Quiz Service**
   - `getDailyQuizQuestion()` returns valid `QuizQuestion`
   - Same question returned for same date
   - Different question for different dates
   - Mock data structure matches interface

2. **API Integration**
   - `fetchQuizFromAPI()` transforms API response correctly
   - HTML entity decoding works (`&quot;` → `"`, `&#039;` → `'`)
   - Error handling falls back to mock data
   - Category filtering (Geography only)

3. **Component Logic**
   - Answer selection updates state
   - Correct answer shows success feedback
   - Incorrect answer shows failure feedback
   - Loading state displays during fetch

4. **Custom Hook**
   - `useDailyQuiz()` returns quiz data
   - Hook handles loading/error states
   - Hook manages answer selection state

#### Integration Tests
1. **App Integration**
   - DailyQuizCard renders in App
   - No layout conflicts with CountrySearch
   - Responsive design works on mobile/desktop

2. **API Integration**
   - Real API call succeeds (or gracefully fails)
   - Mock fallback works when API unavailable
   - Network timeout handling

#### Browser Validation (@browser)
1. **Cross-Browser Testing**
   - Chrome: Answer selection, styling, API calls
   - Safari: Same as Chrome
   - Firefox: Same as Chrome
   - Mobile Safari: Touch interactions, responsive layout

2. **Accessibility**
   - Keyboard navigation (Tab, Enter to select answer)
   - Screen reader compatibility (ARIA labels)
   - Color contrast (WCAG AA compliance)

### What to Mock

1. **Open Trivia DB API**
   - Mock `fetch()` calls with `vi.mock()` or `msw` (Mock Service Worker)
   - Mock successful response with sample geography question
   - Mock error responses (network error, 500 error, timeout)
   - Mock HTML entity-encoded responses

2. **Date/Time**
   - Mock `Date` object to test daily rotation logic
   - Test different dates return different questions
   - Test same date returns same question

3. **Browser APIs**
   - Mock `localStorage` for debug mode persistence
   - Mock `window.location` for query param testing

### Test Files Structure
```
src/
  services/
    __tests__/
      quizApi.test.ts
  components/
    __tests__/
      DailyQuizCard.test.tsx
  hooks/
    __tests__/
      useDailyQuiz.test.ts
```

---

## 6. Additional Considerations

### Figma Spec Integration
- **MCP Tool**: Use Figma MCP tool to extract design specs from `docs/figma-designs-screenshots/quiz.png`
- **Fallback**: If MCP unavailable, manually review screenshot and extract:
  - Color scheme (yellow-orange theme)
  - Card layout (rounded corners, white background)
  - Typography (kid-friendly fonts, readable sizes)
  - Button styles (rounded, prominent)

### Performance
- Cache daily question in `localStorage` to avoid re-fetching
- Lazy load quiz component if needed
- Optimize API calls (single request per day)

### Accessibility
- Use semantic HTML (`<button>`, `<article>`)
- Add ARIA labels for screen readers
- Ensure keyboard navigation works
- High contrast colors for readability

### Kid-Friendly Features
- Use emojis for visual interest (🎯, ✅, ❌)
- Positive feedback messages ("Great job!", "You're a geography expert!")
- Simple language (avoid complex terms)
- Visual feedback (color changes, animations)

---

## Implementation Checklist

- [ ] Step 1: Create interfaces & mock data (Agent)
- [ ] Step 2: Build DailyQuizCard component (Agent)
- [ ] Step 3: Integrate into App (Agent)
- [ ] Step 4: Open Trivia DB API integration (Agent)
- [ ] Step 5: Debug mode & browser validation (Plan + Agent)
- [ ] Step 6: Custom hook & command (Manual + Agent)
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Browser testing (@browser)
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Documentation update

---

## Notes

- Follow existing code patterns (component structure, CSS naming, service layer)
- Maintain kid-friendly tone throughout
- Ensure feature works offline (mock fallback)
- Consider adding quiz history/statistics in future iterations

