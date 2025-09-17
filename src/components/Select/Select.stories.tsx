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
    scroll: false,
  },
  argTypes: {
    scroll: {
      control: { type: "boolean" },
      description:
        "Activa el scroll del listado cuando hay muchas opciones (controlado por prop).",
    },
    maxListHeight: {
      control: { type: "text" },
      description:
        "Altura máxima del listado cuando scroll es true. Acepta número (px) o string con unidades (ej. '20rem').",
      table: {
        type: { summary: "string | number" },
      },
    },
    focusRingColor: {
      control: { type: "color" },
      description: "Color del anillo de enfoque (focus ring)",
    },
    optionHoverBgColor: {
      control: { type: "color" },
      description: "Color de fondo del hover de opciones",
    },
    optionHoverTextColor: {
      control: { type: "color" },
      description: "Color del texto en hover de opciones",
    },
    optionTextColor: {
      control: { type: "color" },
      description: "Color del texto de las opciones",
    },
    checkIconColor: {
      control: { type: "color" },
      description: "Color del ícono de selección (check)",
    },
    selectedOptionBgColor: {
      control: { type: "color" },
      description: "Color de fondo para la opción seleccionada",
    },
    selectedOptionTextColor: {
      control: { type: "color" },
      description: "Color del texto para la opción seleccionada",
    },
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

export const WithScroll: Story = {
  name: "Long list with scroll",
  args: {
    label: "Fruits",
    scroll: true,
  },
  render: (args) => (
    <Select {...args}>
      {Array.from({ length: 40 }).map((_, i) => (
        <option key={i} value={`v${i}`}>
          Item {i + 1}
        </option>
      ))}
    </Select>
  ),
};

export const CustomMaxHeight: Story = {
  name: "Scroll with custom height",
  args: {
    label: "Cities",
    scroll: true,
    maxListHeight: 200,
  },
  render: (args) => (
    <Select {...args}>
      {Array.from({ length: 50 }).map((_, i) => (
        <option key={i} value={`city-${i}`}>
          City {i + 1}
        </option>
      ))}
    </Select>
  ),
};

export const ThemingDemo: Story = {
  name: "Theming demo",
  args: {
    label: "Themed Select",
    scroll: true,
    maxListHeight: 240,
    focusRingColor: "#7c3aed", // violet-600
    optionHoverBgColor: "#f5f3ff", // violet-50
    optionHoverTextColor: "#6d28d9", // violet-700
    optionTextColor: "#111827", // gray-900
    checkIconColor: "#10b981", // emerald-500
    selectedOptionBgColor: "#ede9fe", // violet-100
    selectedOptionTextColor: "#4c1d95", // violet-900
  },
  render: (args) => (
    <Select {...args}>
      {Array.from({ length: 12 }).map((_, i) => (
        <option key={i} value={`opt-${i}`}>
          Option {i + 1}
        </option>
      ))}
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demostración de cómo personalizar colores del Select usando props: focusRingColor, optionHoverBgColor, optionHoverTextColor, optionTextColor y checkIconColor.",
      },
    },
  },
};
