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

## Task 4: Add an agent and contributor context file

 - [x] Step 1: Create the file
 - [x] Step 2: Verify the script names match
 - [x] Step 3: Commit

 ## Task 5: Rewrite the public copy

- [x] Step 1: Replace the README intro
- [x] Step 2: Fix the Node requirement and closing line
- [x] Step 3: Replace the home page tagline
- [x] Step 4: Update the GitHub description
- [x] Step 5: Verify
- [x] Step 6: Commit

## Task 6: Say why Vuetrix exists

- [x] Step 1: Write the comparison
- [x] Step 2: Check every row against the repos before committing
- [x] Step 3: Link it from the README and commit
