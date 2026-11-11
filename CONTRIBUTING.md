# Contributing

## Rules

1. **No source, no number.** Every spec cites an approved id from [`sources/registry.yaml`](sources/registry.yaml), with a page.
2. **New source? Open an issue first.** A maintainer approves it (status, trust, policy) before anything is written from it.
3. **Forums are leads, not proof.** Trust-D sources can point to a problem; the fix needs an A/B/C source or a documented test on a real car.
4. **Copyrighted manuals:** restate facts in your own words. Never paste their text, figures or scans.
5. **One topic per file**, short. Start from [`docs/_templates/page.md`](docs/_templates/page.md).
6. **Data first.** If a table exists in `data/`, generate it (`npm run gen`); don't type it into the doc.
7. **`verified: true`** only when you did the job on a real car. Say which car in the PR.

## Adding a source

```yaml
- id: short-kebab-id
  title: ...
  url: ...
  type: official | open-source | community | vendor | forum
  trust: A | B | C | D
  license: ...
  policy: redistribute | cite-only | link-only | lead-only
  status: pending
```

Large redistributable files go in `sources/public/<id>/` (Git LFS).
Copyrighted files go in `sources/private/` (git-ignored, local only).

## Before a PR

```sh
npm run check
```
