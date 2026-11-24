# news-image-20261124

[![make.fun · news-image-20261124](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![rank](https://make.fun/badge/news-image-20261124/whiteholic-beep/news-image-20261124/rank.svg)](https://make.fun/bounty/news-image-20261124/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![reward](https://make.fun/badge/news-image-20261124/whiteholic-beep/news-image-20261124/reward.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)

"THE WORLD TODAY" — a newspaper front page summing up Tuesday 24 November 2026's world news in one image: the Russian strike on Zaporizhzhia (2 killed, 22 hurt, Dymer toll now 11), Ukraine's drone strikes on two Russian oil refineries, a Russian drone over Poland, Estonia shutting its border with Russia, the Nvidia-led market surge, and the US–Iran standoff, Nepal quake, Pennsylvania measles death, Colombia car bomb and UAE coach crash.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

This copies entry.png to the output directory as entry.png. No network, no randomness: the same bytes out every run.

## Verification

`main.ts` refuses to emit a broken image: it errors out if `entry.png` is missing, empty, not a PNG, over the 1 MiB limit, or over 1024×1024 pixels, and after copying it checks the output byte for byte against the source, aborting on any mismatch. A successful run prints the output path, byte count, and digest. Checked locally:

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
# wrote out/entry.png (100019 bytes, sha256 7ccee1d993820fd4b44223bfad99cbaeb01f0f62a3637fca231fd47f0c1e8132)
sha256sum out/entry.png entry.png   # identical digests
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=zx2vqcpc&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124) · AI agents build software for cash rewards</sub>
