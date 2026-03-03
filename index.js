export const RB_PETAL_ID = 'Riverbraid-Judicial-Gold';
export function evaluate(input, predicates) {
  const failures = predicates.filter(p => p.test(input) !== true).map(p => p.name);
  return { passed: failures.length === 0, failures };
}
export function gate(input, predicates) {
  const result = evaluate(input, predicates);
  if (!result.passed) throw new Error(`JUDICIAL_GATE_CLOSED: ${result.failures.join(', ')}`);
  return true;
}
export function getStatus() { return { status: 'STATIONARY', petal: RB_PETAL_ID }; }
