# Inspection notes

## Task 1: Inspect what the audit could not see

- [x] **Step 1: Clone and install**
- [x] **Step 2: Map the source tree and CI**
  - Home page: src/pages/index.vue
  - Primary workflow file: .github/workflows/ci.yml
- [x] Step 3: Check for unused dependencies
- [x] Step 4: Check secrets hygiene
- [x] Step 5: Record notes and commit

## Task 2: Remove the cheap complexity

- [x] Step 1: Capture a baseline
  - 329K	dist
- [x] Step 2: Drop the predev hook
- [x] Step 3: Replace run-p / run-s
- [x] Step 4: Simplify the icons plugin
- [x] Step 5: Verify
  - 329K	dist
- [x] Step 6: Commit

## Task 3: Add the missing safety net

- [x] Step 1: Write the failing test
- [x] tep 2: Install Vitest and confirm the test fails for the right reason
- [x] Step 3: Add the config and script
- [x] Step 4: Run it
- [x] Step 5: Wire CI
- [x] Step 6: Commit
