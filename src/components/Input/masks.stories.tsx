import type { Meta, StoryObj } from "@storybook/react-vite";
import { PhoneMaskDemo, CurrencyMaskDemo } from "./masksExamples";
import { CurrencyTest } from "./currencyTest";
import { DirectCurrencyTest } from "./directCurrencyTest";
import { Input } from "./Input";
import React from "react";

const meta: Meta = {
  title: "Components/Forms/Input/Masks",
  parameters: {
    docs: {
      description: {
        component: `
# Input: Masks 🎭

Input masking enables formatting and raw-value extraction while keeping accessibility and predictable behavior.

This page documents the \`mask\` prop and the provided demo mask handlers shipped with the design system.

## Quick summary

- \`mask?: { id: string; options?: unknown }\` — opt-in mask configuration passed to the Input component.
- \`onValueChange?: ({ raw, formatted, meta? }) => void\` — callback invoked when the mask is applied; receives both \`raw\` and \`formatted\` values.

When the library is imported the included handlers are automatically registered into the default mask registry. The design system ships the following default handlers:

- \`serial\` — sample serial-number formatter (AAA-0000)
- \`phone\` — US-centric phone formatter \`(123) 456-7890\`
- \`currency\` — simple cents-based currency formatter (two decimal places)

> Note: Handlers are pluggable — you can register custom handlers using the \`defaultRegistry.register(handler)\` API or pass your own \`registry\` into \`useInputMask\` if you need isolated registries.

## API

### \`mask\` prop

- Type: \`{ id: string; options?: unknown } | undefined\`
- Description: If provided, Input will apply the mask identified by \`id\`. Handlers are responsible for formatting, parsing and (optionally) validating and reporting caret positions.

### \`onValueChange\` callback

- Signature: \`(v: { raw: string; formatted: string; meta?: Record<string, unknown> }) => void\`
- Description: Called whenever the mask is applied — useful for storing raw values for submission while showing a formatted string to users.

### Handler contract

Handlers follow this minimal contract (TypeScript types available in \`src/masking/types.ts\`):

- \`id: string\`
- \`apply(input: string, caret?: number | null, options?: any) => { raw: string; formatted: string; caret?: number | null; meta?: Record<string, unknown> }\`
- \`parse?(formatted: string, options?: any) => string\`
- \`validate?(raw: string, options?: any) => boolean\`

Handler authors should:

- Keep the \`apply\` function idempotent for the same input.
- Return \`caret\` when possible to help preserve cursor position during edits.
- Provide \`parse\` to map formatted strings back to raw values.

## Advanced

If you need localized or complex masks (IBANs, international phones, currency with locales), implement a handler that encapsulates the logic and register it via \`defaultRegistry.register(yourHandler)\`.

Happy masking! 🎯
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Phone Mask Demo
export const Phone: Story = {
  name: "📱 Phone Mask",
  render: () => <PhoneMaskDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Phone mask example that formats input as (123) 456-7890. Automatically formats phone numbers as you type.",
      },
    },
  },
};

// Currency Mask Demo
export const Currency: Story = {
  name: "💰 Currency Mask",
  render: () => <CurrencyMaskDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Currency mask example that formats input with two decimal places. Stores raw value in cents for accurate calculations.",
      },
    },
  },
};

// Currency Debug Test
export const CurrencyDebug: Story = {
  name: "🔍 Currency Debug Test",
  render: () => <CurrencyTest />,
  parameters: {
    docs: {
      description: {
        story:
          "Debug version of currency mask to troubleshoot formatting issues. Check console for detailed mask results.",
      },
    },
  },
};

// Serial Number Mask Demo
export const SerialNumber: Story = {
  name: "🔢 Serial Number Mask",
  render: () => {
    const [value, setValue] = React.useState("");
    const [raw, setRaw] = React.useState("");

    return (
      <div style={{ display: "grid", gap: 12, minWidth: 360 }}>
        <Input
          label="Serial Number"
          placeholder="AAA-0000"
          mask={{ id: "serial" }}
          onValueChange={(v) => {
            setValue(v.formatted);
            setRaw(v.raw);
          }}
        />
        <div style={{ fontFamily: "monospace", fontSize: "0.875rem" }}>
          <div>Formatted: {value || "AAA-0000"}</div>
          <div>Raw: {raw || "AAA0000"}</div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Serial number mask that formats input as AAA-0000 pattern. Useful for product codes, license keys, etc.",
      },
    },
  },
};

// Interactive Mask Comparison
export const MaskComparison: Story = {
  name: "🔄 Mask Comparison",
  render: () => {
    const [phoneValue, setPhoneValue] = React.useState("");
    const [currencyValue, setCurrencyValue] = React.useState("");
    const [serialValue, setSerialValue] = React.useState("");

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

    const CurrencyIcon = (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    );

    const SerialIcon = (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9 12l2 2 4-4M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2zM3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41 1.41" />
      </svg>
    );

    return (
      <div style={{ display: "grid", gap: "2rem", minWidth: 500 }}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h3
            style={{
              margin: "0 0 0.5rem 0",
              color: "#1e293b",
              fontSize: "1.25rem",
            }}
          >
            🎭 Compare All Available Masks
          </h3>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.875rem" }}>
            See how different masks format input in real-time
          </p>
        </div>

        <div style={{ display: "grid", gap: "1.5rem" }}>
          {/* Phone Mask */}
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
          >
            <Input
              label="Phone Number"
              placeholder="(555) 555-5555"
              icon={PhoneIcon}
              iconPosition="left"
              mask={{ id: "phone" }}
              onValueChange={(v) => setPhoneValue(v.formatted)}
            />
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "0.75rem",
                marginTop: "0.5rem",
                color: "#64748b",
              }}
            >
              Formatted: {phoneValue || "(555) 555-5555"}
            </div>
          </div>

          {/* Currency Mask */}
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
          >
            <Input
              label="Amount"
              placeholder="0.00"
              icon={CurrencyIcon}
              iconPosition="left"
              mask={{ id: "currency" }}
              onValueChange={(v) => setCurrencyValue(v.formatted)}
            />
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "0.75rem",
                marginTop: "0.5rem",
                color: "#64748b",
              }}
            >
              Formatted: {currencyValue || "0.00"}
            </div>
          </div>

          {/* Serial Mask */}
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#f8fafc",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
            }}
          >
            <Input
              label="Serial Number"
              placeholder="AAA-0000"
              icon={SerialIcon}
              iconPosition="left"
              mask={{ id: "serial" }}
              onValueChange={(v) => setSerialValue(v.formatted)}
            />
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "0.75rem",
                marginTop: "0.5rem",
                color: "#64748b",
              }}
            >
              Formatted: {serialValue || "AAA-0000"}
            </div>
          </div>
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
            💡 How It Works
          </h4>
          <ul
            style={{
              margin: "0.5rem 0",
              paddingLeft: "1.5rem",
              color: "#1e40af",
            }}
          >
            <li>Type in any input to see real-time formatting</li>
            <li>Each mask preserves the raw value for form submission</li>
            <li>Masks automatically handle cursor positioning</li>
            <li>All masks are accessible and keyboard-friendly</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive comparison of all available masks. See how each mask formats input in real-time and compare their behavior.",
      },
    },
  },
};

// Custom Mask Implementation Example
export const CustomMaskExample: Story = {
  name: "⚙️ Custom Mask Implementation",
  render: () => {
    return (
      <div style={{ display: "grid", gap: "1rem", minWidth: 500 }}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h3
            style={{
              margin: "0 0 0.5rem 0",
              color: "#1e293b",
              fontSize: "1.25rem",
            }}
          >
            🛠️ Create Your Own Masks
          </h3>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.875rem" }}>
            Learn how to implement custom mask handlers
          </p>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#fef3c7",
            borderRadius: "8px",
            border: "1px solid #f59e0b",
            fontFamily: "monospace",
            fontSize: "0.875rem",
          }}
        >
          <h4 style={{ margin: "0 0 1rem 0", color: "#92400e" }}>
            📝 Example: Custom Date Mask
          </h4>
          <pre
            style={{
              margin: 0,
              padding: "1rem",
              backgroundColor: "#fef3c7",
              borderRadius: "4px",
              overflow: "auto",
              fontSize: "0.75rem",
            }}
          >
            {`// Custom date mask handler
const dateMask = {
  id: 'date',
  apply: (input: string) => {
    const cleaned = input.replace(/\\D/g, '');
    const match = cleaned.match(/^(\\d{0,2})(\\d{0,2})(\\d{0,4})$/);
    
    if (!match) return { raw: cleaned, formatted: cleaned };
    
    const [, day, month, year] = match;
    let formatted = '';
    
    if (day) formatted += day;
    if (month) formatted += \`/\${month}\`;
    if (year) formatted += \`/\${year}\`;
    
    return { raw: cleaned, formatted };
  }
};

// Register the custom mask
defaultRegistry.register(dateMask);

// Use in Input component
<Input mask={{ id: 'date' }} />`}
          </pre>
        </div>

        <div
          style={{
            padding: "1rem",
            backgroundColor: "#ecfdf5",
            borderRadius: "8px",
            border: "1px solid #10b981",
            fontSize: "0.875rem",
          }}
        >
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#047857" }}>
            🎯 Key Benefits
          </h4>
          <ul
            style={{
              margin: "0.5rem 0",
              paddingLeft: "1.5rem",
              color: "#047857",
            }}
          >
            <li>
              <strong>Separation of Concerns:</strong> Mask logic is isolated
              from UI components
            </li>
            <li>
              <strong>Reusability:</strong> Use the same mask across multiple
              inputs
            </li>
            <li>
              <strong>Testability:</strong> Test mask logic independently
            </li>
            <li>
              <strong>Flexibility:</strong> Easy to add new masks or modify
              existing ones
            </li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Learn how to create custom mask handlers and integrate them with the Input component. Includes code examples and best practices.",
      },
    },
  },
};

// Accessibility and Best Practices
export const AccessibilityAndBestPractices: Story = {
  name: "♿ Accessibility & Best Practices",
  render: () => {
    return (
      <div style={{ display: "grid", gap: "1.5rem", minWidth: 500 }}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h3
            style={{
              margin: "0 0 0.5rem 0",
              color: "#1e293b",
              fontSize: "1.25rem",
            }}
          >
            ♿ Accessibility Guidelines
          </h3>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.875rem" }}>
            Ensure your masked inputs are accessible to all users
          </p>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#fef2f2",
            borderRadius: "8px",
            border: "1px solid #f87171",
            color: "#991b1b",
          }}
        >
          <h4 style={{ margin: "0 0 1rem 0" }}>❌ Common Mistakes to Avoid</h4>
          <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
            <li>Don&apos;t change input value without user interaction</li>
            <li>Avoid removing characters the user just typed</li>
            <li>Don&apos;t break keyboard navigation (Tab, Arrow keys)</li>
            <li>Avoid making the input behave unexpectedly</li>
          </ul>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#ecfdf5",
            borderRadius: "8px",
            border: "1px solid #10b981",
            color: "#047857",
          }}
        >
          <h4 style={{ margin: "0 0 1rem 0" }}>✅ Best Practices</h4>
          <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
            <li>Always provide clear placeholder text</li>
            <li>Use descriptive labels that explain the expected format</li>
            <li>Provide helper text with format examples</li>
            <li>
              Ensure screen readers can access both raw and formatted values
            </li>
            <li>Test with keyboard-only navigation</li>
          </ul>
        </div>

        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#eff6ff",
            borderRadius: "8px",
            border: "1px solid #bfdbfe",
            color: "#1e40af",
          }}
        >
          <h4 style={{ margin: "0 0 1rem 0" }}>🔍 Testing Checklist</h4>
          <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
            <li>Test with screen readers (NVDA, JAWS, VoiceOver)</li>
            <li>Verify keyboard navigation works correctly</li>
            <li>Check that placeholder text is announced</li>
            <li>Ensure error messages are accessible</li>
            <li>
              Test with different input methods (typing, pasting, deleting)
            </li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Comprehensive guide to making masked inputs accessible. Learn about common pitfalls, best practices, and testing strategies.",
      },
    },
  },
};

// Direct Currency Handler Test
export const DirectCurrency: Story = {
  name: "🔧 Direct Currency Handler Test",
  render: () => <DirectCurrencyTest />,
  parameters: {
    docs: {
      description: {
        story:
          "Direct test of the currency handler without the Input component wrapper. Use this to verify the mask logic is working correctly.",
      },
    },
  },
};
