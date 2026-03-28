import fs from 'fs';
import peg from 'pegjs';

const grammar = fs.readFileSync('/workspaces/Riverbraid-Judicial-Gold/src/policy.pegjs', 'utf8');
const parser = peg.generate(grammar);
const ruleset = fs.readFileSync('/workspaces/Riverbraid-Judicial-Gold/policy.rules', 'utf8');

try {
  const result = parser.parse(ruleset);
  console.log("✅ JUDICIAL_GRAMMAR_VALIDATION: PASS");
  console.log(`Parsed ${result.filter(r => r?.type === 'RULE').length} rules.`);
} catch (e) {
  console.error(`FATAL: Judicial Grammar Violation at line ${e.location.start.line}, column ${e.location.start.column}`);
  console.error(`Message: ${e.message}`);
  process.exit(1);
}
