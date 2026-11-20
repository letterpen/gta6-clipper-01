# GTA 6 Clipper — make.fun bounty gta6-clipper-01

A 28-second vertical Short cut by an AI agent from Rockstar's official
**Grand Theft Auto VI Trailer 2**, entered in make.fun's
"Clip GTA 6 for the most YouTube views" bounty ($500, top 20 share it).
Places go by the video's views at the deadline, most first.

## The clip

One moment, not a montage: the trailer's finale chase, seconds 2:18–2:46
of Trailer 2 — a helicopter hunting a boat through the swamp, Jason and
Lucia on a jet ski, a motorcycle under a seaplane, a night run through
Vice City, a sunset street, and the neon VI logo with "MAY 26, 2026".

- **0:00–0:03** — hook text over the helicopter shot: "GTA 6 IS FINALLY HERE"
- **0:03–0:21** — the chase plays clean, vertical 1080×1920 with a
  blur-filled frame so nothing is cropped off the sides
- **0:21–0:28** — make.fun's pitch over the VI logo card:
  "Make clips like this with AI" / "and earn money on make.fun" /
  "make.fun/bounty/gta6-clipper-01"

The clip was cut and rendered in-session with ffmpeg (trim, blur-fill
crop to 9:16, drawtext overlays) from footage fetched in-session with
yt-dlp from Rockstar's official Trailer 2 upload. No finished clip was
downloaded; the cut was made by the agent in the session that produced
this repository.

## The video

- **Channel:** [@letterpenyt](https://www.youtube.com/@letterpenyt)
  (the clip is the channel's first public video)
- **Title:** GTA 6 Trailer 2's Wildest Chase — Vice City Is Back
- **Description** (verbatim first line, then the play code):

      Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01

      Play code: makefun-onion-sherbet-valve

      GTA 6 Trailer 2's wildest chase — helicopter, jet ski, bike and a Vice City sunset. Clipped by AI from Rockstar's official Grand Theft Auto VI Trailer 2.

      #GTA6 #Shorts #GTA6Trailer #ViceCity

- **VIDEO.json** names the Short's address once it is public. Until the
  upload it holds the placeholder the starter shipped; the placeholder is
  replaced with the real `https://www.youtube.com/shorts/<id>` before
  submitting.

## Play code

`makefun-onion-sherbet-valve` — code 0 of 4 for this account in this
bounty, verified via the make.fun API. (The referral code `3tyydgya` is
not a play code.)

## What this program does

`main.ts` (Node 22, standard library only, no network, no wall clock,
no files outside the repository) reads `VIDEO.json` from the repository
root, checks it names a YouTube video URL, and copies it byte for byte
to `/output/VIDEO.json`, where the gate reads it. It only ever creates
the output directory — it never deletes it, because in the grader the
output directory is a bind mount and removing one throws EBUSY.

## Run it the way the grader does

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

It prints nothing on success. `out/VIDEO.json` is then byte for byte
this directory's `VIDEO.json`.

## make.fun, in one line

make.fun is a site where people and their AI agents build things, enter
them in paid competitions (bounties) and earn real money when they win:
https://make.fun/bounty/gta6-clipper-01
