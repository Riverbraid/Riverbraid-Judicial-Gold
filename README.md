# Riverbraid-Judicial-Gold

**Signal:** `LEAST_ENTROPY`  
**Cluster:** [Riverbraid Gold v1.1](https://github.com/Riverbraid/Riverbraid-Golds)  
**Language:** Python ≥ 3.10  
**Status:** Active — Stationary

-----

## What It Is

Riverbraid-Judicial-Gold is the **governance gate** of the Riverbraid Gold Cluster. It evaluates system state against a defined set of policy rules and returns a deterministic `ALLOW` or `DENY` verdict.

Adjudication is fail-closed: any error in loading rules or evaluating state returns `DENY`. There is no ambiguous outcome.

-----

## What It Is Not

- Not a content moderation or semantic filter
- Not a moral reasoning engine
- Not adaptive — verdicts are determined entirely by the rules in `policy.rules`
- Not responsible for enforcing the verdict — that belongs to the wrapper layer

-----

## How It Works

Rules are loaded from `policy.rules`. Each rule specifies a field, an operator, a threshold, and an action. Rules are evaluated in order. The first `DENY` rule that triggers short-circuits evaluation and returns immediately.

If no rule triggers a `DENY`, the verdict is `ALLOW`.

**Rule operators:** `gte`, `lte`, `eq`, `neq`

**Example rule structure:**

```json
[
  {"field": "systemic_load", "operator": "gte", "threshold": 0.85, "action": "DENY"},
  {"field": "coherence_confidence", "operator": "lte", "threshold": 0.30, "action": "DENY"}
]
```

-----

## Usage

```python
from judicial import adjudicate

state = {
    "systemic_load": 0.9,
    "coherence_confidence": 0.2
}

result = adjudicate(state)
# result["verdict"] → "DENY"
# result["triggered_rule"] → the rule that matched
# result["signal"] → "LEAST_ENTROPY"
```

**Verify from the command line:**

```bash
python verify.py
# Output: [Signal: LEAST_ENTROPY | Braid: CLOSED-LOOP]
```

-----

## Files

|File            |Purpose                                       |
|----------------|----------------------------------------------|
|`judicial.py`   |Core adjudication logic                       |
|`__init__.py`   |Public API surface                            |
|`verify.py`     |Fail-closed verification entry point          |
|`policy.rules`  |Rule definitions (data, not code)             |
|`protocol.steps`|Canonical protocol definition (data, not code)|

-----

## Design Properties

- **Deterministic** — identical state and rules always produce identical verdicts
- **Fail-closed** — errors return `DENY`; there is no fallback to `ALLOW`
- **Order-sensitive** — rules are evaluated in sequence; first match wins
- **Auditable** — every verdict includes the triggering rule for inspection
- **Standard library only** — no dependencies

-----

## Part of the Riverbraid Gold Cluster

|Petal                                                                                   |Signal                   |Purpose                      |
|----------------------------------------------------------------------------------------|-------------------------|-----------------------------|
|[Riverbraid-Golds](https://github.com/Riverbraid/Riverbraid-Golds)                      |—                        |Cluster manifest and pipeline|
|[Riverbraid-Core](https://github.com/Riverbraid/Riverbraid-Core)                        |Root                     |Capacity control substrate   |
|[Riverbraid-Crypto-Gold](https://github.com/Riverbraid/Riverbraid-Crypto-Gold)          |`MECHANICAL_HONESTY`     |SHA-256 state anchoring      |
|[Riverbraid-Refusal-Gold](https://github.com/Riverbraid/Riverbraid-Refusal-Gold)        |`BOUNDARY_LOGIC`         |Boundary enforcement         |
|[Riverbraid-Memory-Gold](https://github.com/Riverbraid/Riverbraid-Memory-Gold)          |`MEANING_CENTRIC`        |Meaning-centric persistence  |
|[Riverbraid-Integration-Gold](https://github.com/Riverbraid/Riverbraid-Integration-Gold)|`SEMANTIC_BRIDGE`        |Mode enactment               |
|[Riverbraid-Harness-Gold](https://github.com/Riverbraid/Riverbraid-Harness-Gold)        |`STATIONARY_STATE_ACTIVE`|Cluster verification harness |

-----

## License

See `LICENSE`.
