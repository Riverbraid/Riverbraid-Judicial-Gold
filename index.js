export const PETAL = "Judicial-Gold";
export const INVARIANT = "RULE_ADHERENCE";

export function verify(input) {
  if (!input || typeof input.claim !== "string" || typeof input.required_token !== "string") {
    return {
      pass: false,
      signal: "judicial:INVALID_INPUT",
      reason: "input.claim and input.required_token must be strings"
    };
  }

  const pass = input.claim.includes(input.required_token);

  return {
    pass,
    signal: pass ? "judicial:RULE_MET" : "judicial:RULE_VIOLATED",
    reason: pass
      ? "Claim contains required token"
      : "Claim does not contain required token"
  };
}
