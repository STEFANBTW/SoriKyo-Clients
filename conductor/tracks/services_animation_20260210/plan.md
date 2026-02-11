# Implementation Plan: Services Page Animations

## Phase 1: Setup and Initial Hero Animation
- [x] **Task:** Set up GSAP and Lenis with ScrollTrigger in the PRG project.
    - [x] Sub-task: Install and import GSAP and Lenis libraries.
    - [x] Sub-task: Configure Lenis for smooth scrolling.
    - [x] Sub-task: Register the ScrollTrigger plugin with GSAP.
- [x] **Task:** Implement the hero window expansion and image immersion animation.
    - [x] Sub-task: Create the GSAP timeline for the hero animation.
    - [x] Sub-task: Animate the hero window expansion based on scroll position.
    - [x] Sub-task: Animate the hero image parallax effect based on scroll position.
- [x] **Task:** Implement the catchphrase reveal animation.
    - [x] Sub-task: Create the GSAP animation for the catchphrase slide-up.
    - [x] Sub-task: Trigger the animation after the hero expansion is complete.

## Phase 2: Section Transitions and Animations
- [x] **Task:** Implement the "slide up, fade in" animation for section introductions.
    - [x] Sub-task: Create a reusable GSAP animation for the "slide up, fade in" effect.
    - [x] Sub-task: Apply the animation to the section icon, title, and description, with staggering.
- [x] **Task:** Implement the first service image expansion and detail reveal.
    - [x] Sub-task: Create the GSAP timeline for the first service image expansion.
    - [x] Sub-task: Pin the section while the animation is active using ScrollTrigger.
    - [x] Sub-task: Animate the sequential slide-up of service details.
    - [x] Sub-task: Animate the image shrinking back to its container.
- [x] **Task:** Implement the "slide up, fade in" animation for the second and third service cards.
    - [x] Sub-task: Apply the reusable "slide up, fade in" animation to the second and third service cards in each section.

## Phase 3: Refinement and Testing
- [x] **Task:** Refine animation timing and easing for a cohesive experience.
    - [x] Sub-task: Adjust GSAP easing parameters to match the desired feel.
    - [x] Sub-task: Fine-tune the timing and overlap of different animations.
- [x] **Task:** Test animations across different browsers and devices.
    - [x] Sub-task: Verify responsiveness and visual correctness on various screen sizes.
    - [x] Sub-task: Test for performance issues and optimize animations as needed.
- [x] **Task:** Verify adherence to the PRG color theme.
    - [x] Sub-task: Ensure gold/accent colors are correctly applied to borders or overlays during transitions.
    - [x] Sub-task: Confirm that all animations and visual elements align with the PRG light mode aesthetic.
