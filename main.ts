// One Line, One Laugh — make.fun entry
//
// The program writes a single funny line of text to /output/entry.txt.
// The judge compares entries two at a time: it must be one self-contained
// line, land a real laugh (a turn, not a mild observation), stay tight,
// stay fresh, and be clear on first read. The gate allows 1-140 chars.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The line. Setup: the AI has quietly taken over the three most personal
// documents a person has. Punch: the narrator no longer knows which one
// actually went out — the joke lands on the dread of losing control of
// your own life story to the machine that was supposed to help write it.
const LINE =
  "The AI wrote my resignation, my dating profile, and my eulogy. I still don't know which one it sent.";

// The gate the sealed scorer applies: UTF-8 text of 1 to 140 characters,
// not only white space. Fail loudly here rather than shipping an entry
// the judge never sees.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`line must be 1-140 characters, got ${LINE.length}`);
}
if (!LINE.trim()) {
  throw new Error("line must not be only white space");
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the gate counts every character, and the judge
// reads the text exactly as written, so the file holds the line and
// nothing else. Read it back to prove the artifact on disk is the line.
writeFileSync("/output/entry.txt", LINE, "utf8");
if (readFileSync("/output/entry.txt", "utf8") !== LINE) {
  throw new Error("entry.txt on disk does not match the line");
}
console.log(LINE);
console.log(`(${LINE.length} characters)`);
