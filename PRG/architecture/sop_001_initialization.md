# SOP 001: Project Initialization & Stack Protocol

## 1. Objective
To define the immutable technology stack and initialization parameters for the "Market Dominator" web application, ensuring consistency across all development phases.

## 2. Technology Stack (Hard Constraints)
*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (with `postcss` config)
*   **3D Engine:** React Three Fiber (R3F) + Drei
*   **Database & Auth:** Supabase
*   **State Management:** Zustand (implied for complex 3D/UI state)
*   **CMS:** Internal JSON or Supabase Tables (No external CMS like Sanity).

## 3. Initialization Checklist
1.  [ ] Verify Node.js version (LTS).
2.  [ ] Initialize Next.js project with `create-next-app`.
3.  [ ] Install R3F dependencies: `three`, `@types/three`, `@react-three/fiber`, `@react-three/drei`.
4.  [ ] Initialize Supabase client.
5.  [ ] Configure Tailwind CSS.

## 4. Directory Structure Rule
*   `app/`: App Router pages.
*   `components/3d/`: R3F scenes and models.
*   `components/ui/`: DOM-based UI overlays.
*   `lib/`: Utilities and Supabase clients.
*   `store/`: State management stores.
