import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    label: "Label",
    uiSize: "lg",
    state: "default",
    fullWidth: false,
  },
};
export default meta;
export type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <Select {...args} label="Country">
      <option value="">Select…</option>
      <option value="mx">Mexico</option>
      <option value="us">United States</option>
      <option value="es">Spain</option>
    </Select>
  ),
};
