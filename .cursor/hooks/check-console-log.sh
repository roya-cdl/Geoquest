#!/bin/bash
# Cursor Hook: Check for console.log in .ts/.tsx file changes
# This hook runs when Agent proposes changes to TypeScript/TSX files

# Get the diff of proposed changes
DIFF="${1:-}"

# If no diff provided, try to get it from git
if [ -z "$DIFF" ]; then
    DIFF=$(git diff --cached --name-only --diff-filter=ACMR | grep -E '\.(ts|tsx)$' | xargs git diff --cached 2>/dev/null)
fi

# Check if diff contains console.log
if echo "$DIFF" | grep -q "console\.log"; then
    echo "⚠️  Hook warning: console.log found in proposed changes for GeoQuest Kids. Remove it before commit."
    exit 1
fi

exit 0

