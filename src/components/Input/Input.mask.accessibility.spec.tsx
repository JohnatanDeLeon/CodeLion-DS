/**
 * Input Mask Accessibility Tests
 * 
 * Comprehensive tests for accessibility features across all mask types.
 * Tests ARIA attributes, screen reader compatibility, keyboard navigation,
 * visual states, and WCAG 2.1 AA compliance.
 * These tests are EXPECTED TO FAIL and document the broken behaviors.
 * 
 * @priority 5 (high - accessibility is critical)
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { vi } from "vitest";
import { Input } from "./Input";

expect.extend(toHaveNoViolations);

describe("Input Masks - Comprehensive Accessibility", () => {
  const phoneFormat = { type: "phone" as const };
  const cardFormat = { type: "credit-card" as const };
  const currencyFormat = { type: "currency" as const };
  const customFormat = {
    pattern: {
      pattern: "##-##-##",
      allowedChars: /[0-9]/,
      placeholder: "12-34-56",
      description: "Six digit code format",
      maxLength: 6,
    }
  };

  describe("🔴 EXPECTED FAILURES - ARIA Attributes", () => {
    it("should have proper aria-describedby for all mask types", async () => {
      const maskTypes = [
        { format: phoneFormat, label: "Phone", testId: "phone-input" },
        { format: cardFormat, label: "Card", testId: "card-input" },
        { format: currencyFormat, label: "Amount", testId: "currency-input" },
        { format: customFormat, label: "Code", testId: "custom-input" }
      ];

      for (const maskType of maskTypes) {
        render(
          <Input 
            format={maskType.format}
            label={maskType.label}
            helperText={`Enter your ${maskType.label.toLowerCase()}`}
            data-testid={maskType.testId}
          />
        );
        
        const input = screen.getByTestId(maskType.testId);
        
        // EXPECTED TO FAIL: aria-describedby likely missing or incorrect
        expect(input).toHaveAttribute("aria-describedby");
        
        const describedBy = input.getAttribute("aria-describedby");
        if (describedBy) {
          const helpElement = document.getElementById(describedBy);
          expect(helpElement).toBeInTheDocument();
          expect(helpElement).toHaveTextContent(/enter your|format/i);
        }
      }
    });

    it("should have proper aria-invalid states for validation", async () => {
      const user = userEvent.setup();
      
      const validationCases = [
        { 
          format: phoneFormat, 
          input: "555123", // Incomplete phone 
          testId: "phone-test",
          shouldBeInvalid: true 
        },
        { 
          format: phoneFormat, 
          input: "5551234567", // Complete phone
          testId: "phone-test-2", 
          shouldBeInvalid: false 
        },
        { 
          format: cardFormat, 
          input: "4532015112830365", // Invalid Luhn
          testId: "card-test", 
          shouldBeInvalid: true 
        },
        { 
          format: cardFormat, 
          input: "4532015112830366", // Valid Luhn
          testId: "card-test-2", 
          shouldBeInvalid: false 
        },
      ];

      for (const testCase of validationCases) {
        render(<Input format={testCase.format} data-testid={testCase.testId} />);
        const input = screen.getByTestId(testCase.testId);
        
        await user.clear(input);
        await user.type(input, testCase.input);
        
        // EXPECTED TO FAIL: aria-invalid likely not set correctly
        expect(input).toHaveAttribute(
          "aria-invalid", 
          testCase.shouldBeInvalid ? "true" : "false"
        );
      }
    });

    it("should have appropriate inputmode for different mask types", async () => {
      const inputModeTests = [
        { format: phoneFormat, expectedMode: "tel", testId: "phone-inputmode" },
        { format: cardFormat, expectedMode: "numeric", testId: "card-inputmode" },
        { format: currencyFormat, expectedMode: "decimal", testId: "currency-inputmode" },
        { format: customFormat, expectedMode: "text", testId: "custom-inputmode" }
      ];

      for (const test of inputModeTests) {
        render(<Input format={test.format} data-testid={test.testId} />);
        const input = screen.getByTestId(test.testId);
        
        // EXPECTED TO FAIL: inputmode likely missing or incorrect
        expect(input).toHaveAttribute("inputmode", test.expectedMode);
      }
    });

    it("should have proper autocomplete attributes", async () => {
      const autocompleteTests = [
        { format: phoneFormat, expected: "tel", testId: "phone-autocomplete" },
        { format: cardFormat, expected: "cc-number", testId: "card-autocomplete" },
        { format: currencyFormat, expected: "transaction-amount", testId: "currency-autocomplete" }
      ];

      for (const test of autocompleteTests) {
        render(<Input format={test.format} data-testid={test.testId} />);
        const input = screen.getByTestId(test.testId);
        
        // EXPECTED TO FAIL: autocomplete attributes likely missing
        expect(input).toHaveAttribute("autocomplete", test.expected);
      }
    });

    it("should have proper aria-label or label association", async () => {
      const { rerender } = render(
        <Input format={phoneFormat} aria-label="Phone number input" data-testid="aria-label-test" />
      );
      let input = screen.getByTestId("aria-label-test");
      
      // EXPECTED TO FAIL: aria-label might not be preserved with formatting
      expect(input).toHaveAttribute("aria-label", "Phone number input");
      
      // Test with label element
      rerender(
        <Input format={phoneFormat} label="Phone Number" id="phone-with-label" data-testid="label-test" />
      );
      input = screen.getByTestId("label-test");
      
      // Should have proper label association
      const label = screen.getByText("Phone Number");
      expect(label).toHaveAttribute("for", "phone-with-label");
      expect(input).toHaveAttribute("id", "phone-with-label");
    });
  });

  describe("🔴 EXPECTED FAILURES - Screen Reader Announcements", () => {
    it("should announce format descriptions for screen readers", async () => {
      const formatDescriptions = [
        { format: phoneFormat, expectedDescription: /phone.*format/i, testId: "phone-desc" },
        { format: cardFormat, expectedDescription: /credit card.*digit/i, testId: "card-desc" },
        { format: currencyFormat, expectedDescription: /currency.*amount/i, testId: "currency-desc" },
        { format: customFormat, expectedDescription: /six digit code/i, testId: "custom-desc" }
      ];

      for (const test of formatDescriptions) {
        render(<Input format={test.format} data-testid={test.testId} />);
        const input = screen.getByTestId(test.testId);
        
        const describedBy = input.getAttribute("aria-describedby");
        if (describedBy) {
          const descElement = document.getElementById(describedBy);
          
          // EXPECTED TO FAIL: Format descriptions likely not generated
          expect(descElement).toBeInTheDocument();
          if (descElement) {
            expect(descElement.textContent).toMatch(test.expectedDescription);
          }
        } else {
          // EXPECTED TO FAIL: No aria-describedby at all
          expect(describedBy).toBeTruthy();
        }
      }
    });

    it("should announce completion status to screen readers", async () => {
      const user = userEvent.setup();
      
      // Mock live region creation for announcements
      const mockAnnounce = vi.fn();
      const originalCreateElement = document.createElement.bind(document);
      
      document.createElement = vi.fn((tagName) => {
        const element = originalCreateElement(tagName);
        if (tagName === 'div' && element.setAttribute) {
          const originalSetAttribute = element.setAttribute.bind(element);
          element.setAttribute = vi.fn((name, value) => {
            if (name === 'aria-live') {
              mockAnnounce(value);
            }
            return originalSetAttribute(name, value);
          });
        }
        return element;
      });

      render(<Input format={phoneFormat} data-testid="announce-test" />);
      const input = screen.getByTestId("announce-test");
      
      await user.type(input, "5551234567");
      
      // EXPECTED TO FAIL: Completion announcements likely not implemented
      await waitFor(() => {
        expect(mockAnnounce).toHaveBeenCalled();
      });
      
      // Restore original createElement
      document.createElement = originalCreateElement;
    });

    it("should announce validation errors clearly", async () => {
      const user = userEvent.setup();
      
      render(
        <Input 
          format={phoneFormat}
          label="Phone Number"
          data-testid="validation-announce"
        />
      );
      const input = screen.getByTestId("validation-announce");
      
      // Type invalid phone
      await user.type(input, "555123");
      
      // Check if error message has proper role
      const errorElement = document.querySelector('[role="alert"]');
      
      // EXPECTED TO FAIL: Validation error announcements likely missing
      expect(errorElement).toBeInTheDocument();
      if (errorElement) {
        expect(errorElement.textContent).toMatch(/invalid|incomplete|error/i);
      }
    });

    it("should provide progress indication for incomplete formats", async () => {
      const user = userEvent.setup();
      
      const progressTests = [
        { format: phoneFormat, input: "555", expectedHint: /7.*remaining|3.*10/i },
        { format: cardFormat, input: "4532", expectedHint: /12.*remaining|4.*16/i },
        { format: customFormat, input: "12", expectedHint: /4.*remaining|2.*6/i }
      ];

      for (const test of progressTests) {
        render(<Input format={test.format} data-testid={`progress-${Math.random()}`} />);
        const input = screen.getByTestId(/progress-/);
        
        await user.type(input, test.input);
        
        const describedBy = input.getAttribute("aria-describedby");
        if (describedBy) {
          const descElement = document.getElementById(describedBy);
          
          // EXPECTED TO FAIL: Progress indication likely not implemented
          expect(descElement?.textContent).toMatch(test.expectedHint);
        }
      }
    });
  });

  describe("🔴 EXPECTED FAILURES - Keyboard Navigation", () => {
    it("should support proper keyboard navigation across format characters", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="keyboard-nav" />);
      const input = screen.getByTestId("keyboard-nav");
      
      await user.type(input, "5551234567");
      expect(input).toHaveValue("(555) 123-4567");
      
      // Test Home key
      await user.keyboard("[Home]");
      expect(input.selectionStart).toBe(0);
      
      // Test End key  
      await user.keyboard("[End]");
      expect(input.selectionStart).toBe(14); // End of formatted string
      
      // Test Ctrl+A (select all)
      await user.keyboard("[Control>a]");
      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(14);
    });

    it("should handle arrow key navigation intelligently", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="arrow-nav" />);
      const input = screen.getByTestId("arrow-nav");
      
      await user.type(input, "4532015112830366");
      expect(input).toHaveValue("4532 0151 1283 0366");
      
      // Position at start and navigate right
      input.setSelectionRange(0, 0);
      
      // Test arrow right navigation
      const expectedPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
      
      for (let i = 0; i < 5; i++) {
        await user.keyboard("[ArrowRight]");
        
        // EXPECTED TO FAIL: Arrow navigation likely doesn't skip spaces intelligently
        const currentPos = input.selectionStart;
        expect(currentPos).toBeGreaterThan(i);
        
        // Should skip over spaces - position should not be on a space
        if (currentPos && currentPos < input.value.length) {
          expect(input.value[currentPos - 1]).not.toBe(' ');
        }
      }
    });

    it("should handle selection extension with Shift+Arrow keys", async () => {
      const user = userEvent.setup();
      
      render(<Input format={currencyFormat} data-testid="selection-extend" />);
      const input = screen.getByTestId("selection-extend");
      
      await user.type(input, "123456");
      expect(input).toHaveValue("$1,234.56");
      
      // Position cursor and extend selection
      input.setSelectionRange(1, 1); // After $
      await user.keyboard("[Shift>ArrowRight][ArrowRight][ArrowRight]");
      
      // EXPECTED TO FAIL: Selection extension likely broken with formatting
      expect(input.selectionStart).toBe(1);
      expect(input.selectionEnd).toBeGreaterThan(1);
      
      // Should select actual characters, not format separators
      const selectedText = input.value.substring(input.selectionStart!, input.selectionEnd!);
      expect(selectedText).toMatch(/\d/); // Should contain at least one digit
    });

    it("should support Ctrl+Backspace and Ctrl+Delete for word deletion", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="word-delete" />);
      const input = screen.getByTestId("word-delete");
      
      await user.type(input, "5551234567");
      expect(input).toHaveValue("(555) 123-4567");
      
      // Position in middle and try word delete
      input.setSelectionRange(6, 6); // After first space
      await user.keyboard("[Control>Backspace]");
      
      // EXPECTED TO FAIL: Word-level deletion likely not implemented
      // Should delete the "555" part
      expect(input).toHaveValue("() 123-4567");
    });
  });

  describe("🔴 EXPECTED FAILURES - Visual States & Contrast", () => {
    it("should maintain proper contrast ratios in all visual states", async () => {
      const visualStates = [
        { props: { state: "default" }, testId: "contrast-default" },
        { props: { state: "error" }, testId: "contrast-error" },
        { props: { state: "success" }, testId: "contrast-success" },
        { props: { state: "warning" }, testId: "contrast-warning" },
        { props: { disabled: true }, testId: "contrast-disabled" }
      ];

      for (const visualState of visualStates) {
        const { container } = render(
          <Input 
            format={phoneFormat}
            label="Phone Number"
            helperText="Test contrast"
            data-testid={visualState.testId}
            {...visualState.props}
          />
        );
        
        // EXPECTED TO FAIL: Color contrast might not meet WCAG AA standards
        const results = await axe(container, {
          rules: {
            'color-contrast': { enabled: true },
            'color-contrast-enhanced': { enabled: true }
          }
        });
        
        expect(results.violations.filter(v => v.id.includes('contrast'))).toHaveLength(0);
      }
    });

    it("should have visible focus indicators", async () => {
      const user = userEvent.setup();
      
      render(
        <div>
          <button>Focus trap</button>
          <Input format={phoneFormat} data-testid="focus-indicator" />
        </div>
      );
      
      const input = screen.getByTestId("focus-indicator");
      const button = screen.getByRole("button");
      
      // Focus the input
      await user.click(input);
      
      // EXPECTED TO FAIL: Focus indicator might not be visible enough
      const computedStyle = window.getComputedStyle(input, ':focus-visible');
      
      // Should have some form of focus indication
      const hasFocusStyles = (
        computedStyle.outline !== 'none' ||
        computedStyle.boxShadow !== 'none' ||
        computedStyle.border !== input.style.border
      );
      
      expect(hasFocusStyles).toBe(true);
    });

    it("should maintain readability in high contrast mode", async () => {
      // Simulate high contrast mode
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query.includes('prefers-contrast: more'),
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });

      const { container } = render(
        <Input 
          format={phoneFormat}
          label="High Contrast Test"
          helperText="Should be readable in high contrast mode"
          data-testid="high-contrast"
        />
      );
      
      // EXPECTED TO FAIL: High contrast support likely not implemented
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("🔴 EXPECTED FAILURES - Error Handling & Recovery", () => {
    it("should gracefully handle invalid format configurations", async () => {
      const invalidFormats = [
        { format: { type: "nonexistent" as any }, testId: "invalid-type" },
        { format: { pattern: { pattern: "", allowedChars: /[]/, maxLength: 0 } }, testId: "invalid-pattern" },
        { format: null as any, testId: "null-format" }
      ];

      for (const invalidFormat of invalidFormats) {
        // Should not crash with invalid formats
        expect(() => {
          render(<Input format={invalidFormat.format} data-testid={invalidFormat.testId} />);
        }).not.toThrow();
        
        const input = screen.getByTestId(invalidFormat.testId);
        
        // EXPECTED TO FAIL: Error handling for invalid formats likely not implemented
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("aria-invalid", "false"); // Should default to valid state
      }
    });

    it("should provide helpful error messages for screen readers", async () => {
      const user = userEvent.setup();
      
      render(
        <Input 
          format={phoneFormat}
          label="Phone Number"
          required
          data-testid="error-message"
        />
      );
      const input = screen.getByTestId("error-message");
      
      // Type invalid input and blur
      await user.type(input, "555");
      await user.tab(); // Blur the input
      
      // Check for error message
      const errorMessage = screen.queryByRole("alert");
      
      // EXPECTED TO FAIL: Error messages likely not generated or announced
      expect(errorMessage).toBeInTheDocument();
      
      if (errorMessage) {
        expect(errorMessage.textContent).toMatch(/phone|format|complete/i);
        
        // Should be associated with input
        const describedBy = input.getAttribute("aria-describedby");
        expect(describedBy).toBeTruthy();
        expect(errorMessage.id).toBe(describedBy);
      }
    });

    it("should handle format conflicts gracefully", async () => {
      const user = userEvent.setup();
      
      // Test rapidly changing format types
      const ConflictingFormats = () => {
        const [format, setFormat] = React.useState<any>(phoneFormat);
        
        return (
          <div>
            <Input format={format} data-testid="conflict-test" />
            <button onClick={() => setFormat(cardFormat)}>Change to Card</button>
            <button onClick={() => setFormat(currencyFormat)}>Change to Currency</button>
          </div>
        );
      };
      
      render(<ConflictingFormats />);
      const input = screen.getByTestId("conflict-test");
      const cardButton = screen.getByText("Change to Card");
      const currencyButton = screen.getByText("Change to Currency");
      
      // Type phone number
      await user.type(input, "5551234567");
      expect(input).toHaveValue("(555) 123-4567");
      
      // Change to card format
      await user.click(cardButton);
      
      // EXPECTED TO FAIL: Format changes likely cause issues
      expect(() => {
        // Should not crash when format changes
        user.type(input, "1");
      }).not.toThrow();
      
      // Change to currency format
      await user.click(currencyButton);
      
      // Should still be functional
      expect(input).toBeInTheDocument();
      expect(input).not.toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("🔴 EXPECTED FAILURES - Mobile & Touch Accessibility", () => {
    it("should work properly with mobile keyboards", async () => {
      // Simulate mobile environment
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)'
      });

      const mobileTests = [
        { format: phoneFormat, expectedInputMode: "tel" },
        { format: cardFormat, expectedInputMode: "numeric" },
        { format: currencyFormat, expectedInputMode: "decimal" }
      ];

      for (const test of mobileTests) {
        render(<Input format={test.format} data-testid={`mobile-${Math.random()}`} />);
        const input = screen.getByTestId(/mobile-/);
        
        // EXPECTED TO FAIL: Mobile-specific attributes likely missing
        expect(input).toHaveAttribute("inputmode", test.expectedInputMode);
        
        // Should not have autocapitalize for numeric inputs
        if (test.expectedInputMode !== "text") {
          expect(input).toHaveAttribute("autocapitalize", "off");
        }
      }
    });

    it("should handle touch interactions properly", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="touch-test" />);
      const input = screen.getByTestId("touch-test");
      
      // Simulate touch interaction
      fireEvent.touchStart(input);
      fireEvent.touchEnd(input);
      
      // EXPECTED TO FAIL: Touch focus might not work correctly with formatting
      expect(input).toHaveFocus();
      
      // Type using touch keyboard simulation
      await user.type(input, "5551234567");
      
      // Should format correctly even with touch input
      expect(input).toHaveValue("(555) 123-4567");
    });
  });

  describe("🔴 EXPECTED FAILURES - Comprehensive Axe Audits", () => {
    it("should pass comprehensive accessibility audit - Phone", async () => {
      const { container } = render(
        <form>
          <Input 
            format={phoneFormat}
            label="Phone Number"
            helperText="Enter your 10-digit phone number"
            required
            data-testid="audit-phone"
          />
          <button type="submit">Submit</button>
        </form>
      );
      
      // EXPECTED TO FAIL: Phone formatting accessibility issues
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should pass comprehensive accessibility audit - Credit Card", async () => {
      const { container } = render(
        <form>
          <Input 
            format={cardFormat}
            label="Credit Card Number"
            helperText="Enter your 16-digit card number"
            required
            data-testid="audit-card"
          />
          <button type="submit">Submit</button>
        </form>
      );
      
      // EXPECTED TO FAIL: Card formatting accessibility issues
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should pass comprehensive accessibility audit - Currency", async () => {
      const { container } = render(
        <form>
          <Input 
            format={currencyFormat}
            label="Amount"
            helperText="Enter dollar amount"
            required
            data-testid="audit-currency"
          />
          <button type="submit">Submit</button>
        </form>
      );
      
      // EXPECTED TO FAIL: Currency formatting accessibility issues
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should pass comprehensive accessibility audit - Custom Pattern", async () => {
      const { container } = render(
        <form>
          <Input 
            format={customFormat}
            label="Custom Code"
            helperText="Enter 6-digit code in format 12-34-56"
            required
            data-testid="audit-custom"
          />
          <button type="submit">Submit</button>
        </form>
      );
      
      // EXPECTED TO FAIL: Custom pattern accessibility issues
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
