---
title: VIN & model codes (Gen 6 US, 1996-2000)
description: Read your VIN to find chassis code, engine, body, year and factory. Explains why US cars say EJ and not EK.
applies_to: [EJ6, EJ7, EJ8, EM1]
engines: [D16Y5, D16Y7, D16Y8, B16A2]
markets: [US]
difficulty: 1
time_min: 5
safety: low
sources:
  - { id: honda-sm-civic-96-00, pages: "1-2..1-31" }
verified: false
author: ej8civic
updated: 2026-11-11
---

# VIN & model codes (Gen 6 US, 1996-2000)

Everything else in this wiki is filtered by your chassis code and engine. Find them here first.

> **Applies to:** EJ6 · EJ7 · EJ8 · EM1 · US <br>
> **Difficulty:** 1/5 · **Time:** 5 min

<br>

## Context

- The VIN and safety label are on the driver's door jamb. The paint code is on a sticker in the same area.
- **"EK" vs "EJ":** EK (EK3, EK4, EK9...) is the JDM/European chassis code for this generation. US Civics carry **EJ6, EJ7, EJ8 or EM1** in the VIN. Community talk often says "EK" for the whole generation.
- The engine code is stamped on the block, with a serial number (e.g. `D16Y8-1500001`).

<br>

## VIN layout

```
1HG  EJ8  1  2  *  T  L  000001
 │    │   │  │  │  │  │    └ serial number
 │    │   │  │  │  │  └ factory
 │    │   │  │  │  └ model year
 │    │   │  │  └ check digit
 │    │   │  └ vehicle grade (trim; meaning varies by body/year)
 │    │   └ body + transmission
 │    └ line, body & engine  ← your chassis code
 └ manufacturer
```

<br>

## Line codes (VIN positions 4-6)

| Code | Engine | Engine type | Bodies | Years |
|---|---|---|---|---|
| EJ6 | D16Y7 | 1.6 SOHC 16v | hatchback, sedan, coupe | 1996-2000 |
| EJ7 | D16Y5 | 1.6 SOHC VTEC-E 16v | coupe | 1996-2000 |
| **EJ8** | **D16Y8** | **1.6 SOHC VTEC 16v** | **coupe, sedan** | **1996-2000** |
| EM1 | B16A2 | 1.6 DOHC VTEC 16v | coupe | 1999-2000 |

<br>

## Other positions

| Position | Code | Meaning |
|---|---|---|
| 1-3 | 1HG | Honda of America Mfg. (USA) |
| 1-3 | 2HG | Honda of Canada Mfg. |
| 1-3 | JHM | Honda Motor Co. (Japan) |
| 10 | T / V / W / X / Y | 1996 / 1997 / 1998 / 1999 / 2000 |
| 11 | L | East Liberty, Ohio, USA |
| 11 | H | Alliston, Ontario, Canada |
| 11 | S | Suzuka, Mie, Japan |

| Transmission code | Type |
|---|---|
| S40 | 5-speed manual |
| A4RA | 4-speed automatic |
| M4VA | CVT (D16Y5 only) |

<br>

## Checklist

- [ ] VIN read from the door jamb label
- [ ] Chassis code noted (EJ6 / EJ7 / EJ8 / EM1)
- [ ] Engine code on the block matches the VIN
- [ ] Model year letter noted

<br>

## Sources

- Honda Civic 1996-2000 Service Manual, "Chassis and Paint Codes", pp. 1-2 to 1-31 (`honda-sm-civic-96-00`)
- Data: [`data/models/gen6-us.yaml`](../../data/models/gen6-us.yaml)
