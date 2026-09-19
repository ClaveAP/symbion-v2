# Symbion v2.0 - Conversation Continuation Handoff

## Why This Handoff Exists

The user is moving this work to another agent because the current conversation context/token budget is nearing its limit. The word **token** referred to the agent's conversation budget, not an authentication token.

Continue the project directly from this document. Do not restart discovery from scratch and do not reinterpret this as a request to design a production authentication system yet.

## Immediate Next Request

Implement an interactive profile control in the global top bar.

User requirements:

- Place a conventional circular profile/avatar button at the far right of the top bar.
- The profile must be interactive.
- Include **Log out**.
- Add other sensible profile-menu actions at the implementer's discretion.
- There are two user types:
  1. **Mitra Kawasan / User**
  2. **Admin Pengelola**
- Keep competition-facing UI copy in English. Recommended labels:
  - **Regional Partner** for Mitra Kawasan.
  - **Estate Administrator** for Admin Pengelola.
- The user has not yet supplied detailed login/authentication direction. Build the profile interaction cleanly, but do not invent backend authentication requirements. The user will give login directions after the UI is satisfactory.

Recommended profile-menu behavior:

- Circular initials avatar or neutral placeholder image.
- Display name, role, and organization context.
- Role/account switcher for the two demo user types so both states can be reviewed.
- Useful actions such as Profile, Preferences, Notifications, or Access Scope.
- Logout interaction can be a clearly labelled demo UI state until the user specifies the real login flow.
- Keyboard support: visible focus, `aria-expanded`, close on outside click and `Escape`.
- Responsive behavior on desktop and mobile.

## Current Layout Facts

- [`src/components/layout/header.tsx`](src/components/layout/header.tsx) already contains a desktop utility top bar with case information, currency, sandbox, and export actions.
- The `Header` component currently exists but is **not mounted** in `AppShell`.
- [`src/components/layout/app-shell.tsx`](src/components/layout/app-shell.tsx) contains a mobile-only top bar, responsive sidebar trigger, skip link, and main content wrapper.
- [`src/components/layout/sidebar.tsx`](src/components/layout/sidebar.tsx) is responsive and scrollable.
- The cleanest implementation is likely:
  1. Add a reusable `UserProfileMenu` component.
  2. Mount the existing desktop `Header` in `AppShell`.
  3. Put `UserProfileMenu` at the right edge of `Header`.
  4. Add the compact profile button to the mobile top bar.
  5. Add the correct desktop top padding (`lg:pt-14`) so the fixed header does not cover page content.
- Avoid duplicating session/profile state between desktop and mobile. A small shared context is appropriate if role switching is implemented.

## Project Rules To Preserve

Read [`AGENTS.md`](./AGENTS.md) and [`HANDOFF.md`](./HANDOFF.md) before coding.

Critical requirements:

- Competition target: **I-SINERGIE Malaysia 2026**.
- UI language: professional English only.
- Stack: Next.js 14 App Router, TypeScript, Tailwind CSS, Lucide React.
- Preserve the modular multi-page architecture.
- Keep `SymbionProvider` active.
- Guard browser-only APIs.
- Do not revert unrelated dirty-worktree changes.
- Use `apply_patch` for manual edits.
- Run `npm run build` before finishing.

Typography was deliberately standardized to **Inter** throughout the dashboard after client feedback that thin/tall fonts were uncomfortable. Impeccable reports Inter as an overused-font warning; treat that warning as accepted because the client explicitly preferred Inter/Poppins-like readability.

## Work Completed In This Conversation

### Environment and References

- Read `HANDOFF.md` and `AGENTS.md`.
- Installed and used the `ui-ux-pro-max` skill.
- Configured the Google Stitch MCP globally.
- Retrieved Stitch project `12148159828393703567` references, including:
  - Executive green-impact dashboard.
  - Admin & Input Data screen `53479d61401e4ddbb9c2a67f0d0fa300`.

### Typography

- Unified application typography to Inter across body, controls, numeric styles, and SVG text.
- Removed visibly conflicting mono/display font behavior while retaining tabular numeric alignment.

### Executive Overview

- Added impact-focused KPI presentation based on the actual empirical values in the project handoff.
- Kept global case and currency state intact.
- Added a complete analytical-workspace directory linking every application module.

### Data Integration Hub

Implemented in [`src/app/input-data/page.tsx`](src/app/input-data/page.tsx):

- Stitch-aligned registration and matching workspace.
- Seeded partner registry covering empirical and demonstration streams.
- Regional Intelligence & Network Updates feed with filters and details.
- Generated Subang eco-industrial panorama.
- Added Stitch images for POME treatment, bagasse depot, and organic fertilizer production.
- Real CSV registry download.
- Partner dossier dialog.
- Partner edit workflow that repopulates and updates the registration form.
- Honest disabled state for backend-dependent bulk import.
- Search/filter empty state and disabled one-page pagination.
- Fixed the disposal radio default mismatch.

Relevant image assets are in [`public/images`](public/images).

### Navigation and Impeccable Audit

- Created centralized navigation source:
  [`src/components/layout/navigation-config.ts`](src/components/layout/navigation-config.ts).
- Sidebar and overview now use the same route inventory.
- Added responsive mobile navigation and short-viewport scrolling.
- Added skip-to-content and reduced-motion handling.
- Verified all seven routes exist, return HTTP `200`, and render expected primary content:
  - `/`
  - `/topology`
  - `/scenarios`
  - `/impact`
  - `/stress-test`
  - `/input-data`
  - `/methodology`

Post-fix Impeccable audit result reported to the user: **18/20 (Excellent)**.

## Last Verified Technical State

Before the profile request:

- `npm run lint`: passed with no warnings or errors.
- `tsc --noEmit`: passed.
- `npm run build`: passed.
- All seven routes returned HTTP `200`.
- Development server was running at `http://localhost:3001/` during final verification.

The worktree is dirty and contains many existing modified/untracked files. Do not clean, reset, or revert them. Treat them as user/current-project work.

## Suggested Profile Implementation Files

Likely additions/edits:

```text
src/components/layout/user-profile-menu.tsx      # new
src/context/user-session-context.tsx             # optional new shared demo state
src/components/layout/header.tsx                 # add profile at far right
src/components/layout/app-shell.tsx              # mount Header and mobile profile
```

Suggested temporary UI model, not a production authentication contract:

```ts
type UserRole = "regional_partner" | "estate_administrator";

interface ProfileUser {
  id: string;
  displayName: string;
  role: UserRole;
  roleLabel: "Regional Partner" | "Estate Administrator";
  organization: string;
  initials: string;
}
```

Use neutral demo identities unless the user supplies names. Do not present invented people as real stakeholders.

## Acceptance Criteria For The Next Agent

- Circular profile control appears at the far right of desktop and mobile top bars.
- Dropdown is polished, keyboard accessible, and responsive.
- Both Regional Partner and Estate Administrator states are reviewable.
- Logout interaction works at the UI/session-state level.
- Existing top-bar case, currency, sandbox, and export actions still work.
- Fixed header does not cover page content.
- Sidebar and all seven routes remain intact.
- No visible Indonesian copy is introduced except proper names when required.
- `npm run lint`, `tsc --noEmit`, and `npm run build` pass.

## Do Not Do Yet

- Do not build the full login page until the user gives the promised direction.
- Do not select an authentication provider without user instruction.
- Do not invent passwords, API secrets, or real user identities.
- Do not replace the current navigation or visual system.
