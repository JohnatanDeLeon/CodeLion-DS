/**
 * Credit Card Mask Input Tests
 * 
 * Tests to reproduce and document current failures in credit card formatting #### #### #### ####
 * Includes support for different card types (Visa, MasterCard, AmEx) and Luhn validation.
 * These tests are EXPECTED TO FAIL and document the broken behaviors.
 * 
 * @priority 2 (high)
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { vi } from "vitest";
import { Input } from "./Input";

expect.extend(toHaveNoViolations);

describe("Input - Credit Card Mask #### #### #### ####", () => {
  const cardFormat = { type: "credit-card" as const };

  describe("🔴 EXPECTED FAILURES - Basic Formatting", () => {
    it("should format 16-digit card number correctly", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      // Test standard 16-digit Visa
      await user.type(input, "4532015112830366");
      
      // EXPECTED TO FAIL: Should show "4532 1511 2830 366" but likely shows raw digits
      expect(input).toHaveValue("4532 1511 2830 366");
    });

    it("should only accept numeric characters", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      // Test with mixed input
      await user.type(input, "4532abc015def112ghi830jkl366");
      
      // EXPECTED TO FAIL: Should ignore letters and show "4532 0151 1283 0366"
      expect(input).toHaveValue("4532 0151 1283 0366");
    });

    it("should enforce maximum length of 16 digits", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      // Test with excess digits
      await user.type(input, "45320151128303661234567890");
      
      // EXPECTED TO FAIL: Should cap at 16 digits
      expect(input).toHaveValue("4532 0151 1283 0366");
    });
  });

  describe("🔴 EXPECTED FAILURES - Progressive Formatting", () => {
    it("should format progressively as user types", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      const steps = [
        { input: "4", expected: "4" },
        { input: "45", expected: "45" },
        { input: "453", expected: "453" },
        { input: "4532", expected: "4532" },
        { input: "45320", expected: "4532 0" },
        { input: "453201", expected: "4532 01" },
        { input: "4532015", expected: "4532 015" },
        { input: "45320151", expected: "4532 0151" },
        { input: "453201511", expected: "4532 0151 1" },
        { input: "4532015112", expected: "4532 0151 12" },
        { input: "45320151128", expected: "4532 0151 128" },
        { input: "453201511283", expected: "4532 0151 1283" },
        { input: "4532015112830", expected: "4532 0151 1283 0" },
        { input: "45320151128303", expected: "4532 0151 1283 03" },
        { input: "453201511283036", expected: "4532 0151 1283 036" },
        { input: "4532015112830366", expected: "4532 0151 1283 0366" }
      ];

      await user.clear(input);
      let currentValue = "";
      
      for (const step of steps) {
        const nextChar = step.input[step.input.length - 1];
        await user.type(input, nextChar);
        
        // EXPECTED TO FAIL: Progressive formatting likely broken
        expect(input).toHaveValue(step.expected);
      }
    });

    it("should handle partial card numbers correctly", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      const partialCases = [
        { digits: "4", expected: "4" },
        { digits: "453", expected: "453" },
        { digits: "4532", expected: "4532" },
        { digits: "45320", expected: "4532 0" },
        { digits: "453201511", expected: "4532 0151 1" },
        { digits: "4532015112830", expected: "4532 0151 1283 0" }
      ];

      for (const testCase of partialCases) {
        await user.clear(input);
        await user.type(input, testCase.digits);
        
        // EXPECTED TO FAIL: Partial formatting likely incorrect
        expect(input).toHaveValue(testCase.expected);
      }
    });
  });

  describe("🔴 EXPECTED FAILURES - Card Type Detection", () => {
    it("should detect and format Visa cards (4xxx)", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      const visaCards = [
        "4532015112830366", // 16 digits
        "4556737586899855",
        "4716593627763480"
      ];

      for (const cardNumber of visaCards) {
        await user.clear(input);
        await user.type(input, cardNumber);
        
        // EXPECTED TO FAIL: All should format to 16 digits with spaces
        const formatted = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
        expect(input).toHaveValue(formatted);
      }
    });

    it("should detect and format MasterCard (5xxx)", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      const masterCards = [
        "5555555555554444",
        "5105105105105100",
        "2223003122003222" // New MasterCard range
      ];

      for (const cardNumber of masterCards) {
        await user.clear(input);
        await user.type(input, cardNumber);
        
        // EXPECTED TO FAIL: Should format correctly
        const formatted = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
        expect(input).toHaveValue(formatted);
      }
    });

    it("should handle American Express format (15 digits: xxxx xxxxxx xxxxx)", async () => {
      const user = userEvent.setup();
      
      // Note: This might need a separate AmEx format type
      render(<Input format={{ type: "credit-card" }} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      const amexCards = [
        "378282246310005", // 15 digits
        "371449635398431",
        "378734493671000"
      ];

      for (const cardNumber of amexCards) {
        await user.clear(input);
        await user.type(input, cardNumber);
        
        // EXPECTED TO FAIL: AmEx format likely not supported (should be xxxx xxxxxx xxxxx)
        const formatted = cardNumber.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
        expect(input).toHaveValue(formatted);
      }
    });
  });

  describe("🔴 EXPECTED FAILURES - Luhn Validation", () => {
    it("should validate card numbers using Luhn algorithm", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      // Valid Luhn numbers
      const validCards = [
        "4532015112830366", // Visa
        "5555555555554444", // MasterCard
        "378282246310005",  // AmEx
        "30569309025904",   // Diners
        "6011111111111117"  // Discover
      ];

      for (const cardNumber of validCards) {
        await user.clear(input);
        await user.type(input, cardNumber);
        
        // EXPECTED TO FAIL: Luhn validation likely not implemented
        // Should have aria-invalid="false" for valid cards
        expect(input).toHaveAttribute("aria-invalid", "false");
      }
    });

    it("should invalidate incorrect Luhn numbers", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      // Invalid Luhn numbers (last digit changed)
      const invalidCards = [
        "4532015112830365", // Should be 366
        "5555555555554443", // Should be 444
        "378282246310004"   // Should be 005
      ];

      for (const cardNumber of invalidCards) {
        await user.clear(input);
        await user.type(input, cardNumber);
        
        // EXPECTED TO FAIL: Luhn validation likely not implemented
        // Should have aria-invalid="true" for invalid cards
        expect(input).toHaveAttribute("aria-invalid", "true");
      }
    });
  });

  describe("🔴 EXPECTED FAILURES - Paste Operations", () => {
    it("should format pasted plain digits", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      await user.click(input);
      await user.paste("4532015112830366");
      
      // EXPECTED TO FAIL: Paste likely doesn't trigger formatting
      expect(input).toHaveValue("4532 0151 1283 0366");
    });

    it("should clean and format pasted text with existing formatting", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      const pasteCases = [
        { paste: "4532 0151 1283 0366", expected: "4532 0151 1283 0366" },
        { paste: "4532-0151-1283-0366", expected: "4532 0151 1283 0366" },
        { paste: "4532.0151.1283.0366", expected: "4532 0151 1283 0366" },
        { paste: "4532*0151*1283*0366", expected: "4532 0151 1283 0366" },
        { paste: "Card: 4532015112830366", expected: "4532 0151 1283 0366" }
      ];

      for (const testCase of pasteCases) {
        await user.clear(input);
        await user.click(input);
        await user.paste(testCase.paste);
        
        // EXPECTED TO FAIL: Paste cleaning likely not implemented
        expect(input).toHaveValue(testCase.expected);
      }
    });

    it("should handle pasted text exceeding 16 digits", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      await user.click(input);
      await user.paste("45320151128303661234567890"); // 26 digits
      
      // EXPECTED TO FAIL: Should truncate to first 16 digits
      expect(input).toHaveValue("4532 0151 1283 0366");
    });
  });

  describe("🔴 EXPECTED FAILURES - Deletion & Navigation", () => {
    it("should handle backspace correctly maintaining format", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      await user.type(input, "4532015112830366");
      expect(input).toHaveValue("4532 0151 1283 0366");

      // Test backspace sequence
      const backspaceSteps = [
        { after: 1, expected: "4532 0151 1283 036" },
        { after: 2, expected: "4532 0151 1283 03" },
        { after: 3, expected: "4532 0151 1283 0" },
        { after: 4, expected: "4532 0151 1283" },
        { after: 5, expected: "4532 0151 128" },
        { after: 8, expected: "4532 0151" },
        { after: 12, expected: "4532" },
        { after: 16, expected: "" }
      ];

      for (const step of backspaceSteps) {
        await user.keyboard("[Backspace]");
        
        // EXPECTED TO FAIL: Backspace navigation likely broken
        expect(input).toHaveValue(step.expected);
      }
    });

    it("should skip over spaces when using arrow keys", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      await user.type(input, "4532015112830366");
      expect(input).toHaveValue("4532 0151 1283 0366");

      // Position cursor and test navigation
      input.setSelectionRange(4, 4); // Before first space
      await user.keyboard("[ArrowRight]");
      
      // EXPECTED TO FAIL: Arrow navigation likely doesn't skip spaces
      expect(input.selectionStart).toBe(5); // Should skip space to position 5
    });

    it("should handle deletion of spaces correctly", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      await user.type(input, "453201511283");
      expect(input).toHaveValue("4532 0151 1283");

      // Position cursor on a space and try to delete
      input.setSelectionRange(4, 4); // On the space
      await user.keyboard("[Delete]");
      
      // EXPECTED TO FAIL: Should delete next digit, not just the space
      expect(input).toHaveValue("4532 151 1283");
    });
  });

  describe("🔴 EXPECTED FAILURES - Cursor Position", () => {
    it("should maintain correct cursor position during formatting", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      // Type and check cursor positions
      await user.type(input, "4532");
      expect(input.selectionStart).toBe(4);
      
      await user.type(input, "0");
      expect(input.selectionStart).toBe(6); // Should be after "4532 0"
      
      await user.type(input, "151");
      expect(input.selectionStart).toBe(9); // Should be after "4532 0151"
      
      await user.type(input, "1");
      expect(input.selectionStart).toBe(11); // Should be after "4532 0151 1"
    });

    it("should handle mid-string insertion correctly", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      await user.type(input, "4532015112830366");
      expect(input).toHaveValue("4532 0151 1283 0366");

      // Insert digit in the middle
      input.setSelectionRange(6, 6); // After "4532 0"
      await user.type(input, "9");
      
      // EXPECTED TO FAIL: Mid-string insertion likely breaks formatting
      expect(input).toHaveValue("4532 0951 1128 3036");
    });

    it("should handle selection replacement with proper formatting", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      await user.type(input, "4532015112830366");
      expect(input).toHaveValue("4532 0151 1283 0366");

      // Select middle group and replace
      input.setSelectionRange(5, 9); // Select "0151"
      await user.type(input, "9999");
      
      // EXPECTED TO FAIL: Selection replacement likely broken
      expect(input).toHaveValue("4532 9999 1283 0366");
    });
  });

  describe("🔴 EXPECTED FAILURES - Integration & Edge Cases", () => {
    it("should work with controlled components", async () => {
      const user = userEvent.setup();
      const mockChange = vi.fn();
      
      const ControlledInput = () => {
        const [value, setValue] = React.useState("");
        
        return (
          <Input
            format={cardFormat}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              mockChange(e.target.value);
            }}
            data-testid="card-input"
          />
        );
      };
      
      render(<ControlledInput />);
      const input = screen.getByTestId("card-input");
      
      await user.type(input, "4532015112830366");
      
      // EXPECTED TO FAIL: Controlled component integration likely broken
      expect(input).toHaveValue("4532 0151 1283 0366");
      expect(mockChange).toHaveBeenLastCalledWith("4532 0151 1283 0366");
    });

    it("should provide raw and formatted values separately", async () => {
      const user = userEvent.setup();
      const mockChange = vi.fn();
      
      render(
        <Input
          format={{
            type: "credit-card",
            onValueChange: mockChange
          }}
          data-testid="card-input"
        />
      );
      const input = screen.getByTestId("card-input");
      
      await user.type(input, "4532015112830366");
      
      // EXPECTED TO FAIL: Raw value callback likely not implemented
      expect(mockChange).toHaveBeenLastCalledWith("4532015112830366", "4532 0151 1283 0366");
    });

    it("should handle rapid typing without race conditions", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      const cardNumber = "4532015112830366";
      for (const digit of cardNumber) {
        await user.type(input, digit, { delay: 1 }); // Very fast
      }
      
      // EXPECTED TO FAIL: Race conditions might cause formatting issues
      expect(input).toHaveValue("4532 0151 1283 0366");
    });

    it("should handle empty input gracefully", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      await user.type(input, "4532");
      expect(input).toHaveValue("4532");
      
      await user.clear(input);
      
      // EXPECTED TO FAIL: Clearing might leave formatting artifacts
      expect(input).toHaveValue("");
      expect(input).not.toHaveAttribute("aria-invalid");
    });
  });

  describe("🔴 EXPECTED FAILURES - Accessibility", () => {
    it("should have proper ARIA attributes for credit card input", async () => {
      render(
        <Input 
          format={cardFormat} 
          label="Credit Card Number" 
          data-testid="card-input" 
        />
      );
      const input = screen.getByTestId("card-input");
      
      // EXPECTED TO FAIL: Proper ARIA attributes likely missing
      expect(input).toHaveAttribute("aria-describedby");
      expect(input).toHaveAttribute("inputmode", "numeric");
      expect(input).toHaveAttribute("autocomplete", "cc-number");
    });

    it("should indicate validation state via ARIA", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      // Type invalid card (wrong Luhn)
      await user.type(input, "4532015112830365");
      
      // EXPECTED TO FAIL: ARIA validation state likely not implemented
      expect(input).toHaveAttribute("aria-invalid", "true");
      
      // Fix to valid card
      await user.clear(input);
      await user.type(input, "4532015112830366");
      
      expect(input).toHaveAttribute("aria-invalid", "false");
    });

    it("should pass accessibility audit", async () => {
      const { container } = render(
        <Input 
          format={cardFormat} 
          label="Credit Card Number"
          helperText="Enter your 16-digit card number"
        />
      );
      
      // EXPECTED TO FAIL: Accessibility issues with card formatting
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should announce card type detection", async () => {
      // This would test screen reader announcements for card type
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      // Type Visa start
      await user.type(input, "4532");
      
      // EXPECTED TO FAIL: Card type announcements likely not implemented
      // Should announce "Visa card detected" or similar
    });
  });

  describe("🔴 EXPECTED FAILURES - Card Type Specific Formats", () => {
    it("should handle Discover cards (6xxx)", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      await user.type(input, "6011111111111117");
      
      // EXPECTED TO FAIL: Discover cards should format correctly
      expect(input).toHaveValue("6011 1111 1111 1117");
    });

    it("should handle Diners Club cards (14 digits)", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      await user.type(input, "30569309025904");
      
      // EXPECTED TO FAIL: Diners format might not be supported (xxxx xxxxxx xxxx)
      expect(input).toHaveValue("3056 930902 5904");
    });

    it("should dynamically adjust format based on card type", async () => {
      const user = userEvent.setup();
      
      render(<Input format={cardFormat} data-testid="card-input" />);
      const input = screen.getByTestId("card-input");

      // Start typing AmEx
      await user.type(input, "3782");
      expect(input).toHaveValue("3782");
      
      // Continue - should switch to AmEx format
      await user.type(input, "82246310005");
      
      // EXPECTED TO FAIL: Dynamic format switching likely not implemented
      expect(input).toHaveValue("3782 822463 10005");
    });
  });
});
