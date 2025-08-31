import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent } from "../../utils/storybook-testing";
import { Button } from "./Button";
import { gradients } from "../../styles/tokens/colors.css";
import { useGradientPresets } from "../../hooks/useGradient";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "ghost", "destructive", "gradient"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "icon"],
    },
    fullWidth: { control: "boolean" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    className: { control: "text" },
    gradient: { control: "object" },
    children: { control: "text" },
    onClick: { action: "clicked" },
  },
  args: {
    variant: "primary",
    size: "md",
    fullWidth: false,
    loading: false,
    disabled: false,
    children: "Button",
  },
};

export default meta;
export type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", children: "Primary" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.getByRole("button", { name: /primary/i });
    await userEvent.click(btn);
  },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="gradient">
        Gradient
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button {...args} size="sm">
        SM
      </Button>
      <Button {...args} size="md">
        MD
      </Button>
      <Button {...args} size="lg">
        LG
      </Button>
      <Button {...args} size="xl">
        XL
      </Button>
      <Button {...args} size="icon" aria-label="icon-button">
        <span aria-hidden>×</span>
      </Button>
    </div>
  ),
};

export const LoadingAndDisabled: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button {...args} loading>
        Loading
      </Button>
      <Button {...args} disabled>
        Disabled
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true, children: "Full width" },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Button {...args} />
    </div>
  ),
};

export const IconOnly: Story = {
  args: {
    size: "icon",
    children: <span aria-hidden>×</span>,
    "aria-label": "Close",
  } as any,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.getByRole("button", { name: /close/i });
    btn.focus();
  },
};

export const GradientCustom: Story = {
  args: {
    variant: "gradient",
    gradient: { startColor: "#ff6b6b", endColor: "#ee5a52", direction: 45 },
    children: "Custom Gradient",
  },
};

export const GradientShowcase: Story = {
  render: (args) => {
    const { presets } = useGradientPresets();
    return (
      <div style={{ display: "flex", gap: 16, flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 12 }}>
          {/* Default variant gradient */}
          <Button {...args} variant="gradient">
            Default Gradient
          </Button>

          {/* Tokenized gradient via inline style using tokens.gradients.primary */}
          <Button
            {...args}
            variant="gradient"
            style={{ background: gradients.primary }}
          >
            Token Gradient
          </Button>

          {/* Preset from useGradientPresets (passed as gradient prop) */}
          <Button {...args} variant="gradient" gradient={presets.primary}>
            Preset Gradient
          </Button>
        </div>
        <div>
          <small>
            Notes: default variant uses button recipe; presets come from{" "}
            <code>useGradientPresets()</code>.
          </small>
        </div>
      </div>
    );
  },
};

// Advanced interactive playground for gradients
function GradientPlaygroundPanel({ args }: { args: any }) {
  const { presets } = useGradientPresets();
  const presetKeys = Object.keys(presets) as Array<keyof typeof presets>;

  const [mode, setMode] = React.useState<"preset" | "custom">("preset");
  const [selectedPreset, setSelectedPreset] = React.useState<string>("primary");
  const [startColor, setStartColor] = React.useState("#ff6b6b");
  const [endColor, setEndColor] = React.useState("#ee5a52");
  const [direction, setDirection] = React.useState<number>(135);
  const [hoverStart, setHoverStart] = React.useState<string | undefined>(
    undefined,
  );
  const [hoverEnd, setHoverEnd] = React.useState<string | undefined>(undefined);

  const gradientProp = React.useMemo(() => {
    if (mode === "preset")
      return presets[selectedPreset as keyof typeof presets];
    const obj: any = { startColor, endColor, direction };
    if (hoverStart) obj.hoverStartColor = hoverStart;
    if (hoverEnd) obj.hoverEndColor = hoverEnd;
    return obj;
  }, [
    mode,
    selectedPreset,
    presets,
    startColor,
    endColor,
    direction,
    hoverStart,
    hoverEnd,
  ]);

  return (
    <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
      <div style={{ minWidth: 320 }}>
        <h4>Gradient Playground</h4>
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input
              type="radio"
              name="mode"
              checked={mode === "preset"}
              onChange={() => setMode("preset")}
            />
            Preset
          </label>
          <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <input
              type="radio"
              name="mode"
              checked={mode === "custom"}
              onChange={() => setMode("custom")}
            />
            Custom
          </label>
        </div>

        {mode === "preset" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label>
              Preset
              <select
                value={selectedPreset}
                onChange={(e) => setSelectedPreset(e.target.value)}
                style={{ width: "100%", marginTop: 6 }}
              >
                {presetKeys.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label>
              Start color
              <input
                aria-label="start-color"
                type="color"
                value={startColor}
                onChange={(e) => setStartColor(e.target.value)}
                style={{ width: "100%", height: 36, marginTop: 6 }}
              />
            </label>

            <label>
              End color
              <input
                aria-label="end-color"
                type="color"
                value={endColor}
                onChange={(e) => setEndColor(e.target.value)}
                style={{ width: "100%", height: 36, marginTop: 6 }}
              />
            </label>

            <label>
              Direction (deg)
              <input
                aria-label="direction"
                type="number"
                value={direction}
                onChange={(e) => setDirection(Number(e.target.value))}
                style={{ width: "100%", marginTop: 6 }}
              />
            </label>

            <label>
              Hover start color (optional)
              <input
                aria-label="hover-start"
                type="color"
                value={hoverStart || "#000000"}
                onChange={(e) => setHoverStart(e.target.value)}
                style={{ width: "100%", height: 36, marginTop: 6 }}
              />
            </label>

            <label>
              Hover end color (optional)
              <input
                aria-label="hover-end"
                type="color"
                value={hoverEnd || "#000000"}
                onChange={(e) => setHoverEnd(e.target.value)}
                style={{ width: "100%", height: 36, marginTop: 6 }}
              />
            </label>
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <strong>Preview props</strong>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: 6 }}>
            {JSON.stringify(gradientProp, null, 2)}
          </pre>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          alignItems: "flex-start",
        }}
      >
        <div>
          <Button {...args} variant="gradient" gradient={gradientProp}>
            Live Gradient
          </Button>
        </div>

        <div>
          <small>
            Tip: use the Preset mode to test common palettes, or Custom to craft
            colors and direction.
          </small>
        </div>
      </div>
    </div>
  );
}

export const AdvancedGradientPlayground: Story = {
  render: (args) => <GradientPlaygroundPanel args={args} />,
};

export const Playground: Story = {};
