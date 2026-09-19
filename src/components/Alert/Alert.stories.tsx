import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          'Page-level message. Errors and warnings use role="alert" and interrupt the reader; information and confirmations use role="status".',
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
  },
  args: {
    variant: "info",
    children: "Los cambios se guardan al enviar el formulario.",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = {
  args: { variant: "success", children: "Producto creado." },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Borrado permanente",
    children: "Eliminar un producto borra la fila; no se puede deshacer.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "No se pudo guardar",
    children: "El proveedor respondió 500. Probá de nuevo en un momento.",
  },
};

export const AllTones: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: "36rem" }}>
      <Alert variant="info">Información</Alert>
      <Alert variant="success">Confirmación</Alert>
      <Alert variant="warning">Advertencia</Alert>
      <Alert variant="error">Error</Alert>
    </div>
  ),
};
