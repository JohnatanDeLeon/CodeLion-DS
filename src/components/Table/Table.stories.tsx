import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./Table";

const products = [
  { name: "Widget", sku: "WGT-001", price: "9.99" },
  { name: "Gadget", sku: "GDG-014", price: "19.50" },
  { name: "Sprocket", sku: "SPR-210", price: "124.00" },
  { name: "Flange", sku: "FLG-007", price: "3.25" },
];

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Data table with a caption as its accessible name, column headers with scope, numeric alignment and its own horizontal scroll.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    striped: { control: "boolean" },
  },
  args: { caption: "Productos", size: "md", striped: false },
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Nombre</TableHeaderCell>
          <TableHeaderCell>SKU</TableHeaderCell>
          <TableHeaderCell align="end">Precio</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.sku}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.sku}</TableCell>
            <TableCell align="end">{product.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Striped: Story = {
  args: { striped: true },
};

export const Compact: Story = {
  args: { size: "sm" },
};
