"use client";

import { useState } from "react";

export default function CopyChip({ prefix, value }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="chip">
      <span className="chip__sign" aria-hidden="true">$</span>
      <span className="chip__text">{prefix} {value}</span>
      <button type="button" className="chip__copy" onClick={copy} aria-label={`Copy ${value}`}>
        {copied ? (
          "Copied"
        ) : (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
            <path d="M3 10.5H2.5v-8h8V3" />
          </svg>
        )}
      </button>
      <span className="sr-only" aria-live="polite">{copied ? "Copied" : ""}</span>
    </div>
  );
}
