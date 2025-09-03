import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent } from "../../utils/storybook-testing";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["search"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    state: {
      control: { type: "select" },
      options: ["default", "error", "success", "warning"],
    },
    fullWidth: { control: "boolean" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    type: {
      control: { type: "select" },
      options: ["text", "password", "number", "tel", "url"],
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    successMessage: { control: "text" },
    warningMessage: { control: "text" },
    className: { control: "text" },
    onChange: { action: "changed" },
    onFocus: { action: "focused" },
    onBlur: { action: "blurred" },
  },
  args: {
    variant: "search",
    size: "lg",
    state: "default",
    fullWidth: false,
    required: false,
    disabled: false,
    loading: false,
    iconPosition: "right",
    type: "text",
    label: "Label",
    placeholder: "Enter text...",
  },
};

export default meta;
export type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Default Input",
    placeholder: "Enter text...",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.getByLabelText(/default input/i);
    await userEvent.click(input);
    await userEvent.type(input, "Hello World");
  },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Input {...args} variant="search" label="Search Variant" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Input {...args} size="sm" label="Small (sm)" />
      <Input {...args} size="md" label="Medium (md)" />
      <Input {...args} size="lg" label="Large (lg)" />
      <Input {...args} size="xl" label="Extra Large (xl)" />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Input
        {...args}
        state="default"
        label="Default State"
        helperText="This is helper text"
      />
      <Input
        {...args}
        state="error"
        label="Error State"
        errorMessage="This field has an error"
      />
      <Input
        {...args}
        state="success"
        label="Success State"
        successMessage="This field is valid"
      />
      <Input
        {...args}
        state="warning"
        label="Warning State"
        warningMessage="This field has a warning"
      />
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Input
        {...args}
        label="Left Icon"
        iconPosition="left"
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        }
      />
      <Input
        {...args}
        label="Right Icon"
        iconPosition="right"
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          </svg>
        }
      />
    </div>
  ),
};

export const LoadingAndDisabled: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Input {...args} loading label="Loading State" />
      <Input {...args} disabled label="Disabled State" />
      <Input
        {...args}
        loading
        iconPosition="left"
        label="Loading with Left Position"
      />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    label: "Full Width Input",
    placeholder: "This input takes full width",
  },
  render: (args) => (
    <div style={{ width: "100%", maxWidth: 400 }}>
      <Input {...args} />
    </div>
  ),
};

export const Required: Story = {
  args: {
    required: true,
    label: "Required Field",
    placeholder: "This field is required",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.getByLabelText(/required field/i);
    input.focus();
  },
};

export const WithMasks: Story = {
  render: (args) => {
    const [phoneValue, setPhoneValue] = React.useState("");
    const [currencyValue, setCurrencyValue] = React.useState("");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Input
          {...args}
          label="Phone Number"
          placeholder="Enter phone number"
          mask={{ id: "phone" }}
          value={phoneValue}
          onValueChange={({ formatted }) => setPhoneValue(formatted)}
        />
        <Input
          {...args}
          label="Currency Amount"
          placeholder="Enter amount"
          mask={{ id: "currency" }}
          value={currencyValue}
          onValueChange={({ formatted }) => setCurrencyValue(formatted)}
        />
      </div>
    );
  },
};

export const MaskPlayground: Story = {
  render: (args) => {
    const [selectedMask, setSelectedMask] = React.useState<string>("none");
    const [inputValue, setInputValue] = React.useState("");
    const [rawValue, setRawValue] = React.useState("");

    const handleMaskChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedMask(event.target.value);
      setInputValue("");
      setRawValue("");
    };

    const getMaskConfig = () => {
      if (selectedMask === "none") return undefined;
      return { id: selectedMask };
    };

    const handleValueChange = ({
      raw,
      formatted,
    }: {
      raw: string;
      formatted: string;
    }) => {
      setInputValue(formatted);
      setRawValue(raw);
    };

    return (
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div style={{ minWidth: 320 }}>
          <h4>Mask Playground</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label>
              Select Mask Type
              <select
                value={selectedMask}
                onChange={handleMaskChange}
                style={{ width: "100%", marginTop: 6, padding: 8 }}
              >
                <option value="none">No Mask</option>
                <option value="phone">Phone</option>
                <option value="currency">Currency</option>
              </select>
            </label>

            <div>
              <strong>Current Values:</strong>
              <div style={{ marginTop: 8, fontSize: "0.875rem" }}>
                <div>
                  <strong>Formatted:</strong> {inputValue || "(empty)"}
                </div>
                <div>
                  <strong>Raw:</strong> {rawValue || "(empty)"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <Input
            {...args}
            label={`Input with ${selectedMask === "none" ? "No" : selectedMask.charAt(0).toUpperCase() + selectedMask.slice(1)} Mask`}
            placeholder={
              selectedMask === "phone"
                ? "Enter phone number"
                : selectedMask === "currency"
                  ? "Enter amount"
                  : "Enter text"
            }
            mask={getMaskConfig()}
            value={inputValue}
            onValueChange={handleValueChange}
          />
        </div>
      </div>
    );
  },
};

export const ValidationShowcase: Story = {
  render: (args) => {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const getPasswordState = () => {
      if (!password) return "default";
      if (password.length < 8) return "error";
      if (password.length < 12) return "warning";
      return "success";
    };

    const getConfirmPasswordState = () => {
      if (!confirmPassword) return "default";
      return confirmPassword === password ? "success" : "error";
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          maxWidth: 400,
        }}
      >
        <Input
          {...args}
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          state={getPasswordState()}
          errorMessage="Password must be at least 8 characters"
          warningMessage="Consider using a longer password for better security"
          successMessage="Password strength is good"
        />
        
        <Input
          {...args}
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          state={getConfirmPasswordState()}
          errorMessage="Passwords do not match"
          successMessage="Passwords match"
        />
      </div>
    );
  },
};

export const Playground: Story = {};
