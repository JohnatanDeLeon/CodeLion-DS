import React from "react";
import { Input } from "./Input";
import "../../masking/handlers"; // side-effect: register default handlers
import { logger } from "../../utils/logger";

export const PhoneMaskDemo: React.FC = () => {
  const [value, setValue] = React.useState("");
  const [raw, setRaw] = React.useState("");

  const PhoneIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.09 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12 1.05.37 2.07.73 3.03a2 2 0 0 1-.45 2.11L8.91 10.91a16 16 0 0 0 6 6l1.05-1.05a2 2 0 0 1 2.11-.45c.96.36 1.98.61 3.03.73A2 2 0 0 1 22 16.92z" />
    </svg>
  );

  return (
    <div style={{ display: "grid", gap: 12, minWidth: 360 }}>
      <Input
        label="Phone"
        placeholder="(555) 555-5555"
        icon={PhoneIcon}
        iconPosition="left"
        mask={{ id: "phone" }}
        onValueChange={(v) => {
          setValue(v.formatted);
          setRaw(v.raw);
        }}
      />
      <div style={{ fontFamily: "monospace" }}>
        <div>Formatted: {value}</div>
        <div>Raw: {raw}</div>
      </div>
    </div>
  );
};

export const CurrencyMaskDemo: React.FC = () => {
  const [value, setValue] = React.useState("");
  const [raw, setRaw] = React.useState("");
  const [meta, setMeta] = React.useState<Record<string, unknown>>({});

  const handleValueChange = (v: {
    raw: string;
    formatted: string;
    meta?: Record<string, unknown>;
  }) => {
    setValue(v.formatted);
    setRaw(v.raw);
    setMeta(v.meta || {});
    logger.info("Currency mask result:", v);
  };

  return (
    <div style={{ display: "grid", gap: 12, minWidth: 360 }}>
      <Input
        label="Amount"
        placeholder="0.00"
        mask={{ id: "currency" }}
        onValueChange={handleValueChange}
      />
      <div style={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
        <div>Formatted: {value || "0.00"}</div>
        <div>Raw (cents): {raw || "0"}</div>
        <div>
          Value in Dollars: $
          {meta.valueInDollars
            ? Number(meta.valueInDollars).toFixed(2)
            : "0.00"}
        </div>
        <div>Is Empty: {meta.isEmpty ? "Yes" : "No"}</div>
      </div>

      <div
        style={{
          padding: "1rem",
          backgroundColor: "#eff6ff",
          borderRadius: "8px",
          border: "1px solid #bfdbfe",
          fontSize: "0.875rem",
        }}
      >
        <h4 style={{ margin: "0 0 0.5rem 0", color: "#1e40af" }}>
          💡 How to Test
        </h4>
        <ul
          style={{
            margin: "0.5rem 0",
            paddingLeft: "1.5rem",
            color: "#1e40af",
          }}
        >
          <li>
            <strong>Click at the beginning</strong> and type &quot;3&quot; →
            Should show &quot;3.00&quot;
          </li>
          <li>
            <strong>Click at the end</strong> and type &quot;3&quot; → Should
            show &quot;3.00&quot;
          </li>
          <li>
            <strong>Type anywhere</strong> → Should always format correctly
          </li>
          <li>
            <strong>Raw value</strong> is always in cents for accurate
            calculations
          </li>
        </ul>
      </div>
    </div>
  );
};
