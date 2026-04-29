# Professional UI/UX Refinement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Professionalize the Two Suns website by fixing accessibility issues, optimizing animations for performance, and refining interactive components like the QuoteForm.

**Architecture:** Implement standard accessibility patterns (ARIA, semantic labels), replace broad CSS transitions with specific properties, and add UX polish (loading states, better focus styles).

**Tech Stack:** Next.js, Tailwind CSS, Framer Motion, GSAP, React Hook Form.

---

### Task 1: Global Focus States & Accessibility Utilities

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Add custom focus-visible ring and accessibility utilities**
```css
@layer base {
  :focus-visible {
    outline: none !important;
    @apply ring-2 ring-[#2563EB] ring-offset-2 ring-offset-[#0A1628];
  }
}

@layer utilities {
  .transition-standard {
    transition-property: transform, opacity, background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }
}
```

**Step 2: Update existing buttons to use specific transitions instead of `transition-all`**
Replace `transition-all` in `.btn-primary`, `.btn-outline`, and `.btn-gold`.

**Step 3: Commit**
```bash
git add src/app/globals.css
git commit -m "style: add global focus states and accessibility utilities"
```

---

### Task 2: Navbar Accessibility & Performance

**Files:**
- Modify: `src/components/Navbar.tsx`

**Step 1: Add aria-labels and specific transitions**
- Add `aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}` to the button on line 68.
- Add `aria-expanded={isMobileMenuOpen}` to the button.
- Update nav transition on line 33 to use specific properties: `transition-property: background-color, border-color, padding, box-shadow;`.

**Step 2: Commit**
```bash
git add src/components/Navbar.tsx
git commit -m "accessibility: improve navbar a11y and performance"
```

---

### Task 3: Hero Interactive Polish

**Files:**
- Modify: `src/components/Hero.tsx`

**Step 1: Update mode toggles with ARIA states**
- Add `role="tablist"` to the container on line 129.
- Add `role="tab"` and `aria-selected` to the buttons on lines 130 and 138.
- Ensure specific transitions are used.

**Step 2: Commit**
```bash
git add src/components/Hero.tsx
git commit -m "ui: refine hero interactivity and accessibility"
```

---

### Task 4: QuoteForm Accessibility & UX

**Files:**
- Modify: `src/components/QuoteForm.tsx`

**Step 1: Link labels to inputs and add ARIA alerts**
- Update inputs with `id` and labels with `htmlFor`.
- Add `role="alert"` and `aria-live="polite"` to error messages.
- Add `aria-live="polite"` to the success container on line 134.
- Add `Loader2` from `lucide-react` for the loading state.

**Step 2: Commit**
```bash
git add src/components/QuoteForm.tsx
git commit -m "accessibility: complete overhaul of QuoteForm a11y and UX"
```

---

### Task 5: Footer Social Links & ARIA

**Files:**
- Modify: `src/components/Footer.tsx`

**Step 1: Add aria-labels to social icons**
- Add `aria-label="Visit our social media"` to links on lines 24 and 27.
- Ensure specific transitions are used.

**Step 2: Commit**
```bash
git add src/components/Footer.tsx
git commit -m "accessibility: add footer aria labels"
```
