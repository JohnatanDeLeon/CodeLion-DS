import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { useGradientPresets } from "../../hooks/useGradient";

const meta = {
  title: "Components/Basic/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Button component is a versatile, accessible button with multiple variants and states.

## Features
- Multiple visual variants (primary, secondary, ghost, destructive, gradient)
- Various sizes (sm, md, lg, xl, icon)
- Loading states with spinner
- Full width support
- Keyboard navigation support
- WCAG 2.1 AA compliant
- TypeScript support with comprehensive prop types

## Usage
Import the Button component and use it with the desired props:

\`\`\`tsx
import { Button } from '@johnatandeleon/design-system';

function MyComponent() {
  return (
    <Button variant="primary" size="md" onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  );
}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "destructive", "gradient"],
      description: "Visual style variant of the button",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "icon"],
      description: "Size of the button",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the button should take full width",
    },
    loading: {
      control: "boolean",
      description: "Shows loading spinner and disables interaction",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
    children: {
      control: "text",
      description: "Button content",
    },
    gradient: {
      control: "object",
      description:
        "Gradient configuration object (only applies when variant='gradient')",
      if: { arg: "variant", eq: "gradient" },
      table: {
        type: {
          summary: "GradientProps",
          detail: `Simple: { startColor: string, endColor: string }
Advanced: { gradient: { default: GradientConfig, hover?: GradientConfig } }`,
        },
      },
    },
    onClick: {
      action: "clicked",
      description: "Click event handler",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: "Button",
  },
};

// Variant stories
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete Item",
  },
};

export const Gradient: Story = {
  args: {
    variant: "gradient",
    children: "Gradient Button",
    size: "xl",
  },
};

// Size stories
export const Sizes: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different button sizes available in the design system.",
      },
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  args: {
    children: "Button",
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "flex-start",
      }}
    >
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="gradient">Gradient</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available button variants side by side.",
      },
    },
  },
};

// State stories
export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading...",
  },
  parameters: {
    docs: {
      description: {
        story: "Button in loading state with spinner animation.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled button state.",
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Full Width Button",
  },
  parameters: {
    docs: {
      description: {
        story: "Button that takes the full width of its container.",
      },
    },
  },
};

// Icon button
export const IconButton: Story = {
  args: {
    size: "icon",
    variant: "ghost",
    children: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    "aria-label": "Close",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Icon-only button. Remember to provide aria-label for accessibility.",
      },
    },
  },
};

// Custom Gradient Examples using new API
export const CustomGradientBasic: Story = {
  args: {
    variant: "gradient",
    gradient: {
      startColor: "#ff6b6b",
      endColor: "#ee5a52",
    },
    children: "Custom Gradient",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic custom gradient with auto-generated hover states using the new gradient API.",
      },
    },
  },
};

export const CustomGradientWithHover: Story = {
  args: {
    variant: "gradient",
    gradient: {
      startColor: "#667eea",
      endColor: "#764ba2",
      hoverStartColor: "#5a67d8",
      hoverEndColor: "#553c9a",
    },
    children: "Precise Control",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Custom gradient with manually specified hover colors for precise control.",
      },
    },
  },
};

// Showcase using gradient presets
export const CustomGradientShowcase: Story = {
  args: { children: "Button" },
  render: () => {
    const { presets } = useGradientPresets();

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          maxWidth: "600px",
        }}
      >
        <Button variant="gradient" gradient={presets.sunset}>
          Sunset
        </Button>
        <Button variant="gradient" gradient={presets.ocean}>
          Ocean
        </Button>
        <Button variant="gradient" gradient={presets.forest}>
          Forest
        </Button>
        <Button variant="gradient" gradient={presets.fire}>
          Fire
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Showcase of different gradient presets using the new gradient system.",
      },
    },
  },
};

// Interactive example
export const Interactive: Story = {
  args: {
    children: "+",
  },
  render: () => {
    const [count, setCount] = React.useState(0);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <div>Count: {count}</div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button variant="secondary" onClick={() => setCount(count - 1)}>
            -
          </Button>
          <Button variant="primary" onClick={() => setCount(count + 1)}>
            +
          </Button>
        </div>
        <Button variant="ghost" onClick={() => setCount(0)}>
          Reset
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive example showing button click handlers.",
      },
    },
  },
};

// Interactive gradient color picker with new API
export const InteractiveGradientPicker: Story = {
  args: { children: "Button" },
  render: () => {
    const [startColor, setStartColor] = React.useState("#ff6b6b");
    const [endColor, setEndColor] = React.useState("#ee5a52");
    const [direction, setDirection] = React.useState<number>(135);

    const gradientConfig = React.useMemo(
      () => ({
        startColor,
        endColor,
        direction,
      }),
      [startColor, endColor, direction],
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          padding: "2rem",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          backgroundColor: "#fafafa",
        }}
      >
        <h4 style={{ margin: 0, color: "#334155" }}>
          🎨 Advanced Gradient Builder
        </h4>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <label
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            Start Color:
            <input
              type="color"
              value={startColor}
              onChange={(e) => setStartColor(e.target.value)}
            />
          </label>
          <label
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            End Color:
            <input
              type="color"
              value={endColor}
              onChange={(e) => setEndColor(e.target.value)}
            />
          </label>
          <label
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            Direction:
            <input
              type="range"
              min="0"
              max="360"
              value={direction}
              onChange={(e) => setDirection(Number(e.target.value))}
            />
            <span style={{ minWidth: "40px", fontSize: "0.8rem" }}>
              {direction}°
            </span>
          </label>
        </div>
        <Button variant="gradient" gradient={gradientConfig} size="lg">
          Live Preview
        </Button>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "0.8rem",
            color: "#64748b",
            textAlign: "center",
            background: "#f8fafc",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #e2e8f0",
            maxWidth: "400px",
          }}
        >
          <strong>New API:</strong>
          <br />
          gradient=&#123;&#123;
          <br />
          &nbsp;&nbsp;startColor: &quot;{startColor}&quot;,
          <br />
          &nbsp;&nbsp;endColor: &quot;{endColor}&quot;,
          <br />
          &nbsp;&nbsp;direction: {direction}
          <br />
          &#125;&#125;
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example showing the new gradient API with real-time customization including direction control.",
      },
    },
  },
};

// Advanced gradient configuration showcase
export const AdvancedGradientConfiguration: Story = {
  args: { children: "Button" },
  render: () => {
    // Example of advanced gradient with full state control
    const advancedGradient = {
      gradient: {
        default: {
          direction: 135,
          stops: [
            { color: "#667eea", position: 0 },
            { color: "#764ba2", position: 100 },
          ],
          fallback: "#667eea",
        },
        hover: {
          direction: 135,
          stops: [
            { color: "#5a67d8", position: 0 },
            { color: "#553c9a", position: 100 },
          ],
        },
        active: {
          direction: 135,
          stops: [
            { color: "#4c51bf", position: 0 },
            { color: "#44337a", position: 100 },
          ],
        },
      },
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <div>
          <h4 style={{ margin: "0 0 1rem 0", color: "#334155" }}>
            ⚡ Advanced Gradient Configuration
          </h4>
          <Button variant="gradient" gradient={advancedGradient} size="lg">
            Hover & Click me!
          </Button>
        </div>

        <div
          style={{
            fontFamily: "monospace",
            fontSize: "0.75rem",
            color: "#475569",
            background: "#f8fafc",
            padding: "1rem",
            borderRadius: "6px",
            border: "1px solid #e2e8f0",
            maxWidth: "500px",
            lineHeight: 1.5,
          }}
        >
          <strong>Full Configuration Example:</strong>
          <br />
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
            {`gradient={{
  gradient: {
    default: {
      direction: 135,
      stops: [
        { color: "#667eea", position: 0 },
        { color: "#764ba2", position: 100 }
      ]
    },
    hover: {
      direction: 135,
      stops: [
        { color: "#5a67d8", position: 0 },
        { color: "#553c9a", position: 100 }
      ]
    },
    active: { /* custom active state */ }
  }
}}`}
          </pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Advanced gradient configuration showing full control over all interaction states with multi-stop gradients.",
      },
    },
  },
};

// Gradient presets gallery
export const GradientPresetsGallery: Story = {
  args: { children: "Button" },
  render: () => {
    const { presets } = useGradientPresets();

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        <h4 style={{ margin: 0, color: "#334155", textAlign: "center" }}>
          🎨 Built-in Gradient Presets
        </h4>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "1rem",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {Object.entries(presets).map(([name, preset]) => (
            <div key={name} style={{ textAlign: "center" }}>
              <Button
                variant="gradient"
                gradient={preset}
                size="sm"
                style={{ marginBottom: "0.5rem" }}
              >
                {name}
              </Button>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            fontSize: "0.8rem",
            color: "#64748b",
            textAlign: "center",
            background: "#f8fafc",
            padding: "1rem",
            borderRadius: "4px",
            border: "1px solid #e2e8f0",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <strong>Usage:</strong> Import presets with{" "}
          <code>useGradientPresets()</code> hook
          <br />
          <code>const &#123; presets &#125; = useGradientPresets();</code>
          <br />
          <code>&lt;Button gradient=&#123;presets.sunset&#125; /&gt;</code>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Gallery of all built-in gradient presets available in the design system.",
      },
    },
  },
};
