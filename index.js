const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./constitution.threshold.json', 'utf8'));

const evaluate = (proposalA, proposalB, state) => {
  const { deadlock_count, step } = state;
  const tiers = config.deadlock_resolution.tiers;
  
  // Tier Selection Logic
  let activeTier = tiers[0];
  if (deadlock_count >= tiers[2].deadlock_limit) activeTier = tiers[2];
  else if (deadlock_count >= tiers[1].deadlock_limit) activeTier = tiers[1];

  if (activeTier.level === 1) return "HALT_AND_REQUEST_TOKEN";
  
  if (activeTier.level === 2) {
    // Weighted deterministic choice based on hash if history is neutral
    return (BigInt('0x' + proposalA.id) > BigInt('0x' + proposalB.id)) ? "ALLOW_A" : "ALLOW_B";
  }

  if (activeTier.level === 3) {
    // Sequence-fixed deterministic apply
    return "SEQUENCE_ATOMIC";
  }
};
module.exports = { evaluate };
