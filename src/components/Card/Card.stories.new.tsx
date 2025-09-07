import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible card component with multiple variants and interactive states. Perfect for displaying content in an organized, visually appealing manner.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outlined", "filled", "gradient"],
      description: "Visual style variant of the card",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Size of the card padding",
    },
    elevation: {
      control: "select",
      options: ["flat", "low", "medium", "high"],
      description: "Shadow elevation level",
    },
    interactive: {
      control: "boolean",
      description: "Whether the card is interactive with hover effects",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Card Example
export const Default: Story = {
  args: {
    variant: "default",
    size: "md",
    elevation: "low",
  },
  render: (args) => (
    <Card {...args} style={{ width: "320px" }}>
      <CardHeader>
        <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "bold" }}>
          Card Title
        </h3>
        <p style={{ margin: "0.5rem 0 0", color: "#6b7280", fontSize: "0.875rem" }}>
          This is a description of the card content. It provides context about
          what the card contains.
        </p>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0, lineHeight: "1.5" }}>
          This is the main content of the card. You can put any content here
          including text, images, or other components.
        </p>
      </CardBody>
      <CardFooter>
        <small style={{ color: "#9ca3af" }}>
          Created: 2 hours ago • Updated: 1 hour ago
        </small>
      </CardFooter>
    </Card>
  ),
};

// Variants
export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1rem",
        width: "100%",
      }}
    >
      <Card variant="default" style={{ width: "280px" }}>
        <CardHeader>
          <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: "600" }}>
            Default Card
          </h3>
          <p style={{ margin: "0.25rem 0 0", color: "#6b7280", fontSize: "0.875rem" }}>
            Basic card with subtle shadow
          </p>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0 }}>
            Standard card design with clean borders and subtle elevation.
          </p>
        </CardBody>
      </Card>

      <Card variant="outlined" style={{ width: "280px" }}>
        <CardHeader>
          <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: "600" }}>
            Outlined Card
          </h3>
          <p style={{ margin: "0.25rem 0 0", color: "#6b7280", fontSize: "0.875rem" }}>
            Card with prominent border
          </p>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0 }}>
            Clear boundaries with a more defined border style.
          </p>
        </CardBody>
      </Card>

      <Card variant="filled" style={{ width: "280px" }}>
        <CardHeader>
          <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: "600" }}>
            Filled Card
          </h3>
          <p style={{ margin: "0.25rem 0 0", color: "#6b7280", fontSize: "0.875rem" }}>
            Card with background fill
          </p>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0 }}>
            Subtle background color for visual distinction.
          </p>
        </CardBody>
      </Card>

      <Card variant="gradient" style={{ width: "280px" }}>
        <CardHeader>
          <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: "600" }}>
            Gradient Card
          </h3>
          <p style={{ margin: "0.25rem 0 0", color: "#6b7280", fontSize: "0.875rem" }}>
            Card with gradient background
          </p>
        </CardHeader>
        <CardBody>
          <p style={{ margin: 0 }}>
            Subtle gradient background for visual interest.
          </p>
        </CardBody>
      </Card>
    </div>
  ),
};

// Interactive Card
export const Interactive: Story = {
  args: {
    variant: "default",
    interactive: true,
  },
  render: (args) => (
    <Card
      {...args}
      style={{ width: "320px" }}
      onClick={() => console.log("Card clicked!")}
    >
      <CardHeader>
        <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "bold" }}>
          Interactive Card
        </h3>
        <p style={{ margin: "0.5rem 0 0", color: "#6b7280", fontSize: "0.875rem" }}>
          Click me to see the interaction!
        </p>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0, lineHeight: "1.5" }}>
          This card responds to clicks and has hover effects. Try hovering over
          it to see the elevation change.
        </p>
      </CardBody>
    </Card>
  ),
};

// Different Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <Card size="sm" style={{ width: "200px" }}>
        <CardBody>
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Small</h4>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            Compact card with minimal padding
          </p>
        </CardBody>
      </Card>

      <Card size="md" style={{ width: "240px" }}>
        <CardBody>
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Medium</h4>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            Standard card with comfortable padding
          </p>
        </CardBody>
      </Card>

      <Card size="lg" style={{ width: "280px" }}>
        <CardBody>
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Large</h4>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            Spacious card with generous padding
          </p>
        </CardBody>
      </Card>

      <Card size="xl" style={{ width: "320px" }}>
        <CardBody>
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Extra Large</h4>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>
            Very spacious card with extra generous padding
          </p>
        </CardBody>
      </Card>
    </div>
  ),
};

// Elevation Levels
export const Elevations: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <Card elevation="flat" style={{ width: "200px" }}>
        <CardBody>
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Flat</h4>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>No shadow</p>
        </CardBody>
      </Card>

      <Card elevation="low" style={{ width: "200px" }}>
        <CardBody>
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Low</h4>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>Subtle shadow</p>
        </CardBody>
      </Card>

      <Card elevation="medium" style={{ width: "200px" }}>
        <CardBody>
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Medium</h4>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>Moderate shadow</p>
        </CardBody>
      </Card>

      <Card elevation="high" style={{ width: "200px" }}>
        <CardBody>
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>High</h4>
          <p style={{ margin: 0, fontSize: "0.875rem" }}>Strong shadow</p>
        </CardBody>
      </Card>
    </div>
  ),
};

// Full Example
export const FullExample: Story = {
  render: () => (
    <Card variant="default" elevation="medium" style={{ width: "360px" }}>
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            📊
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: "bold" }}>
              Q4 Analytics Report
            </h3>
            <p style={{ margin: "0.25rem 0 0", color: "#6b7280", fontSize: "0.875rem" }}>
              Performance Dashboard
            </p>
          </div>
          <button
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              background: "white",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Edit
          </button>
        </div>
      </CardHeader>

      <CardBody>
        <div style={{ marginBottom: "1rem" }}>
          <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.875rem", fontWeight: "600" }}>
            Key Highlights
          </h4>
          <ul style={{ margin: 0, paddingLeft: "1rem", fontSize: "0.875rem", lineHeight: "1.5" }}>
            <li>Revenue increased by 23%</li>
            <li>User engagement up 15%</li>
            <li>New customer acquisition: 1,247</li>
          </ul>
        </div>

        <div
          style={{
            padding: "1rem",
            background: "#f9fafb",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
          }}
        >
          <strong>Overall Score:</strong> 8.5/10
        </div>
      </CardBody>

      <CardFooter>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <small style={{ color: "#9ca3af" }}>
            Generated: Dec 15, 2023 • Next update: Jan 15, 2024
          </small>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid #3b82f6",
                borderRadius: "0.5rem",
                background: "#3b82f6",
                color: "white",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Download
            </button>
            <button
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                background: "white",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Share
            </button>
          </div>
        </div>
      </CardFooter>
    </Card>
  ),
};
