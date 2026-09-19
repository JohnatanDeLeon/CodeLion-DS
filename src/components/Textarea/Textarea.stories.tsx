import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Multi-line text field with the same anatomy and styles as Input: label, field, and a helper or error message linked with aria-describedby.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    state: { control: "select", options: ["default", "error"] },
    required: { control: "boolean" },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Descripción",
    name: "description",
    placeholder: "Qué es, para quién, en qué se diferencia",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: { helperText: "Hasta 500 caracteres." },
};

export const Error: Story = {
  args: {
    state: "error",
    errorMessage: "La descripción admite hasta 500 caracteres",
    defaultValue: "Un texto que se pasó del límite…",
  },
};

export const Required: Story = {
  args: { required: true },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: "1.5rem", width: "24rem" }}>
      <Textarea {...args} size="sm" label="Small" />
      <Textarea {...args} size="md" label="Medium" />
      <Textarea {...args} size="lg" label="Large" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "No editable" },
};
