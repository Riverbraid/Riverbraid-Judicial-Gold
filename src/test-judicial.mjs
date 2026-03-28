import fs from 'node:fs';
import { execSync } from 'node:child_process';

const RULES_PATH = '/workspaces/Riverbraid-Judicial-Gold/policy.rules';
const VALIDATOR = '/workspaces/Riverbraid-Judicial-Gold/src/validate-rules.mjs';

const runTest = (name, content, expectedPass) => {
    fs.writeFileSync(RULES_PATH, content);
    try {
        execSync(`node ${VALIDATOR}`, { stdio: 'ignore' });
        if (expectedPass) console.log(`OK: ${name}`);
    } catch (e) {
        if (!expectedPass) console.log(`OK: ${name} (Rejected)`);
        else { console.error(`FAIL: ${name}`); process.exit(1); }
    }
};

console.log("--- JUDICIAL STRESS TESTS ---");
runTest("Valid Policy", ".* DENY\nALLOW internal", true);
runTest("Missing Deny", "ALLOW internal", false);
