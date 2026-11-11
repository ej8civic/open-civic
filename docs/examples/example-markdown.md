---
this is an example markdown file, used for structure only.
Do not copy and paste this file, follow the pattern and use the sections as relevant. 
---

# Doc Title

Quick doc explanation, medium description

> **Author:** ej8civic <br>
> **Last Updated:** `YYYY-MM-DD, HH:MM`


<br>
<!-- Try to use the <br> tag instead of triple dash "---" or <hr> -->


## Context

Brief description of the doc.


<br>


## Graph / Relation

```mermaid
graph TD
    A[Frontend] --> B[API Gateway]
    B --> C[Auth Service]
    B --> D[Core Service]
    D --> E[(Database)]
    D --> F[Queue]
    F --> G[Worker]
```


<br>


## Tables

| Person  | Role   | When to Contact |
|---------|--------|-----------------|
| Andrey  | senior | 01/02/2027 |
| Laufrey | pleno  | 15/02/2027 |


<br>


## Checklist

- [x] Repo access transferred
- [ ] Dashboard access granted
- [ ] API keys documented
- [ ] On-call rotation updated


<br>


## Bullets

- Point 1
- Point 2, exmplanation
- **Point 3**: develop
> Notice


<br>


## Sources

- Source name: [~/docs/filename.md](~/docs/filename.md)
- Repository: [ej8civic/reponame](https://github.com/ej8civic/reponame)
