import { readFileSync, writeFileSync } from "fs";
import { verify } from "./index.js";

const protocol = JSON.parse(readFileSync("protocol.steps", "utf8"));
const input = protocol.canonical_input;
const expectedResult = protocol.expected_result;

const result = verify(input);

const output = {
  schema: "riverbraid.gold.verify.output",
  version: "1.0.0",
  repo: "Riverbraid-Judicial-Gold",
  ring: 1,
  petal: "Judicial-Gold",
  invariant: "RULE_ADHERENCE",
  status: result.pass === expectedResult ? "VERIFIED" : "FAILED",
  result: result.pass,
  expected_result: expectedResult,
  canonical_signal: result.signal,
  canonical_reason: result.reason
};

writeFileSync("verify-output.json", JSON.stringify(output, null, 2) + "\n", "utf8");

if (output.status !== "VERIFIED") {
  console.error("JUDICIAL_GOLD_VERIFICATION_FAILED");
  process.exit(1);
}
console.log("JUDICIAL_GOLD_VERIFICATION_SUCCESS");
