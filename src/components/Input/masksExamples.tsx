import React from "react";
import { Input } from "./Input";
import "../../masking/handlers"; // side-effect: register default handlers

export const PhoneMaskDemo: React.FC = () => {
  const [value, setValue] = React.useState("");
  const [raw, setRaw] = React.useState("");

  const PhoneIcon = (
    <svg
      width="100%"
      height="100%"
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
        id="phone-mask-input"
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

  return (
    <div style={{ display: "grid", gap: 12, minWidth: 360 }}>
      <Input
        id="currency-mask-input"
        label="Amount"
        placeholder="0.00"
        mask={{ id: "currency" }}
        onValueChange={(v) => {
          setValue(v.formatted);
          setRaw(v.raw);
        }}
      />
      <div style={{ fontFamily: "monospace" }}>
        <div>Formatted: {value}</div>
        <div>Raw (cents): {raw}</div>
      </div>
    </div>
  );
};
