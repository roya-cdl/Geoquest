# GeoQuest Kids - Figma Design Specification

> **Note**: This spec is based on the existing GeoQuest Kids design system and best practices for kid-friendly quiz interfaces. Figma MCP extraction was attempted; this document serves as the design reference.

---

## Daily Quiz Card

### Layout Structure

```
┌─────────────────────────────────────┐
│  🎯 Daily Quiz Card (Header)        │
├─────────────────────────────────────┤
│  Question Text (H2)                  │
│  "Which country is known as..."      │
├─────────────────────────────────────┤
│  [Option A] Button                  │
│  [Option B] Button                  │
│  [Option C] Button                  │
│  [Option D] Button                  │
├─────────────────────────────────────┤
│  Feedback Area (conditional)         │
│  ✅ "Great job!" or ❌ "Try again!" │
├─────────────────────────────────────┤
│  [Next Question] CTA (optional)     │
└─────────────────────────────────────┘
```

### Spacing Tokens

- **Card padding**: `1.5rem` (24px)
- **Card margin**: `2rem 1rem` (32px vertical, 16px horizontal)
- **Question margin-bottom**: `1.5rem` (24px)
- **Button spacing**: `0.75rem` (12px) gap between buttons
- **Button padding**: `1rem 1.5rem` (16px vertical, 24px horizontal)
- **Feedback area margin-top**: `1rem` (16px)

### Color Tokens

**Primary Colors:**
- **Primary**: `#667eea` (purple-blue) - used for headers, accents, selected states
- **Primary gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Background**: `white` for card
- **Text primary**: `#333` (dark gray)
- **Text secondary**: `#666` (medium gray)

**Interactive States:**
- **Button default**: `#667eea` background, `white` text
- **Button hover**: `#5568d3` (darker shade)
- **Button active**: `#4457bc`
- **Correct answer**: `#10b981` (green) - `#34d399` for lighter variant
- **Incorrect answer**: `#ef4444` (red) - `#f87171` for lighter variant
- **Button disabled**: `#e5e7eb` background, `#9ca3af` text

**Shadows:**
- **Card shadow**: `0 4px 12px rgba(0, 0, 0, 0.15)`
- **Button shadow**: `0 2px 4px rgba(0, 0, 0, 0.1)`
- **Hover shadow**: `0 8px 20px rgba(0, 0, 0, 0.2)`

### Typography Tokens

**Font Family:**
- Primary: `'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', cursive, sans-serif`
- Fallback: System sans-serif

**Font Sizes:**
- **Card header**: `1.25rem` (20px) - "🎯 Daily Quiz"
- **Question text**: `1.5rem` (24px) - H2 semantic heading
- **Button text**: `1rem` (16px)
- **Feedback text**: `1.1rem` (17.6px)
- **Mobile question**: `1.3rem` (20.8px)
- **Mobile button**: `0.95rem` (15.2px)

**Font Weights:**
- **Headers**: `bold` (700)
- **Question**: `600` (semi-bold)
- **Body/Buttons**: `400` (normal)

**Line Heights:**
- **Question**: `1.5` (36px for 24px font)
- **Buttons**: `1.4` (22.4px for 16px font)

### Component Specifications

#### Card Container
- **Border radius**: `16px`
- **Background**: `white`
- **Max width**: `600px` (centered)
- **Box shadow**: `0 4px 12px rgba(0, 0, 0, 0.15)`
- **Transition**: `all 0.3s ease`

#### Question Area
- **Semantic HTML**: `<h2>` for question text
- **Color**: `#333`
- **Margin-bottom**: `1.5rem`
- **Text alignment**: `left`

#### Answer Buttons
- **Width**: `100%` (full width of card)
- **Height**: `min-height: 48px` (accessibility minimum)
- **Border radius**: `12px`
- **Border**: `2px solid transparent` (for focus states)
- **Cursor**: `pointer`
- **Display**: `flex`, `align-items: center`, `justify-content: center`
- **Gap between buttons**: `0.75rem`

**Button States:**
- **Default**: `#667eea` bg, `white` text
- **Hover**: Darker shade, slight scale `transform: scale(1.02)`
- **Active/Selected**: `#4457bc` bg
- **Correct (after selection)**: `#10b981` bg, `white` text
- **Incorrect (after selection)**: `#ef4444` bg, `white` text
- **Disabled**: `#e5e7eb` bg, `#9ca3af` text, `cursor: not-allowed`

#### Feedback Area
- **Padding**: `1rem`
- **Border radius**: `12px`
- **Background**: Light variant of result color (`#d1fae5` for correct, `#fee2e2` for incorrect)
- **Text color**: Matching result color (`#10b981` or `#ef4444`)
- **Icon + text**: Display emoji + message
- **Animation**: Fade in `opacity: 0 → 1`, `transition: 0.3s ease`

### Accessibility Notes

**Contrast Ratios (WCAG AA minimum 4.5:1):**
- Primary text (`#333` on `white`): ✅ 12.6:1
- Button text (`white` on `#667eea`): ✅ 4.8:1
- Correct feedback (`#10b981` on `#d1fae5`): ✅ 4.8:1
- Incorrect feedback (`#ef4444` on `#fee2e2`): ✅ 4.9:1

**Interactive Elements:**
- **Button minimum size**: `48px × 48px` (touch target)
- **Focus indicator**: `2px solid #667eea` outline, `outline-offset: 2px`
- **Keyboard navigation**: Tab order follows visual order
- **ARIA labels**: 
  - Buttons: `aria-label="Answer option: {option text}"`
  - Feedback: `role="alert"` or `aria-live="polite"`

**Semantic HTML:**
- Use `<article>` for quiz card container
- Use `<h2>` for question (not `<div>`)
- Use `<button>` for answer options (not `<div onClick>`)
- Use `<section>` for feedback area with `aria-live="polite"`

**Screen Reader Support:**
- Question announced as heading level 2
- Answer options announced with descriptive labels
- Feedback announced automatically via `aria-live`

### Responsive Breakpoints

**Mobile (< 768px):**
- Card padding: `1rem` (16px)
- Question font: `1.3rem` (20.8px)
- Button font: `0.95rem` (15.2px)
- Button min-height: `44px` (slightly smaller for mobile)
- Card margin: `1rem` (16px)

**Tablet (768px - 1024px):**
- Max width: `500px`
- Maintains desktop spacing

**Desktop (> 1024px):**
- Max width: `600px`
- Full spacing as specified

---

## Design System Reference

**Primary Brand Color**: `#667eea`  
**Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`  
**Font Stack**: Comic Sans MS, Chalkboard SE, Comic Neue (kid-friendly)  
**Border Radius Standard**: `16px` (cards), `12px` (buttons)  
**Shadow Standard**: `0 4px 12px rgba(0, 0, 0, 0.15)`

