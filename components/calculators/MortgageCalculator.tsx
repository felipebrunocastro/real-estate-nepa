"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { computeMortgage } from "@/lib/finance";
import { formatUsd, cn } from "@/lib/utils";
import { CalcField } from "./CalcField";
import { Icon } from "@/components/ui/Icon";

const TERM_OPTIONS = [30, 20, 15, 10];

const num = (s: string) => {
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
};

const usd0 = (v: number) => formatUsd(Math.round(v));

/**
 * Interactive mortgage payment estimator. Recomputes live as inputs change.
 * All math is client-side via the pure `computeMortgage` helper — no backend.
 * Results are estimates only (see disclaimer), never a loan quote.
 */
export function MortgageCalculator() {
  const t = useTranslations("calculators.mortgage");

  const [homePrice, setHomePrice] = useState("250000");
  const [downPayment, setDownPayment] = useState("50000");
  const [termYears, setTermYears] = useState("30");
  const [rate, setRate] = useState("6.5");
  const [propertyTax, setPropertyTax] = useState("3000");
  const [insurance, setInsurance] = useState("1200");
  const [hoa, setHoa] = useState("0");

  const result = useMemo(
    () =>
      computeMortgage({
        homePrice: num(homePrice),
        downPayment: num(downPayment),
        termYears: num(termYears),
        ratePct: num(rate),
        propertyTaxAnnual: num(propertyTax),
        insuranceAnnual: num(insurance),
        hoaMonthly: num(hoa),
      }),
    [homePrice, downPayment, termYears, rate, propertyTax, insurance, hoa],
  );

  function reset() {
    setHomePrice("250000");
    setDownPayment("50000");
    setTermYears("30");
    setRate("6.5");
    setPropertyTax("3000");
    setInsurance("1200");
    setHoa("0");
  }

  const segments = [
    { key: "principalInterest", value: result.principalInterest, color: "bg-accent-500", dot: "var(--color-accent-500)" },
    { key: "propertyTax", value: result.taxMonthly, color: "bg-navy-600", dot: "var(--color-navy-600)" },
    { key: "homeInsurance", value: result.insuranceMonthly, color: "bg-accent-300", dot: "var(--color-accent-300)" },
    { key: "hoa", value: result.hoaMonthly, color: "bg-sand-300", dot: "var(--color-sand-300)" },
  ] as const;

  const total = result.total || 1;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
      {/* Inputs */}
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <CalcField
            id="m-price"
            label={t("inputs.homePrice")}
            value={homePrice}
            onChange={setHomePrice}
            prefix="$"
            step={1000}
          />
          <CalcField
            id="m-down"
            label={t("inputs.downPayment")}
            value={downPayment}
            onChange={setDownPayment}
            prefix="$"
            step={1000}
            help={t("inputs.downPaymentHelp", {
              pct: result.downPaymentPct.toFixed(1),
            })}
          />
          <div>
            <label htmlFor="m-term" className="mb-1.5 block text-sm font-semibold text-navy-800">
              {t("inputs.loanTerm")}
            </label>
            <select
              id="m-term"
              value={termYears}
              onChange={(e) => setTermYears(e.target.value)}
              className="w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-navy-900 focus:border-accent-500 focus:outline-none"
            >
              {TERM_OPTIONS.map((y) => (
                <option key={y} value={y}>
                  {t("inputs.years", { years: y })}
                </option>
              ))}
            </select>
          </div>
          <CalcField
            id="m-rate"
            label={t("inputs.interestRate")}
            value={rate}
            onChange={setRate}
            suffix="%"
            step={0.1}
          />
          <CalcField
            id="m-tax"
            label={t("inputs.propertyTax")}
            value={propertyTax}
            onChange={setPropertyTax}
            prefix="$"
            suffix={t("inputs.perYear")}
            step={100}
          />
          <CalcField
            id="m-ins"
            label={t("inputs.homeInsurance")}
            value={insurance}
            onChange={setInsurance}
            prefix="$"
            suffix={t("inputs.perYear")}
            step={100}
          />
          <CalcField
            id="m-hoa"
            label={t("inputs.hoa")}
            value={hoa}
            onChange={setHoa}
            prefix="$"
            suffix={t("inputs.perMonth")}
            step={10}
          />
        </div>

        <button
          type="button"
          onClick={reset}
          className="text-sm font-semibold text-accent-600 hover:text-accent-700"
        >
          {t("reset")}
        </button>
      </form>

      {/* Results */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-xl border border-border bg-surface p-6">
          <p className="text-sm font-medium text-muted">{t("results.total")}</p>
          <p className="mt-1 font-display text-4xl font-bold text-navy-900">
            {usd0(result.total)}
            <span className="ml-1 text-base font-medium text-muted">
              {t("inputs.perMonth")}
            </span>
          </p>

          {/* Breakdown bar */}
          <div
            className="mt-5 flex h-3 overflow-hidden rounded-full bg-sand-100"
            role="img"
            aria-label={t("results.breakdownLabel")}
          >
            {segments.map((s) => (
              <div
                key={s.key}
                className={cn(s.color)}
                style={{ width: `${(s.value / total) * 100}%` }}
              />
            ))}
          </div>

          {/* Rows */}
          <dl className="mt-5 space-y-3">
            {segments.map((s) => (
              <div key={s.key} className="flex items-center justify-between text-sm">
                <dt className="flex items-center gap-2 text-navy-700">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: s.dot }}
                    aria-hidden="true"
                  />
                  {t(`results.${s.key}`)}
                </dt>
                <dd className="font-semibold text-navy-900">{usd0(s.value)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-navy-700">{t("results.loanAmount")}</span>
              <span className="font-semibold text-navy-900">{usd0(result.loanAmount)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-navy-700">{t("results.downPaymentPercent")}</span>
              <span className="font-semibold text-navy-900">
                {result.downPaymentPct.toFixed(1)}%
              </span>
            </div>
          </div>

          <p className="mt-5 flex items-start gap-2 rounded-md bg-sand-100 p-3 text-xs leading-relaxed text-muted">
            <Icon name="document" className="mt-0.5 h-4 w-4 shrink-0" />
            {t("disclaimer")}
          </p>
        </div>
      </aside>
    </div>
  );
}
