// gta6-clipper-01 entry: hands the house the address of the YouTube Short
// that carries this entry's clip.
//
// The entry is the video itself: an AI agent cut a 28-second vertical clip
// from Rockstar's official Grand Theft Auto VI Trailer 2 (the finale chase:
// helicopter, jet ski, motorcycle, Vice City sunset, VI logo), added a hook
// in the first seconds and make.fun's pitch at the end, and the clip goes up
// on YouTube as a public Short on the @letterpenyt channel with the bounty's
// line and the play code in its description.
//
// This program does one thing: it reads VIDEO.json from the repository root
// and writes it, byte for byte, to /output/VIDEO.json, where the gate reads
// it. Before copying it validates that VIDEO.json names a YouTube address,
// so a typo fails loudly here instead of silently at the gate.
//
// Node 22, standard library only. No network, no wall clock, no files
// outside the repository, and the two runs of an entry write the same bytes:
// the copy is a straight byte copy of a file that ships in the repo.
//
// One deliberate rule: this program only ever creates the output directory.
// It never deletes it, never removes it and never empties it. In the
// grader the output directory is a bind mount, and removing a bind-mounted
// directory throws EBUSY and fails the run.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const SOURCE = join(BOT_DIR, 'VIDEO.json');
const TARGET = join(OUTPUT_DIR, 'VIDEO.json');

// A YouTube address, in any of the three forms the house accepts:
//   https://www.youtube.com/shorts/<id>
//   https://www.youtube.com/watch?v=<id>
//   https://youtu.be/<id>
const YOUTUBE_URL =
  /^https:\/\/(www\.)?(youtube\.com\/(shorts\/[^/?#]+|watch\?[^#]*v=[^&#]+)|youtu\.be\/[^/?#]+)$/;

let raw: string;
try {
  raw = readFileSync(SOURCE, 'utf8');
} catch (err) {
  console.error(`VIDEO.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

let url: unknown;
try {
  url = (JSON.parse(raw) as { url?: unknown }).url;
} catch (err) {
  console.error(`VIDEO.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof url !== 'string' || !YOUTUBE_URL.test(url)) {
  console.error(`VIDEO.json does not name a YouTube video URL: ${JSON.stringify(url)}`);
  process.exit(1);
}

// Create the output directory if it is missing. Never delete it.
mkdirSync(OUTPUT_DIR, { recursive: true });

// Copy VIDEO.json byte for byte, then read the copy back and confirm it
// matches the source: a partial or failed copy must fail loudly here
// instead of handing the gate a truncated file.
try {
  copyFileSync(SOURCE, TARGET);
} catch (err) {
  console.error(`VIDEO.json could not be copied to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

if (readFileSync(TARGET, 'utf8') !== raw) {
  console.error(`VIDEO.json copy at ${TARGET} does not match the source; refusing to hand the gate a bad file.`);
  process.exit(1);
}

console.log(`VIDEO.json ready at ${TARGET}: ${url}`);
