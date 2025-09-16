import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;
export type Story = StoryObj<typeof Select>;

const OPTIONS = [
  { value: "", label: "Select…", disabled: true },
  { value: "mx", label: "Mexico" },
  { value: "us", label: "United States" },
  { value: "es", label: "Spain" },
];

export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <Select
        {...args}
        label="Country"
        options={OPTIONS}
        placeholder="Select…"
      />
    </div>
  ),
};
