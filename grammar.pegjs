start = directive

directive = p:principle _ "BECAUSE" _ r:reason {
  return {
    principle: p,
    reason: r,
    timestamp: Date.now()
  };
}

principle = "MECHANICAL_HONESTY" / "COHERENCE" / "FAIL_CLOSED" / "STATIONARY_STATE"

reason = [A-Z0-9_]+ { return text(); }

_ "whitespace" = [ \t\n\r]*
