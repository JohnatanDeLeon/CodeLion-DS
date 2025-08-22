import React from "react";
import { Input } from "./Input";
import "../../masking/handlers"; // side-effect: register default handlers
import { defaultRegistry } from "../../masking/registry";
import { logger } from "../../utils/logger";

export const CurrencyTest: React.FC = () => {
  const [value, setValue] = React.useState("");
  const [raw, setRaw] = React.useState("");
  const [debug, setDebug] = React.useState("");
  const [meta, setMeta] = React.useState<Record<string, unknown>>({});

  // Debug: Check what handlers are registered
  React.useEffect(() => {
    const handlers = defaultRegistry.list();
    setDebug(`Registered handlers: ${handlers.join(", ")}`);
    logger.info("Available handlers:", handlers);

    // Test the currency handler directly
    const currencyHandler = defaultRegistry.get("currency");
    if (currencyHandler) {
      logger.info("Currency handler found:", currencyHandler);
      const testResult = currencyHandler.apply("123", null);
      logger.info("Test result for '123':", testResult);
    } else {
      logger.error("Currency handler NOT found!");
    }
  }, []);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    logger.debug("Input change event:", e.target.value);
  };

  return (
    <div style={{ display: "grid", gap: 16, minWidth: 400, padding: "20px" }}>
      <div
        style={{
          padding: "12px",
          backgroundColor: "#f0f0f0",
          borderRadius: "4px",
          fontFamily: "monospace",
          fontSize: "12px",
        }}
      >
        {debug}
      </div>

      <Input
        label="Currency Test"
        placeholder="0.00"
        mask={{ id: "currency" }}
        onValueChange={handleValueChange}
        onChange={handleChange}
      />

      <div style={{ fontFamily: "monospace", fontSize: "14px" }}>
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
          padding: "12px",
          backgroundColor: "#e6f3ff",
          borderRadius: "4px",
          fontSize: "12px",
        }}
      >
        <strong>Debug Info:</strong>
        <br />
        • Type in the input above to see what happens
        <br />
        • Check console for detailed mask results
        <br />
        • Raw value should be in cents (e.g., &quot;1234&quot; = $12.34)
        <br />• <strong>NEW:</strong> Try clicking at beginning vs end - should
        work correctly now!
      </div>

      <div
        style={{
          padding: "12px",
          backgroundColor: "#fff3cd",
          borderRadius: "4px",
          fontSize: "12px",
          border: "1px solid #ffeaa7",
        }}
      >
        <strong>Test Cases:</strong>
        <br />
        • Click at start, type &quot;3&quot; → Should show &quot;3.00&quot; (not
        &quot;30.00&quot;)
        <br />
        • Click at end, type &quot;3&quot; → Should show &quot;3.00&quot; (not
        &quot;0.03&quot;)
        <br />
        • Type &quot;123&quot; → Should show &quot;1.23&quot;
        <br />• Clear and type &quot;5&quot; → Should show &quot;5.00&quot;
      </div>
    </div>
  );
};
