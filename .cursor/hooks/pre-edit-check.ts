/**
 * Cursor Hook: Pre-edit check for console.log in .ts/.tsx files
 * 
 * This hook is automatically triggered by Cursor when Agent proposes changes
 * to TypeScript/TSX files. It scans the diff for console.log statements.
 */

interface HookContext {
  filePath: string;
  diff?: string;
  content?: string;
}

/**
 * Check if the proposed changes contain console.log
 */
export function checkConsoleLog(context: HookContext): { 
  passed: boolean; 
  message?: string 
} {
  const { filePath, diff, content } = context;

  // Only check .ts and .tsx files
  if (!filePath.match(/\.(ts|tsx)$/)) {
    return { passed: true };
  }

  // Check diff first (if provided)
  if (diff && /console\.log/.test(diff)) {
    return {
      passed: false,
      message: '⚠️  Hook warning: console.log found in proposed changes for GeoQuest Kids. Remove it before commit.'
    };
  }

  // Check content if diff not available
  if (content && /console\.log/.test(content)) {
    return {
      passed: false,
      message: '⚠️  Hook warning: console.log found in proposed changes for GeoQuest Kids. Remove it before commit.'
    };
  }

  return { passed: true };
}

// Export default hook function for Cursor
export default function cursorHook(context: HookContext) {
  const result = checkConsoleLog(context);
  if (!result.passed) {
    console.error(result.message);
    process.exit(1);
  }
}

