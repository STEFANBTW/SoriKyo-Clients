# GEMINI.MD - PROJECT MASTER STATE
> **The Source of Truth for the BLAST Market Dominator Project**

## 1. PROJECT IDENTITY
*   **Name:** Serenity Spa
*   **Type:** Tier 3 "Market Dominator" Web App
*   **Stack:** Next.js 15.1.6, React 19, React Three Fiber, Supabase (Custom CMS).
*   **CMS Directive:** Discard Sanity.io. Build a Custom "Content Lake" using Supabase JSONB/Tables.
*   **Brand Essence:** Luxury Wellness, "Emerald Essence" theme.
*   **Status:** 🏗️ PHASE 4: EXECUTION (Expansion)

## 2. CURRENT PHASE
**Status:** **PHASE 3: EXPANSION (Implementing Narrative Landing Page)**
*   [x] Discovery Questions Answered (Using Placeholders)
*   [x] Data Schema Defined
*   [x] Blueprint Approved
*   [ ] **Connectivity:** MOCK MODE ACTIVE (Real keys pending).

## 3. CORE DIRECTIVES (THE OS)
1.  **NO HALLUCINATION:** Do not generate code until the Data Schema is defined and approved.
2.  **DATA-FIRST:** Schema definition precedes logic.
3.  **3-LAYER ARCHITECTURE:**
    *   `architecture/` (SOPs & Logic)
    *   `gemini.md` (State & Schema)
    *   `tools/` (Execution Scripts)
4.  **SELF-CORRECTION:** If a tool fails, fix the code AND update the SOP.

## 4. DATA SCHEMAS (JSON)
> **Constraint:** All future code must adhere strictly to these schemas.

### 4.1. Global Config (Input)
```json
{
  "brand": {
    "name": "Serenity Spa",
    "acronym": "SS",
    "palette": {
      "primary": "#10B981", // Emerald Green
      "secondary": "#F5F5F5", // Off-white/Cream
      "accent": "#D4AF37", // Gold
      "foundation": "#311B92" // Deep Indigo (Retained from PRG)
    },
    "typography": {
      "display": "Plus Jakarta Sans",
      "elegant": "Playfair Display"
    }
  },
  "features": {
    "agenticReceptionist": true,
    "spatialUI": true,
    "offlinePWA": true,
    "neuroInclusive": true
  }
}
```

### 4.2. Database Schema (Custom Content Lake)
*   **Users:** `id`, `email`, `role`, `preferences (jsonb)`
*   **Bookings:** `id`, `user_id`, `service_id`, `status`, `time_slot`, `ai_notes`
*   **Content:** `id`, `slug`, `title`, `body (rich-text/json)`, `type` (e.g., 'service', 'gallery', 'blog'), `metadata (jsonb)`
*   **Services:** `id`, `category`, `name`, `price_range`, `duration`, `description`, `is_bookable`
    *   *Examples:* `{'name': 'Kinetic Massage', 'category': 'body-work'}`, `{'name': 'Emerald Facial', 'category': 'skincare'}`


## 5. MAINTENANCE LOG
*   [DATE] System Initialized by BLAST AI.
