# SOP 002: Agentic Booking Flow Protocol

## 1. Objective
To define the logic and state transitions for the "Agentic Receptionist" booking system, ensuring zero-friction user acquisition.

## 2. Data Schema (Source of Truth)
> **Constraint:** Logic must strictly adhere to `gemini.md` constraints.

### 2.1. Booking Entity
*   `id`: UUID (Primary Key)
*   `user_id`: UUID (Foreign Key -> auth.users)
*   `service_id`: String (Enum: 'strategy_call', 'audit', 'full_service')
*   `status`: String (Enum: 'pending', 'confirmed', 'completed', 'cancelled')
*   `time_slot`: Timestamptz (ISO 8601)

## 3. Booking Logic Flow & State Machine

### Phase 1: Intent (Guest)
1.  User clicks "Initialize Protocol" (CTA).
2.  System checks Auth State.
    *   If **Anon**: Trigger "Agentic Onboarding" (Modal).
    *   If **Auth**: Proceed to Slot Selection.

### Phase 2: Slot Selection (Auth)
1.  User selects a time slot.
2.  System validates availability (Mock: Always available in Dev).
3.  User confirms selection.

### Phase 3: Commitment (Database)
1.  System creates a `Booking` record with `status: pending`.
2.  System triggers "Confirmation Sequence" (UI Feedback).
3.  (Future) System sends confirmation email/WhatsApp.

## 4. UI/UX Rules
*   **No Dead Ends:** Every action must yield immediate feedback.
*   **The "Agent" Persona:** UI copy should mimic an AI receptionist (e.g., "Scanning schedule...", "Protocol Initialized").
*   **Speed:** Use optimistic UI updates. Don't wait for DB confirmation to show success state locally.

## 5. Mock Mode (Dev)
*   When `NEXT_PUBLIC_MOCK_MODE=true` (or keys missing):
    *   Bypass Supabase real auth.
    *   Store bookings in local `Zustand` store.
    *   Simulate network delay (500ms).
