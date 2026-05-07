# AUTHORITY

Repository: Riverbraid-Judicial-Gold
Ring: 1
Class: Gold petal
Invariant: RULE_ADHERENCE

## Authority Boundary
This repository verifies only its own rule adherence invariant.
It does not verify the full Riverbraid constellation.
It does not verify any other repository.
It does not expand the Riverbraid-Core claim boundary.

## Allowed Claim
Given the canonical input declared in protocol.steps, this repository deterministically evaluates whether input.claim contains input.required_token using a case-sensitive string containment rule and verifies that the result matches expected_result.
