// Riverbraid-Judicial-Gold – Fail-Closed Gate
// 7-bit ASCII only.

export const evaluateSignal = (signal, rules) => {
  if (!signal || !rules) return { decision: 'DENY', reason: 'AMBIGUOUS_INPUT' };

  const isCoherent = rules.every(rule => signal.includes(rule));
  
  return {
    decision: isCoherent ? 'ALLOW' : 'DENY',
    timestamp: null, 
    entropy: 0.0
  };
};
