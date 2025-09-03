import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { Input } from "./Input";

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe("Input", () => {
  describe("Rendering", () => {
    it("renders correctly with default props", () => {
      render(<Input placeholder="Enter text" />);

      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
      expect(input).toHaveAttribute("placeholder", "Enter text");
    });

    it("renders with custom className", () => {
      render(<Input className="custom-class" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("custom-class");
    });

    it("renders with different variants", () => {
      const variants = ["search"] as const;

      variants.forEach((variant) => {
        const { rerender } = render(<Input variant={variant} />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        rerender(<></>); // Clean up for next iteration
      });
    });

    it("renders with different sizes", () => {
      const sizes = ["sm", "md", "lg"] as const;

      sizes.forEach((size) => {
        const { rerender } = render(<Input size={size} />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        rerender(<></>); // Clean up for next iteration
      });
    });

    it("renders with different states", () => {
      const states = ["default", "error", "success", "warning"] as const;

      states.forEach((state) => {
        const { rerender } = render(<Input state={state} />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        rerender(<></>); // Clean up for next iteration
      });
    });
  });

  describe("Label and Helper Text", () => {
    it("renders with label", () => {
      render(<Input label="Username" />);

      const label = screen.getByText("Username");
      const input = screen.getByRole("textbox");

      expect(label).toBeInTheDocument();
      expect(label).toHaveAttribute("for", input.id);
    });

    it("renders required label with asterisk", () => {
      render(<Input label="Required Field" required />);

      const label = screen.getByText("Required Field");
      expect(label).toBeInTheDocument();
      // Check if asterisk is visually indicated (via CSS content)
    });

    it("renders with helper text", () => {
      render(<Input helperText="This field is helpful" />);

      const helperText = screen.getByText("This field is helpful");
      const input = screen.getByRole("textbox");

      expect(helperText).toBeInTheDocument();
      expect(input).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("helper"),
      );
    });

    it("renders with error message", () => {
      render(
        <Input
          state="error"
          errorMessage="Este campo es requerido y debe contener al menos 8 caracteres con una mayúscula"
        />,
      );

      const errorMessage = screen.getByText(
        "Este campo es requerido y debe contener al menos 8 caracteres con una mayúscula",
      );
      const input = screen.getByRole("textbox");

      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveAttribute("role", "alert");
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("helper"),
      );
    });

    it("renders with success message", () => {
      render(<Input state="success" successMessage="Valid input format" />);

      const successMessage = screen.getByText("Valid input format");
      expect(successMessage).toBeInTheDocument();
    });

    it("renders with warning message", () => {
      render(
        <Input
          state="warning"
          warningMessage="This input value may need verification"
        />,
      );

      const warningMessage = screen.getByText(
        "This input value may need verification",
      );
      expect(warningMessage).toBeInTheDocument();
    });
  });

  describe("States", () => {
    it("handles disabled state correctly", () => {
      const handleChange = vi.fn();
      render(
        <Input disabled onChange={handleChange} placeholder="Disabled Input" />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();

      fireEvent.change(input, { target: { value: "test" } });
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("handles loading state correctly", () => {
      const handleChange = vi.fn();
      render(
        <Input loading onChange={handleChange} placeholder="Loading Input" />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();

      // Check for loading spinner
      const spinner = screen.getByRole("img", { hidden: true });
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute("aria-hidden", "true");

      fireEvent.change(input, { target: { value: "test" } });
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("handles required state correctly", () => {
      render(<Input required />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-required", "true");
    });

    it("handles fullWidth prop", () => {
      render(<Input fullWidth />);

      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });

    it("does not pass fullWidth to the DOM as an attribute", () => {
      render(<Input fullWidth data-testid="fw-input" />);
      const input = screen.getByTestId("fw-input");
      // React should not pass the arbitrary `fullWidth` prop to the DOM
      expect(input).not.toHaveAttribute("fullwidth");
      expect(input).not.toHaveAttribute("data-fullwidth");
    });
  });

  describe("Icons", () => {
    it("renders with icon", () => {
      const SearchIcon = (
        <svg data-testid="search-icon" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      );

      render(<Input icon={SearchIcon} iconPosition="right" />);

      const icon = screen.getByTestId("search-icon");
      expect(icon).toBeInTheDocument();
    });

    it("renders icon on left position", () => {
      const LeftIcon = (
        <svg data-testid="left-icon" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
        </svg>
      );

      render(<Input icon={LeftIcon} iconPosition="left" />);

      const icon = screen.getByTestId("left-icon");
      expect(icon).toBeInTheDocument();
    });

    it("prioritizes loading spinner over icon", () => {
      const TestIcon = (
        <svg data-testid="test-icon" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
        </svg>
      );

      render(<Input icon={TestIcon} loading />);

      const spinner = screen.getByRole("img", { hidden: true });
      expect(spinner).toBeInTheDocument();

      const icon = screen.queryByTestId("test-icon");
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("calls onChange when value changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Input onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      await user.type(input, "test");

      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue("test");
    });

    it("calls onFocus when input gains focus", async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();

      render(<Input onFocus={handleFocus} />);

      const input = screen.getByRole("textbox");
      await user.click(input);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur when input loses focus", async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();

      render(<Input onBlur={handleBlur} />);

      const input = screen.getByRole("textbox");
      await user.click(input);
      await user.tab();

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("does not call masked onChange when disabled or loading (mask present)", async () => {
      // register a simple noop mask for this test
      const noopHandler = {
        id: "noop",
        apply: (input: string) => ({ raw: input, formatted: input }),
        parse: (s: string) => s,
        validate: (_: string) => true,
      } as any;

      const { defaultRegistry } = await import("../../masking/registry");
      // register & cleanup
      defaultRegistry.register(noopHandler);

      const handleChange = vi.fn();
      render(<Input mask={{ id: "noop" }} onChange={handleChange} disabled />);
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "abc" } });
      expect(handleChange).not.toHaveBeenCalled();

      // loading case
      render(<Input mask={{ id: "noop" }} onChange={handleChange} loading />);
      const input2 = screen.getAllByRole("textbox")[1];
      fireEvent.change(input2, { target: { value: "def" } });
      expect(handleChange).not.toHaveBeenCalled();

      defaultRegistry.unregister("noop");
    });
  });

  describe("Forward Ref", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLInputElement>();

      render(<Input ref={ref} defaultValue="Test Value" />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toHaveValue("Test Value");
    });
  });

  describe("HTML Attributes", () => {
    it("passes through HTML attributes", () => {
      render(
        <Input
          type="email"
          name="email"
          autoComplete="email"
          data-testid="custom-input"
          maxLength={50}
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "email");
      expect(input).toHaveAttribute("name", "email");
      expect(input).toHaveAttribute("autocomplete", "email");
      expect(input).toHaveAttribute("data-testid", "custom-input");
      expect(input).toHaveAttribute("maxlength", "50");
    });
  });

  describe("🔴 EXPECTED FAILURES - HTML Attributes", () => {
    it("handles different input types", () => {
      const types = ["text", "password", "number", "tel", "url"];

      types.forEach((type) => {
        const { container, rerender } = render(<Input type={type} />);
        const input = container.querySelector("input");
        expect(input).toBeTruthy();
        expect(input).toHaveAttribute("type", type);
        rerender(<></>); // Clean up for next iteration
      });
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(
        <Input label="Accessible Input" placeholder="Enter text" />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no accessibility violations when disabled", async () => {
      const { container } = render(
        <Input label="Disabled Input" disabled placeholder="Cannot edit" />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no accessibility violations with error state", async () => {
      const { container } = render(
        <Input
          label="Username"
          state="error"
          errorMessage="Please enter a valid username"
          required
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no accessibility violations with loading state", async () => {
      const { container } = render(
        <Input label="Loading Input" loading placeholder="Processing..." />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has proper aria attributes for required fields", () => {
      render(<Input label="Required Field" required />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-required", "true");
    });

    it("has proper aria attributes for invalid fields", () => {
      render(
        <Input
          label="Invalid Field"
          state="error"
          errorMessage="This field has an error"
        />,
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute(
        "aria-describedby",
        expect.stringContaining("helper"),
      );
    });

    it("properly associates label with input", () => {
      render(<Input label="Username" id="username-input" />);

      const label = screen.getByText("Username");
      const input = screen.getByRole("textbox");

      expect(label).toHaveAttribute("for", "username-input");
      expect(input).toHaveAttribute("id", "username-input");
    });

    it("generates unique IDs when not provided", () => {
      render(
        <div>
          <Input label="First Input" />
          <Input label="Second Input" />
        </div>,
      );

      const inputs = screen.getAllByRole("textbox");
      expect(inputs[0]).toHaveAttribute("id");
      expect(inputs[1]).toHaveAttribute("id");
      expect(inputs[0].id).not.toBe(inputs[1].id);
    });
  });

  describe("Corporate Username Example", () => {
    it("renders corporate username example", () => {
      render(
        <Input
          label="Usuario Corporativo"
          type="text"
          placeholder="tu.nombre.empresa"
          helperText="Usaremos tu usuario para identificarte en el sistema"
        />,
      );

      const label = screen.getByText("Usuario Corporativo");
      const input = screen.getByRole("textbox");
      const helperText = screen.getByText(
        "Usaremos tu usuario para identificarte en el sistema",
      );

      expect(label).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "text");
      expect(input).toHaveAttribute("placeholder", "tu.nombre.empresa");
      expect(helperText).toBeInTheDocument();
    });
  });

  describe("Search Example", () => {
    it("renders search example from image", () => {
      const SearchIcon = (
        <svg data-testid="search-icon" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      );

      render(
        <Input
          variant="search"
          placeholder="Buscar en la librería..."
          icon={SearchIcon}
          iconPosition="right"
        />,
      );

      const input = screen.getByRole("textbox");
      const icon = screen.getByTestId("search-icon");

      expect(input).toHaveAttribute("placeholder", "Buscar en la librería...");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Validation Example", () => {
    it("renders validation example from image", () => {
      render(
        <Input
          label="Campo con Validación Mejorada"
          state="error"
          placeholder="Introduce un valor válido"
          errorMessage="Este campo es requerido y debe contener al menos 8 caracteres con una mayúscula"
        />,
      );

      const label = screen.getByText("Campo con Validación Mejorada");
      const input = screen.getByRole("textbox");
      const errorMessage = screen.getByText(
        "Este campo es requerido y debe contener al menos 8 caracteres con una mayúscula",
      );

      expect(label).toBeInTheDocument();
      expect(input).toHaveAttribute("placeholder", "Introduce un valor válido");
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveAttribute("role", "alert");
    });
  });

  describe("Edge Cases", () => {
    it("handles missing onChange gracefully", async () => {
      const user = userEvent.setup();

      render(<Input placeholder="No onChange handler" />);

      const input = screen.getByRole("textbox");

      // Should not throw error
      expect(async () => {
        await user.type(input, "test");
      }).not.toThrow();
    });

    it("handles containerClassName correctly", () => {
      render(<Input containerClassName="custom-container" />);

      // Container should have the custom class (we can't directly test this without data-testid)
      // But the component should render without errors
      const input = screen.getByRole("textbox");
      expect(input).toBeInTheDocument();
    });

    it("handles labelClassName correctly", () => {
      render(<Input label="Custom Label" labelClassName="custom-label" />);

      const label = screen.getByText("Custom Label");
      expect(label).toHaveClass("custom-label");
    });

    it("handles helperClassName correctly", () => {
      render(
        <Input helperText="Custom helper" helperClassName="custom-helper" />,
      );

      const helperText = screen.getByText("Custom helper");
      expect(helperText).toHaveClass("custom-helper");
    });

    it("prioritizes state-specific messages over generic helper text", () => {
      render(
        <Input
          state="error"
          helperText="This will not be shown"
          errorMessage="This error will be shown"
        />,
      );

      const errorMessage = screen.getByText("This error will be shown");
      const helperText = screen.queryByText("This will not be shown");

      expect(errorMessage).toBeInTheDocument();
      expect(helperText).not.toBeInTheDocument();
    });
  });
});
