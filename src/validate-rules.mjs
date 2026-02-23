import fs from 'node:fs';
const path = '/workspaces/Riverbraid-Judicial-Gold/policy.rules';
if (!fs.existsSync(path)) {
    console.error('FATAL: policy.rules missing');
    process.exit(1);
}
const content = fs.readFileSync(path, 'utf8');
const hasCatchAll = content.includes('.*');
const hasDeny = content.includes('DENY');

if (!hasCatchAll || !hasDeny) {
    console.error('FATAL: FAIL_CLOSED_INVARIANT_BROKEN');
    process.exit(1);
}
console.log('RULES_VALID');
