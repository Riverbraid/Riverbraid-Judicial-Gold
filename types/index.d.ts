export interface EvaluationResult {
    allowed: boolean;
    timestamp: number;
    protocol: string;
}
export function evaluate(context: object, rules: any[]): EvaluationResult;
