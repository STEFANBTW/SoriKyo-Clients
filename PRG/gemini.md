# GEMINI.MD - PROJECT MASTER STATE
> **The Source of Truth for the BLAST Market Dominator Project**

## 1. PROJECT IDENTITY


*   **Stack:** Next.js 15.1.6, React 19, React Three Fiber, Supabase (Custom CMS).
*   **CMS Directive:** Discard Sanity.io. Build a Custom "Content Lake" using Supabase JSONB/Tables.

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



## 6. PROTOCOLS
### 6.1. `deepFind` (Enhanced Retrieval & Documentation)
*   **Trigger Keyword:** `deepFind`
*   **Protocol:**
    1.  **Identify:** Locate all files, lines, and blocks of code related to the request (e.g., styles, logic, parameters).
    2.  **Documentation:** Insert or identify persistent `/* DESIGNER CONTROL */` or `// DESIGNER CONTROL` comments in the source code.
    3.  **Explain:** Within those comments, clarify the parameter's effect and providing guidance on how to tweak it.
    4.  **Display:** Provide a summary in the chat with clickable file paths, line numbers, and snippets.
    5.  **Editor Access:** Use the `run_command` tool to open all referenced files in the VS Code editor using the `code -r [file]` command.
    6.  **Context:** Ensure the user knows which lines to focus on based on the generated comments.

## 7. MAINTENANCE LOG
*   [2026-02-10] Added `deepFind` protocol for enhanced code retrieval and designer-friendly documentation. Integrated VS Code `code -r` command into the protocol.
*   [DATE] System Initialized by BLAST AI.

