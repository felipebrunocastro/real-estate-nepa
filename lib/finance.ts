/**
 * Pure finance helpers for the calculator tools. No side effects, no I/O — the
 * same functions can back future calculators (affordability, cap rate, cash
 * flow) as those phases arrive. All figures are estimates for informational
 * use only, never quotes or advice.
 */

/** Monthly principal & interest for a fully-amortizing loan. */
export function monthlyPrincipalAndInterest(
  loanAmount: number,
  annualRatePct: number,
  termYears: number,
): number {
  const n = Math.round(termYears * 12);
  if (n <= 0 || loanAmount <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return loanAmount / n;
  const factor = Math.pow(1 + r, n);
  return (loanAmount * (r * factor)) / (factor - 1);
}

export interface MortgageInput {
  homePrice: number;
  downPayment: number;
  termYears: number;
  ratePct: number;
  propertyTaxAnnual: number;
  insuranceAnnual: number;
  hoaMonthly: number;
}

export interface MortgageResult {
  loanAmount: number;
  downPaymentPct: number;
  principalInterest: number;
  taxMonthly: number;
  insuranceMonthly: number;
  hoaMonthly: number;
  total: number;
}

/** Compute the full monthly payment breakdown for a mortgage. */
export function computeMortgage(input: MortgageInput): MortgageResult {
  const homePrice = Math.max(0, input.homePrice);
  const downPayment = Math.min(Math.max(0, input.downPayment), homePrice);
  const loanAmount = Math.max(0, homePrice - downPayment);
  const downPaymentPct = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;

  const principalInterest = monthlyPrincipalAndInterest(
    loanAmount,
    input.ratePct,
    input.termYears,
  );
  const taxMonthly = Math.max(0, input.propertyTaxAnnual) / 12;
  const insuranceMonthly = Math.max(0, input.insuranceAnnual) / 12;
  const hoaMonthly = Math.max(0, input.hoaMonthly);
  const total = principalInterest + taxMonthly + insuranceMonthly + hoaMonthly;

  return {
    loanAmount,
    downPaymentPct,
    principalInterest,
    taxMonthly,
    insuranceMonthly,
    hoaMonthly,
    total,
  };
}
