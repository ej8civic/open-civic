---
title: Page title (short, task-shaped, e.g. "Engine oil change")
description: One sentence, what the reader gets from this page.
applies_to: [EJ8]            # chassis / VIN line codes, or [all]
engines: [D16Y8]
markets: [US]                # BR | JP | US
difficulty: 1                # 1 (anyone) .. 5 (specialist)
time_min: 45
safety: medium               # low | medium | high -> renders a warning box
tools: [example tool]
sources:                     # ids from sources/registry.yaml, approved only
  - { id: honda-sm-civic-96-00, pages: "8-6" }
verified: false              # true only after a human did it on a real car
author: ej8civic
updated: YYYY-MM-DD
---

# Page title

One or two lines: what this is and when you need it.

> **Applies to:** EJ8 · D16Y8 · US <br>
> **Difficulty:** 1/5 · **Time:** 45 min · **Safety:** medium

<br>

## Context

Why this matters, what can go wrong, what you need to know first.

<br>

## Specs

| Item | Value | Source |
|---|---|---|
| Example | 39 N·m (29 lbf·ft) | SM 8-6 |

<br>

## Steps

1. Step, one action per line.
2. Step.

<br>

## Checklist

- [ ] Done item

<br>

## Sources

- Honda Civic 1996-2000 Service Manual, p. 8-6 (`honda-sm-civic-96-00`)

<!--
Rules:

- One topic per file. Keep it short; split if it grows past ~150 lines.
- Every number needs a source (id + page). No source, no number.
- Tables that exist in data/ must be generated with "gen:" marker blocks (see tools/gen-tables.mjs, run npm run gen).
- Use <br> between sections instead of --- or <hr>.

-->
