// news-image-20261124 — "THE WORLD TODAY", Tuesday 24 November 2026.
//
// Node 22 entrypoint, standard library only. The repository ships the
// finished front page as entry.png; this program copies that file into the
// output directory the grader provides. The page sums up Tuesday
// 24 November 2026: the Zaporizhzhia strike (2 killed, 22 hurt, Dymer toll
// now 11), Ukraine's drone strikes on two Russian refineries, the Russian
// drone over Poland, Estonia shutting its border, the Nvidia-led market
// surge, and the US-Iran standoff, Nepal quake, measles, Colombia car bomb
// and UAE coach crash in the ALSO bar. No network, no randomness, no clock:
// both grader runs write exactly the same bytes.
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const ONE_MIB = 1048576;

const source = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

function sha256(file: string): string {
  return createHash('sha256').update(readFileSync(file)).digest('hex');
}

function fail(message: string): never {
  throw new Error(`news-image-20261124: ${message}`);
}

if (!existsSync(source)) {
  fail(`entry.png is missing next to main.ts (${source})`);
}
const bytes = readFileSync(source);
if (bytes.length === 0) {
  fail('entry.png is empty (0 bytes)');
}
if (!bytes.subarray(0, 8).equals(PNG_MAGIC)) {
  fail('entry.png is not a PNG file (bad magic bytes)');
}
if (bytes.length > ONE_MIB) {
  fail(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);
}
// The IHDR chunk follows the 8-byte signature: a 4-byte length, the
// letters "IHDR", then width and height as big-endian uint32 values.
// The gate caps the image at 1024 by 1024, so refuse anything larger
// instead of shipping an entry the gate would reject.
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width > 1024 || height > 1024) {
  fail(`entry.png is ${width}x${height}, over the 1024x1024 limit`);
}

mkdirSync(dirname(target), { recursive: true });
copyFileSync(source, target);

const copied = readFileSync(target);
if (copied.length !== bytes.length || !copied.equals(bytes)) {
  fail('the copied entry.png does not match the source byte for byte');
}

console.log(`wrote ${target} (${copied.length} bytes, sha256 ${sha256(target)})`);
