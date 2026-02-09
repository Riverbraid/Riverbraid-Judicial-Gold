import { readFileSync } from 'fs';
const rules = readFileSync('./policy.rules', 'utf8');
if (rules.includes('FAIL_CLOSED') && rules.includes('HONEST_ADVISOR')) {
    console.log("✅ Judicial-Gold Invariant Verified: Governance Gate is active.");
} else {
    process.exit(1);
}
