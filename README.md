# Riverbraid Gold Cluster Repository
[ARCHITECTURE.md Spec](https://github.com/Riverbraid/Riverbraid-Golds/blob/main/ARCHITECTURE.md)
---

# Riverbraid Judicial-Gold
**Signal:** LEAST_ENTROPY

## Role
The sovereign arbiter of the Gold Cluster. It enforces the "Fail-Closed" protocol, ensuring that any ambiguous state defaults to a `DENY` response.

## Rule Architecture
Rules are stored in `policy.rules` and validated via `src/validate-rules.mjs`.
