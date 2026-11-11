# sources

- `registry.yaml`: every source, with its approval, trust level and usage policy. The validator enforces it.
- `public/<source-id>/`: redistributable files (Git LFS).
- `private/`: copyrighted or unlicensed files. Git-ignored, local only.
- `repos/<source-id>/`: upstream repositories as git submodules, pinned to a commit (see `/.gitmodules`).

## Submodules

```sh
git submodule update --init --depth 1                        # all except rusefi
git submodule update --init --checkout sources/repos/rusefi  # rusefi (large, opt-in)
git submodule update --remote sources/repos/<id>             # bump a pin, then commit
```

A submodule is a link to an upstream commit, not a copy, so it doesn't redistribute files.
Each repo keeps its own license (see `registry.yaml`).

**Windows:** `obdb-honda-civic/tests/` has filenames with `|`, which Windows can't create. Skip that folder locally:

```sh
cd sources/repos/obdb-honda-civic
git sparse-checkout set --no-cone '/*' '!/tests/'
git -c core.protectNTFS=false read-tree -mu HEAD
```
