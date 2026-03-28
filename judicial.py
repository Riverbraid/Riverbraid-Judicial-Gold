from pathlib import Path
import json

INVARIANT_SIGNAL = "LEAST_ENTROPY"

def load_rules(rules_path: str | None = None) -> list[dict]:
    path = Path(rules_path) if rules_path else Path(__file__).parent / "policy.rules"
    if not path.exists():
        raise FileNotFoundError(f"policy.rules not found at {path}")
    content = path.read_text(encoding="utf-8").strip()
    try:
        rules = json.loads(content)
        if isinstance(rules, list): return rules
    except json.JSONDecodeError: pass
    return [json.loads(line) for line in content.splitlines() if line.strip()]

def evaluate(state: dict, rules: list[dict]) -> dict:
    for rule in rules:
        field = rule.get("field"); operator = rule.get("operator"); threshold = rule.get("threshold"); action = rule.get("action", "DENY")
        value = state.get(field)
        if value is None: continue
        triggered = False
        if operator == "gte" and value >= threshold: triggered = True
        elif operator == "lte" and value <= threshold: triggered = True
        elif operator == "eq" and value == threshold: triggered = True
        elif operator == "neq" and value != threshold: triggered = True
        if triggered and action == "DENY":
            return {"verdict": "DENY", "triggered_rule": rule, "signal": INVARIANT_SIGNAL}
    return {"verdict": "ALLOW", "triggered_rule": None, "signal": INVARIANT_SIGNAL}

def adjudicate(state: dict, rules_path: str | None = None) -> dict:
    try:
        rules = load_rules(rules_path)
        return evaluate(state, rules)
    except Exception as exc:
        return {"verdict": "DENY", "triggered_rule": {"reason": str(exc)}, "signal": INVARIANT_SIGNAL}
