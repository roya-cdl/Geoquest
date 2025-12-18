# Cursor Hooks

This directory contains Cursor hooks that run automatically during development.

## check-console-log

**Purpose**: Scans proposed changes to `.ts`/`.tsx` files for `console.log` statements and warns if found.

**Trigger**: Runs when Agent proposes changes to TypeScript/TSX files.

**Warning Message**: 
```
⚠️  Hook warning: console.log found in proposed changes for GeoQuest Kids. Remove it before commit.
```

**Files**:
- `check-console-log.sh` - Shell script version
- `check-console-log.js` - Node.js version (preferred)

**Usage**: Cursor automatically detects and runs hooks in `.cursor/hooks/` directory.

