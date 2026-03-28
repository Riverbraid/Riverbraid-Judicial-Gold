/**
 * Riverbraid-Judicial-Gold: index.js
 * Fail-Closed Predicate Governance (v1.3.0)
 */

export const RB_PETAL_ID = 'Riverbraid-Judicial-Gold';

export function evaluate(input, predicates) {
  if (!Array.isArray(predicates) || predicates.length === 0) {
    return { passed: false, failures: ['NO_PREDICATES: at least one predicate required'] };
  }
  const failures = [];
  for (const predicate of predicates) {
    if (typeof predicate.test !== 'function') {
      failures.push(`INVALID_PREDICATE: ${predicate.name ?? 'unnamed'} has no test function`);
      continue;
    }
    try {
      const result = predicate.test(input);
      if (result !== true) failures.push(`PREDICATE_FAILED: ${predicate.name ?? 'unnamed'}`);
    } catch (err) {
      failures.push(`PREDICATE_ERROR: ${predicate.name ?? 'unnamed'}: ${err.message}`);
    }
  }
  return { passed: failures.length === 0, failures };
}

export function gate(input, predicates) {
  const result = evaluate(input, predicates);
  if (!result.passed) {
    throw new Error(`JUDICIAL_GATE_CLOSED: ${result.failures.join('; ')}`);
  }
  return true;
}

export function getStatus() {
  return { status: 'STATIONARY', petal: RB_PETAL_ID };
}
