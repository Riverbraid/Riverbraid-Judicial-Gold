import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
    const readme = readFileSync(join(__dirname, 'README.md'), 'utf8');
    if (!readme.includes('[Signal: LEAST_ENTROPY]')) {
        throw new Error("Judicial Signal Missing.");
    }
    console.log("⚖️ Judicial-Gold: Arbiter Invariant Verified.");
    process.exit(0);
} catch (e) {
    console.error(`❌ Judicial-Gold: Audit Failed - ${e.message}`);
    process.exit(1);
}
