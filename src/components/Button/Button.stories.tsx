import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

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
