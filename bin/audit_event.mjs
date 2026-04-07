import { appendFileSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOG_PATH = join(__dirname, '../logs/audit.log');

const audit = (actionName, result) => {
  try {
    // Ensure logs directory exists at runtime
    mkdirSync(dirname(LOG_PATH), { recursive: true });

    const rawCognition = execSync('node /workspaces/Riverbraid-Cognition/bin/evaluate_coherence.mjs').toString();
    const cognition = JSON.parse(rawCognition);

    const logEntry = {
      timestamp: new Date().toISOString(),
      action: actionName,
      result: result,
      coherence: cognition.signal,
      frequency: cognition.frequency,
      anchor: "adef13"
    };

    appendFileSync(LOG_PATH, JSON.stringify(logEntry) + '\n');
    console.log("JUDICIAL: Event seated in absolute audit log.");
  } catch (e) {
    console.error("JUDICIAL_FAILURE: Check permissions or pathing.");
    console.error(e.message);
  }
};

const [,, action, status] = process.argv;
if (action && status) {
  audit(action, status);
}
