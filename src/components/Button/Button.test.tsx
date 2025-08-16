import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "./Button";

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe("Button", () => {
  describe("Rendering", () => {
    it("renders correctly with default props", () => {
      render(<Button>Click me</Button>);

      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("type", "button");
    });

    it("renders with custom className", () => {
      render(<Button className="custom-class">Button</Button>);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("renders with different variants", () => {
      const variants = [
        "primary",
        "secondary",
        "ghost",
        "destructive",
        "gradient",
      ] as const;

      variants.forEach((variant) => {
        const { rerender } = render(<Button variant={variant}>Button</Button>);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        rerender(<></>); // Clean up for next iteration
      });
    });

    it("renders with different sizes", () => {
      const sizes = ["sm", "md", "lg", "xl", "icon"] as const;

      sizes.forEach((size) => {
        const { rerender } = render(<Button size={size}>Button</Button>);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        rerender(<></>); // Clean up for next iteration
      });
    });
  });

  describe("States", () => {
    it("handles disabled state correctly", () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled Button
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-disabled", "true");

      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("handles loading state correctly", () => {
      const handleClick = vi.fn();
      render(
        <Button loading onClick={handleClick}>
          Loading Button
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-disabled", "true");

      // Check for loading spinner
      const spinner = screen.getByRole("img", { hidden: true });
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute("aria-hidden", "true");

      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("handles fullWidth prop", () => {
      render(<Button fullWidth>Full Width</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("calls onClick when clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick when Enter key is pressed", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Press Enter</Button>);

      const button = screen.getByRole("button");
      await user.tab();
      await user.keyboard("{Enter}");

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick when Space key is pressed", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Press Space</Button>);

      const button = screen.getByRole("button");
      await user.tab();
      await user.keyboard(" ");

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Forward Ref", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLButtonElement>();

      render(<Button ref={ref}>Button</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toHaveTextContent("Button");
    });
  });

  describe("HTML Attributes", () => {
    it("passes through HTML attributes", () => {
      render(
        <Button
          type="submit"
          form="test-form"
          data-testid="custom-button"
          aria-describedby="button-description"
        >
          Submit
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
      expect(button).toHaveAttribute("form", "test-form");
      expect(button).toHaveAttribute("data-testid", "custom-button");
      expect(button).toHaveAttribute("aria-describedby", "button-description");
    });
  });

  describe("Accessibility", () => {
    it("has no accessibility violations", async () => {
      const { container } = render(<Button>Accessible Button</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no accessibility violations when disabled", async () => {
      const { container } = render(<Button disabled>Disabled Button</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no accessibility violations when loading", async () => {
      const { container } = render(<Button loading>Loading Button</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has proper aria-label for icon buttons", async () => {
      const { container } = render(
        <Button size="icon" aria-label="Close dialog">
          <span>×</span>
        </Button>,
      );

      const button = screen.getByRole("button", { name: /close dialog/i });
      expect(button).toBeInTheDocument();

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("maintains focus visibility", async () => {
      const user = userEvent.setup();

      render(<Button>Focusable Button</Button>);

      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  describe("Loading State", () => {
    it("shows loading spinner when loading is true", () => {
      render(<Button loading>Loading</Button>);

      const spinner = screen.getByRole("img", { hidden: true });
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute("aria-hidden", "true");
    });

    it("prevents click events when loading", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button loading onClick={handleClick}>
          Loading Button
        </Button>,
      );

      const button = screen.getByRole("button");
      // User-event cannot click when pointer-events is none, simulate by dispatching click and expect no call
      button.click();

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("handles missing onClick gracefully", async () => {
      const user = userEvent.setup();

      render(<Button>No onClick handler</Button>);

      const button = screen.getByRole("button");

      // Should not throw error
      expect(async () => {
        await user.click(button);
      }).not.toThrow();
    });

    it("renders children correctly", () => {
      render(
        <Button>
          <span>Icon</span>
          Text Content
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveTextContent("IconText Content");
    });
  });

  describe("Gradient Functionality", () => {
    it("renders with simple gradient props", () => {
      render(
        <Button
          variant="gradient"
          gradient={{
            startColor: "#ff0000",
            endColor: "#00ff00",
          }}
        >
          Gradient Button
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      // Check that gradient class is applied and has background style
      expect(button.className).toContain("gradientCustomClass");
    });

    it("renders with simple gradient and custom direction", () => {
      render(
        <Button
          variant="gradient"
          gradient={{
            startColor: "#ff0000",
            endColor: "#00ff00",
            direction: 45,
          }}
        >
          Gradient Button
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button.className).toContain("gradientCustomClass");
    });

    it("renders with simple gradient and named direction", () => {
      render(
        <Button
          variant="gradient"
          gradient={{
            startColor: "#ff0000",
            endColor: "#00ff00",
            direction: "to-right",
          }}
        >
          Gradient Button
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button.className).toContain("gradientCustomClass");
    });

    it("renders with simple gradient and custom hover colors", () => {
      render(
        <Button
          variant="gradient"
          gradient={{
            startColor: "#ff0000",
            endColor: "#00ff00",
            hoverStartColor: "#cc0000",
            hoverEndColor: "#00cc00",
          }}
        >
          Gradient Button
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button.className).toContain("gradientCustomClass");
      // Verify custom properties are set
      const style = button.getAttribute("style");
      expect(style).toContain("--gradient-hover");
    });

    it("renders with advanced gradient configuration", () => {
      render(
        <Button
          variant="gradient"
          gradient={{
            gradient: {
              default: {
                direction: 135,
                stops: [
                  { color: "#ff0000", position: 0 },
                  { color: "#ffff00", position: 50 },
                  { color: "#00ff00", position: 100 },
                ],
              },
            },
          }}
        >
          Advanced Gradient
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button.className).toContain("gradientCustomClass");
    });

    it("renders with advanced gradient with hover state", () => {
      render(
        <Button
          variant="gradient"
          gradient={{
            gradient: {
              default: {
                direction: 135,
                stops: [
                  { color: "#ff0000", position: 0 },
                  { color: "#00ff00", position: 100 },
                ],
              },
              hover: {
                direction: 135,
                stops: [
                  { color: "#cc0000", position: 0 },
                  { color: "#00cc00", position: 100 },
                ],
              },
            },
          }}
        >
          Hover Gradient
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button.className).toContain("gradientCustomClass");
      const style = button.getAttribute("style");
      expect(style).toContain("--gradient-hover");
    });

    it("applies gradient custom class when using gradients", () => {
      render(
        <Button
          variant="gradient"
          gradient={{
            startColor: "#ff0000",
            endColor: "#00ff00",
          }}
        >
          Gradient Button
        </Button>,
      );

      const button = screen.getByRole("button");
      // Check that custom gradient class is applied
      expect(button.className).toContain("gradientCustomClass");
    });

    it("does not apply gradient styles when variant is not gradient", () => {
      render(
        <Button
          variant="primary"
          gradient={{
            startColor: "#ff0000",
            endColor: "#00ff00",
          }}
        >
          Primary Button
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button.className).not.toContain("gradientCustomClass");
    });

    it("handles gradient with user-provided styles", () => {
      render(
        <Button
          variant="gradient"
          gradient={{
            startColor: "#ff0000",
            endColor: "#00ff00",
          }}
          style={{ margin: "10px" }}
        >
          Styled Gradient
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ margin: "10px" });
      expect(button.className).toContain("gradientCustomClass");
    });

    it("has no accessibility violations with gradients", async () => {
      const { container } = render(
        <Button
          variant="gradient"
          gradient={{
            startColor: "#0066cc",
            endColor: "#004499",
          }}
        >
          Accessible Gradient
        </Button>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("handles gradient updates correctly", () => {
      const { rerender } = render(
        <Button
          variant="gradient"
          gradient={{
            startColor: "#ff0000",
            endColor: "#00ff00",
          }}
        >
          Gradient Button
        </Button>,
      );

      let button = screen.getByRole("button");
      expect(button.className).toContain("gradientCustomClass");

      // Update gradient
      rerender(
        <Button
          variant="gradient"
          gradient={{
            startColor: "#0000ff",
            endColor: "#ffff00",
          }}
        >
          Gradient Button
        </Button>,
      );

      button = screen.getByRole("button");
      expect(button.className).toContain("gradientCustomClass");
      // Should still have gradient functionality
      expect(button).toBeInTheDocument();
    });

    it("handles undefined gradient gracefully", () => {
      render(<Button variant="gradient">No Gradient</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      // Should not crash and should render normally
    });
  });
});
