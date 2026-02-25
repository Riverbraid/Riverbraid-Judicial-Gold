import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from './parser.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function fatal(msg) {
  console.error(`⚖️ FATAL:JUDICIAL_GATE:${msg}`);
  process.exit(1);
}

try {
    const policyPath = path.resolve(__dirname, '../policy.rules');
    if (!fs.existsSync(policyPath)) fatal('policy.rules missing');

    const policyText = fs.readFileSync(policyPath, 'utf8');
    const lines = policyText.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    
    for (const line of lines) {
        const result = parse(line.trim());
        console.log(`⚖️ JUDGMENT_VALIDATED: ${result.principle}`);
    }

    console.log('PASS:JUDICIAL_INVARIANTS');
} catch (e) {
    fatal(`Policy Violation: ${e.message}`);
}
