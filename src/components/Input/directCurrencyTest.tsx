import React from "react";
import { currencyHandler } from "../../masking/handlers/currency";
import { logger } from "../../utils/logger";

export const DirectCurrencyTest: React.FC = () => {
  const [inputValue, setInputValue] = React.useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [maskResult, setMaskResult] = React.useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Aplicar la máscara directamente
    const result = currencyHandler.apply(newValue, null);
    setMaskResult(result);

    logger.debug("Direct handler test:", {
      input: newValue,
      result: result,
    });
  };

  return (
    <div style={{ display: "grid", gap: 16, minWidth: 400, padding: "20px" }}>
      <h3>Direct Currency Handler Test</h3>

      <div>
        <label htmlFor="direct-input">Input Value:</label>
        <input
          id="direct-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type here..."
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      <div
        style={{
          fontFamily: "monospace",
          fontSize: "14px",
          padding: "12px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
        }}
      >
        <div>
          <strong>Input Value:</strong> {inputValue || "(empty)"}
        </div>
        <div>
          <strong>Mask Result:</strong>
        </div>
        {maskResult && (
          <div style={{ marginLeft: "16px" }}>
            <div>• Raw: {maskResult.raw}</div>
            <div>• Formatted: {maskResult.formatted}</div>
            <div>• Value in Cents: {maskResult.meta?.valueInCents}</div>
            <div>
              • Value in Dollars: ${maskResult.meta?.valueInDollars?.toFixed(2)}
            </div>
            <div>• Is Empty: {maskResult.meta?.isEmpty ? "Yes" : "No"}</div>
          </div>
        )}
      </div>

      <div
        style={{
          padding: "12px",
          backgroundColor: "#e6f3ff",
          borderRadius: "4px",
          fontSize: "12px",
        }}
      >
        <strong>Test Instructions:</strong>
        <br />
        • Type &quot;1&quot; → Should format to &quot;1.00&quot;
        <br />
        • Type &quot;123&quot; → Should format to &quot;123.00&quot;
        <br />
        • Type &quot;123.45&quot; → Should format to &quot;123.45&quot;
        <br />• Check console for detailed results
      </div>
    </div>
  );
};
