export const evaluate = (action, context) => {
    const isStationary = context.merkle_root === "08e829";
    const isGated = (context.complexity / context.structure) <= 1.0;
    return isStationary && isGated;
};
