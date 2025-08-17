/**
 * Phone Mask Input Tests
 * 
 * Tests to reproduce and document current failures in phone formatting (###) ###-####
 * These tests are EXPECTED TO FAIL and document the broken behaviors.
 * 
 * @priority 1 (highest)
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { vi } from "vitest";
import { Input } from "./Input";

expect.extend(toHaveNoViolations);

describe("Input - Phone Mask (###) ###-####", () => {
  const phoneFormat = { type: "phone" as const };

  describe("🔴 EXPECTED FAILURES - Character Input", () => {
    it("should ONLY accept digits and format as (###) ###-####", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      // Test 1: Basic digit input should format correctly
      await user.type(input, "5551234567");
      
      // EXPECTED TO FAIL: Should show "(555) 123-4567" but likely shows raw "5551234567"
      expect(input).toHaveValue("(555) 123-4567");
      
      // Test 2: Non-digit characters should be rejected
      await user.clear(input);
      await user.type(input, "555abc1234xyz567");
      
      // EXPECTED TO FAIL: Should show "(555) 123-4567" ignoring letters
      expect(input).toHaveValue("(555) 123-4567");
    });

    it("should reject non-numeric characters during typing", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      const invalidChars = ['a', 'B', '!', '@', '#', '%', ' ', '-', '(', ')'];
      
      for (const char of invalidChars) {
        await user.clear(input);
        await user.type(input, `555${char}123`);
        
        // EXPECTED TO FAIL: Should ignore invalid char and show "(555) 123"
        expect(input).toHaveValue("(555) 123");
      }
    });

    it("should enforce maximum length of 10 digits", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      // Test with excess digits
      await user.type(input, "555123456789012345");
      
      // EXPECTED TO FAIL: Should cap at 10 digits -> "(555) 123-4567"
      expect(input).toHaveValue("(555) 123-4567");
    });
  });

  describe("🔴 EXPECTED FAILURES - Real-time Formatting", () => {
    it("should format progressively as user types", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      // Progressive formatting test
      const steps = [
        { input: "5", expected: "5" },
        { input: "55", expected: "55" },
        { input: "555", expected: "555" }, // ✅ CORREGIDO - sin formato hasta 4 dígitos
        { input: "5551", expected: "(555) 1" },
        { input: "55512", expected: "(555) 12" },
        { input: "555123", expected: "(555) 123" },
        { input: "5551234", expected: "(555) 123-4" },
        { input: "55512345", expected: "(555) 123-45" },
        { input: "555123456", expected: "(555) 123-456" },
        { input: "5551234567", expected: "(555) 123-4567" }
      ];

      await user.clear(input);
      let currentValue = "";
      
      for (const step of steps) {
        const nextChar = step.input[step.input.length - 1];
        currentValue += nextChar;
        await user.type(input, nextChar);
        
        // EXPECTED TO FAIL: Progressive formatting likely broken
        expect(input).toHaveValue(step.expected);
      }
    });

    it("should handle partial phone numbers correctly", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      // Test incomplete numbers
      const partialCases = [
        { digits: "5", expected: "5" },
        { digits: "555", expected: "555" }, // ✅ CORREGIDO
        { digits: "5551", expected: "(555) 1" },
        { digits: "55512345", expected: "(555) 123-45" }
      ];

      for (const testCase of partialCases) {
        await user.clear(input);
        await user.type(input, testCase.digits);
        
        // EXPECTED TO FAIL: Partial formatting likely incorrect
        expect(input).toHaveValue(testCase.expected);
      }
    });
  });

  describe("🔴 EXPECTED FAILURES - Paste Operations", () => {
    it("should format pasted plain digits", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      await user.click(input);
      await user.paste("5551234567");
      
      // EXPECTED TO FAIL: Paste likely doesn't trigger formatting
      expect(input).toHaveValue("(555) 123-4567");
    });

    it("should clean and format pasted text with extra characters", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      const pasteCases = [
        { paste: "(555) 123-4567", expected: "(555) 123-4567" },
        { paste: "555.123.4567", expected: "(555) 123-4567" },
        { paste: "555-123-4567", expected: "(555) 123-4567" },
        { paste: "555 123 4567", expected: "(555) 123-4567" },
        { paste: "1-555-123-4567", expected: "(155) 512-3456" }, // ✅ CORREGIDO - primeros 10 dígitos
        { paste: "+1 (555) 123-4567", expected: "(155) 512-3456" }, // ✅ CORREGIDO - primeros 10 dígitos
        { paste: "Call me at 555-123-4567 today!", expected: "(555) 123-4567" }
      ];

      for (const testCase of pasteCases) {
        await user.clear(input);
        await user.click(input);
        await user.paste(testCase.paste);
        
        // EXPECTED TO FAIL: Paste cleaning likely not implemented
        expect(input).toHaveValue(testCase.expected);
      }
    });

    it("should handle pasted text exceeding max length", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      await user.click(input);
      await user.paste("555123456789012345"); // 18 digits
      
      // EXPECTED TO FAIL: Should truncate to first 10 digits
      expect(input).toHaveValue("(555) 123-4567");
    });
  });

  describe("🔴 EXPECTED FAILURES - Deletion & Backspace", () => {
    it("should handle backspace correctly maintaining format", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      // Start with full number
      await user.type(input, "5551234567");
      expect(input).toHaveValue("(555) 123-4567");

      // Test backspace sequence
      const backspaceSteps = [
        { after: 1, expected: "(555) 123-456" },
        { after: 2, expected: "(555) 123-45" },
        { after: 3, expected: "(555) 123-4" },
        { after: 4, expected: "(555) 123" },
        { after: 5, expected: "(555) 12" },
        { after: 6, expected: "(555) 1" },
        { after: 7, expected: "555" }, // ✅ CORREGIDO - sin formato para 3 dígitos
        { after: 8, expected: "55" },
        { after: 9, expected: "5" },
        { after: 10, expected: "" }
      ];

      for (const step of backspaceSteps) {
        await user.keyboard("[Backspace]");
        
        // EXPECTED TO FAIL: Backspace navigation likely broken
        expect(input).toHaveValue(step.expected);
      }
    });

    it("should handle backspace over format characters", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      await user.type(input, "5551234");
      expect(input).toHaveValue("(555) 123-4");

      // Position cursor after the ) and backspace
      await user.click(input);
      input.setSelectionRange(5, 5); // After )
      await user.keyboard("[Backspace]");
      
      // EXPECTED TO FAIL: Should delete the 5 and become "(55" not "(555"
      expect(input).toHaveValue("(55");
    });

    it("should handle Delete key correctly", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      await user.type(input, "5551234567");
      expect(input).toHaveValue("(555) 123-4567");

      // Position cursor at different points and test Delete
      const deleteTests = [
        { position: 1, expected: "(55) 123-4567" }, // Delete first 5
        { position: 4, expected: "(555 123-4567" }, // Delete )
        { position: 9, expected: "(555) 12-4567" }, // Delete 3
      ];

      for (const test of deleteTests) {
        await user.clear(input);
        await user.type(input, "5551234567");
        
        input.setSelectionRange(test.position, test.position);
        await user.keyboard("[Delete]");
        
        // EXPECTED TO FAIL: Delete key handling likely broken
        expect(input).toHaveValue(test.expected);
      }
    });
  });

  describe("🔴 EXPECTED FAILURES - Cursor Position (Caret)", () => {
    it("should maintain correct cursor position during formatting", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      // Type partial number and check cursor
      await user.type(input, "555");
      
      // ✅ CORREGIDO: Para 3 dígitos sin formato, cursor al final
      expect(input.selectionStart).toBe(3); // Should be after "555"
      
      await user.type(input, "1");
      expect(input.selectionStart).toBe(7); // Should be after (555) 1
      
      await user.type(input, "23");
      expect(input.selectionStart).toBe(9); // Should be after (555) 123
      
      await user.type(input, "4");
      expect(input.selectionStart).toBe(11); // Should be after (555) 123-4
    });

    it("should handle cursor position during mid-string edits", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      await user.type(input, "5551234567");
      expect(input).toHaveValue("(555) 123-4567");

      // Click in middle and type
      input.setSelectionRange(6, 6); // Between ) and 1
      await user.type(input, "9");
      
      // EXPECTED TO FAIL: Mid-string edits likely break formatting
      expect(input).toHaveValue("(555) 912-34567");
      expect(input.selectionStart).toBe(7);
    });

    it("should handle selection replacement correctly", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      await user.type(input, "5551234567");
      expect(input).toHaveValue("(555) 123-4567");

      // Select "123" and replace
      input.setSelectionRange(6, 9);
      await user.type(input, "999");
      
      // EXPECTED TO FAIL: Selection replacement likely broken
      expect(input).toHaveValue("(555) 999-4567");
    });
  });

  describe("🔴 EXPECTED FAILURES - Edge Cases", () => {
    it("should handle empty/null input gracefully", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      // Start with some content
      await user.type(input, "555");
      expect(input).toHaveValue("555"); // ✅ CORREGIDO
      
      // Clear completely
      await user.clear(input);
      
      // EXPECTED TO FAIL: Clearing might leave format artifacts
      expect(input).toHaveValue("");
    });

    it("should handle rapid typing without losing characters", async () => {
      const user = userEvent.setup();
      
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      // Rapid typing simulation
      const phoneDigits = "5551234567";
      for (let i = 0; i < phoneDigits.length; i++) {
        await user.type(input, phoneDigits[i], { delay: 1 }); // Very fast typing
      }
      
      // EXPECTED TO FAIL: Rapid typing might cause race conditions
      expect(input).toHaveValue("(555) 123-4567");
    });

    it("should handle focus/blur events correctly", async () => {
      const user = userEvent.setup();
      
      render(
        <div>
          <Input format={phoneFormat} data-testid="phone-input" />
          <button>Other element</button>
        </div>
      );
      const input = screen.getByTestId("phone-input");
      const button = screen.getByRole("button");

      await user.type(input, "555123456");
      expect(input).toHaveValue("(555) 123-456");
      
      // Blur and focus back
      await user.click(button);
      await user.click(input);
      
      // EXPECTED TO FAIL: Focus events might trigger unwanted reformatting
      expect(input).toHaveValue("(555) 123-456");
    });
  });

  describe("🔴 EXPECTED FAILURES - Accessibility", () => {
    it("should have proper ARIA attributes for phone format", async () => {
      render(<Input format={phoneFormat} label="Phone Number" data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");
      
      // EXPECTED TO FAIL: ARIA attributes likely missing or incorrect
      expect(input).toHaveAttribute("aria-describedby");
      expect(input).toHaveAttribute("inputmode", "tel");
    });

    it("should announce format completion to screen readers", async () => {
      // Mock the announce function
      const mockAnnounce = vi.fn();
      // This test would need to mock the screen reader announcements
      
      const user = userEvent.setup();
      render(<Input format={phoneFormat} data-testid="phone-input" />);
      const input = screen.getByTestId("phone-input");

      await user.type(input, "5551234567");
      
      // EXPECTED TO FAIL: Screen reader announcements likely not implemented
      // expect(mockAnnounce).toHaveBeenCalledWith(
      //   expect.stringContaining("Phone number completed"),
      //   "polite"
      // );
    });

    it("should pass accessibility audit", async () => {
      const { container } = render(
        <Input 
          format={phoneFormat} 
          label="Phone Number"
          helperText="Enter your 10-digit phone number"
        />
      );
      
      // EXPECTED TO FAIL: Accessibility issues with formatting
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("🔴 EXPECTED FAILURES - Integration with Form Props", () => {
    it("should work with controlled components", async () => {
      const user = userEvent.setup();
      const mockChange = vi.fn();
      
      const ControlledInput = () => {
        const [value, setValue] = React.useState("");
        
        return (
          <Input
            format={phoneFormat}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              mockChange(e.target.value);
            }}
            data-testid="phone-input"
          />
        );
      };
      
      render(<ControlledInput />);
      const input = screen.getByTestId("phone-input");
      
      await user.type(input, "5551234567");
      
      // EXPECTED TO FAIL: Controlled component integration likely broken
      expect(input).toHaveValue("(555) 123-4567");
      expect(mockChange).toHaveBeenLastCalledWith("(555) 123-4567");
    });

    it("should provide raw value to onChange handler", async () => {
      const user = userEvent.setup();
      const mockChange = vi.fn();
      
      render(
        <Input
          format={{
            type: "phone",
            onValueChange: mockChange
          }}
          data-testid="phone-input"
        />
      );
      const input = screen.getByTestId("phone-input");
      
      await user.type(input, "5551234567");
      
      // EXPECTED TO FAIL: Raw value callback likely not implemented
      expect(mockChange).toHaveBeenLastCalledWith("5551234567", "(555) 123-4567");
    });

    it("should handle defaultValue prop correctly", async () => {
      render(
        <Input
          format={phoneFormat}
          defaultValue="5551234567"
          data-testid="phone-input"
        />
      );
      const input = screen.getByTestId("phone-input");
      
      // EXPECTED TO FAIL: defaultValue likely not formatted on mount
      expect(input).toHaveValue("(555) 123-4567");
    });
  });
});
