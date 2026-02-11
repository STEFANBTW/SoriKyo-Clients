# Services Page Hero & Section Animation Specification

## 1. Overview
This specification details the implementation of immersive scroll-based animations for the Services page within the PRG project. The primary goal is to enhance user engagement and visual appeal, clearly guide users through service offerings with dynamic transitions, and improve the perceived performance and responsiveness of the page. The animations will adhere to the PRG light mode color theme, specifically incorporating gold or gold-resembling accent colors where appropriate.

## 2. Functional Requirements

### 2.1 Hero Window Expansion & Image Immersion
-   **Reference:** Utilize `services/image.png` as the design reference for the hero section. The current layout features a left/right split with a small arched-top window containing the hero image.
-   **Trigger:** The animation will be directly tied to the user's scroll position, progressing forward and backward as the user scrolls up and down.
-   **Behavior:**
    -   The arched window expands outward until it disappears beyond the viewport edges.
    -   Simultaneously, the hero image expands to fill the entire viewport (100vh × 100vw).
    -   **Parallax Effect:** The hero image expansion leads slightly ahead of the window expansion, creating a sensation of moving from "looking through a window" to being "immersed inside the image."
    -   **Final State:** Only the image remains visible, fully occupying the viewport.
-   **Visuals:** Precise timing and easing of the window expansion and image parallax are crucial.

### 2.2 Catchphrase Reveal
-   **Trigger:** After the hero expansion animation is complete (i.e., upon continued scrolling).
-   **Behavior:** Scrolling continues, but the page does not visibly scroll. Instead, a catchphrase/sales point slides up from the bottom left.
-   **Animation:** Slide-up with easing (e.g., `easeOutExpo`).

### 2.3 Section Transition & Introduction
-   **Trigger:** Upon scrolling to each new service section.
-   **Behavior:** Next elements appear in sequence: Section icon, Section title, Short description.
-   **Layout:** Designed according to PRG theme, with ample white space around elements.
-   **Animation (New Requirement):** A subtle "slide up, fade in" animation will be applied to the Section icon, Section title, and Short description.
    -   **Easing:** Consistent, gentle easing curve (e.g., `easeOutExpo`).
    -   **Slide Distance:** Minimal, yet noticeable.
    -   **Stagger:** Elements will be staggered slightly to create hierarchy and flow.

### 2.4 First Service Image Expansion (Per Section)
-   **Trigger:** For each section (Hair, Aesthetics, Nails, Spa, Training), as the first service image scrolls into view.
-   **Behavior:**
    -   The first service image expands to fill the entire viewport.
    -   Scrolling halts (using ScrollTrigger pin) while the image is in full view.
    -   Service details (Name, Description, Price, Book Now button) slide up sequentially.
    -   After reveal: Scrolling resumes. The image shrinks back into its normal card container, and service details reposition into a zigzag layout beside the image.
-   **Visuals:** Precise timing and easing are crucial for this expansion and detail reveal.

### 2.5 Remaining Service Cards
-   **Trigger:** Upon scrolling to the second and third service cards within each section.
-   **Animation (New Requirement):** A subtle "slide up, fade in" animation will be applied to the second and third service cards.
    -   **Easing:** Consistent, gentle easing curve (e.g., `easeOutExpo`).
    -   **Slide Distance:** Minimal, yet noticeable.
    -   **Stagger:** Elements will be staggered slightly if multiple elements are revealing simultaneously within a card.

## 3. Non-Functional Requirements
-   **Performance:** Animations must be smooth and performant, ensuring a seamless user experience without jank or dropped frames.
-   **Responsiveness:** Animations should adapt gracefully across various screen sizes and devices.
-   **PRG Theme Adherence:** All visual elements, particularly borders and overlays during transitions, must adhere to the PRG light mode color palette, utilizing gold or gold-resembling accent colors where applicable.

## 4. Acceptance Criteria
-   The hero window expands and the hero image immerses the user as described, triggered by scroll.
-   The catchphrase slides up correctly after the hero animation.
-   Section introduction elements (icon, title, description) "slide up, fade in" with appropriate easing, minimal slide distance, and staggering.
-   The first service image in each section expands to fill the viewport, pins, reveals details, and then shrinks back as specified.
-   The second and third service cards in each section animate with a "slide up, fade in" effect with appropriate easing, minimal slide distance, and staggering.
-   All animations are smooth and responsive across devices.
-   The PRG light mode color theme with gold/accent colors is consistently applied.

## 5. Out of Scope
-   Any changes to service content or data structures.
-   Major structural changes to the Services page layout beyond what is necessary for animation implementation.
