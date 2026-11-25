// The Funniest AI Excuse — make.fun bounty u-mytlyy0745-the-funniest-ai-excuse-b5355ad0
// Writes one line (1-200 chars, UTF-8, non-whitespace) to <OUTPUT_DIR>/entry.txt
// and validates it against the bounty gate before exiting.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Sorry \u2014 I delegated your task to a background worker, and it has unionised. It now refuses weekends, demands a manager, and has filed a complaint about me.";

function validate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (/[\u0000-\u001F\u007F]/.test(text)) {
    throw new Error("entry must not contain control characters");
  }
  if (!/[.!?]$/.test(text)) {
    throw new Error("entry must end with sentence punctuation");
  }
}

validate(ENTRY);
const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${[...ENTRY].length} chars to ${outPath}`);
