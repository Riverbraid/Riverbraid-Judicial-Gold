import { readFileSync, writeFileSync, appendFileSync } from 'fs';
import { execSync } from 'child_process';

const LOG_PATH = './logs/audit.log';

const audit = (actionName, result) => {
  try {
    // 1. Get current Cognition state for the record
    const rawCognition = execSync('node /workspaces/Riverbraid-Cognition/bin/evaluate_coherence.mjs').toString();
    const cognition = JSON.parse(rawCognition);

    const logEntry = {
      timestamp: new Date().toISOString(),
      action: actionName,
      result: result,
      coherence: cognition.signal,
      frequency: cognition.frequency,
      anchor: "adef13" // The expected stationary invariant
    };

    appendFileSync(LOG_PATH, JSON.stringify(logEntry) + '\n');
    console.log("JUDICIAL: Event seated in audit log.");
  } catch (e) {
    console.error("JUDICIAL_FAILURE: Could not record event state.");
  }
};

// Handle CLI input for auditing
const [,, action, status] = process.argv;
if (action && status) {
  audit(action, status);
}
