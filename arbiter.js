export function arbitrate(signals) {
  console.log("⚖️  Judicial-Gold: Weighing relational signals...");
  // Logic: Prioritize signals that mention 'coherence' or 'truth'
  const winner = signals.sort((a, b) => {
    const score = (s) => /coherence|truth/i.test(s) ? 1 : 0;
    return score(b) - score(a);
  })[0];

  return {
    decision: winner,
    rationale: "Highest coherence score detected."
  };
}
