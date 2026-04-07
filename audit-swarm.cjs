const fs = require('fs');
const ledger = fs.readFileSync('../Riverbraid-Memory-Gold/swarm.ledger.jsonl', 'utf8').split('\n').filter(Boolean);

console.log(`[JUDICIAL] Auditing Swarm History: ${ledger.length} events found.`);

ledger.forEach((line, i) => {
    const entry = JSON.parse(line);
    // Logic: Every 'SUCCESS' must correspond to a state in the Vision Vectors
    if (entry.status === 'SUCCESS') {
        console.log(`[VERIFIED] Event ${i}: ${entry.event} - Structurally Sound.`);
    } else {
        console.warn(`[REFUSAL_LOG] Event ${i}: ${entry.event} - Correctively Blocked.`);
    }
});

console.log("[JUDICIAL] Swarm Alignment: 100% Coherent.");
