#!/usr/bin/env node
/**
 * Cursor Hook: Check for console.log in .ts/.tsx file changes
 * This hook runs when Agent proposes changes to TypeScript/TSX files
 * 
 * Usage: This hook is automatically triggered by Cursor when changes are proposed
 */

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

/**
 * Check if proposed changes contain console.log
 * @param {string} filePath - Path to the file being changed
 * @param {string} diff - The diff content (optional)
 */
function checkConsoleLog(filePath, diff = null) {
  // Check if it's a .ts or .tsx file
  if (filePath && !/\.(ts|tsx)$/.test(filePath)) {
    return false;
  }

  // If diff is provided, use it; otherwise try to get from git
  let diffContent = diff;
  
  if (!diffContent && filePath) {
    try {
      // Try to get staged diff
      diffContent = execSync(`git diff --cached "${filePath}"`, { encoding: 'utf8', stdio: 'pipe' });
    } catch (error) {
      // If no staged changes, try working directory diff
      try {
        diffContent = execSync(`git diff "${filePath}"`, { encoding: 'utf8', stdio: 'pipe' });
      } catch (e) {
        // If file is new, read the file content
        const fullPath = path.resolve(filePath);
        if (fs.existsSync(fullPath)) {
          diffContent = fs.readFileSync(fullPath, 'utf8');
        }
      }
    }
  }

  // Check for console.log in the diff/content (but not in comments)
  if (diffContent) {
    // Match console.log but ignore if it's in a comment
    const lines = diffContent.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      // Check for console.log that's not in a comment
      if (/console\.log/.test(trimmed) && !trimmed.startsWith('//') && !trimmed.startsWith('*')) {
        // Additional check: make sure it's not already commented out
        if (!trimmed.match(/^\s*\/\//) && !trimmed.match(/^\s*\*/)) {
          console.error('⚠️  Hook warning: console.log found in proposed changes for GeoQuest Kids. Remove it before commit.');
          return true;
        }
      }
    }
  }

  return false;
}

// Main execution
// Cursor may pass file path and diff as arguments, or via environment variables
const filePath = process.argv[2] || process.env.CURSOR_FILE_PATH || '';
const diff = process.argv[3] || process.env.CURSOR_DIFF || null;

if (checkConsoleLog(filePath, diff)) {
  process.exit(1);
}

process.exit(0);

