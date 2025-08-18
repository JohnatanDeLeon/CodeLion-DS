/* eslint-disable react/no-unescaped-entities, no-alert */
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta = {
  title: "Components/Forms/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The Input component is a versatile, accessible input field with multiple variants, states, and validation support.

## Features
- Multiple visual variants (default, search, email)
- Various sizes (sm, md, lg)
- Validation states with visual feedback (error, success, warning)
- Icon support with flexible positioning
- Loading states with spinner
- Full accessibility support (WCAG 2.1 AA)
- Labels, helper text, and error messages
- TypeScript support with comprehensive prop types

## Usage
Import the Input component and use it with the desired props:

\`\`\`tsx
import { Input } from '@johnatandeleon/design-system';

function MyForm() {
  return (
    <Input
      label="Email Address"
      type="email"
      placeholder="tu@empresa.com"
      required
      helperText="We'll use this to send you important updates"
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "search", "email"],
      description: "Visual style variant of the input",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the input",
    },
    state: {
      control: "select",
      options: ["default", "error", "success", "warning"],
      description: "Visual state for validation feedback",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the input should take full width",
    },
    loading: {
      control: "boolean",
      description: "Shows loading spinner and disables interaction",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input",
    },
    required: {
      control: "boolean",
      description: "Marks the field as required",
    },
    label: {
      control: "text",
      description: "Label text for the input",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the input",
    },
    errorMessage: {
      control: "text",
      description: "Error message (overrides helperText when state is error)",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "search", "tel", "url", "number"],
      description: "HTML input type",
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Position of the icon",
      if: { arg: "icon", truthy: true },
    },
    onChange: {
      action: "changed",
      description: "Change event handler",
    },
    onFocus: {
      action: "focused",
      description: "Focus event handler",
    },
    onBlur: {
      action: "blurred",
      description: "Blur event handler",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

// Variant stories
export const WithLabel: Story = {
  args: {
    label: "Full Name",
    placeholder: "Enter your full name",
    helperText: "This will be displayed on your profile",
  },
};

export const Required: Story = {
  args: {
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    required: true,
    helperText: "Required field",
  },
};

// Real examples from the image analysis
export const CorporateEmail: Story = {
  args: {
    label: "Email Corporativo",
    type: "email",
    placeholder: "tu@empresa.com",
    helperText: "Usaremos tu email para enviarte actualizaciones importantes",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Corporate email input example matching the design from the provided image.",
      },
    },
  },
};

// SOLUCIÓN DEFINITIVA: Icon spacing fixed con CSS directo
// NUEVO: Estados mejorados - Idle vs Encendido
export const ImprovedIdleState: Story = {
  args: {
    label: "IMPROVED IDLE STATE - Better Visual Hierarchy",
  },
  render: () => {
    const MailIcon = (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          minWidth: "500px",
          padding: "2rem",
          backgroundColor: "#fafafa",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          color: "#0f172a", // stronger base text color to meet contrast
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h3
            style={{
              margin: "0 0 0.5rem 0",
                color: "#064e3b",
              fontSize: "1.25rem",
            }}
          >
            🔦 IDLE STATE DRAMATICALLY IMPROVED
          </h3>
          <p style={{ margin: 0, color: "#475569", fontSize: "0.875rem" }}>
            Better visual hierarchy: "OFF" → Hover → "ON" states with clear
            transitions
          </p>
        </div>

        {/* Estado Base Mejorado */}
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
          }}
        >
          <h4
            style={{ margin: "0 0 1rem 0", fontSize: "1rem", color: "#1e293b" }}
          >
            📱 Estado Base (IDLE) - Ahora Más Perceptible
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Input
              label="Email Address"
              type="email"
              placeholder="Now more visible when idle"
              icon={MailIcon}
              iconPosition="left"
              helperText="✅ Border: neutral-300, Background: neutral-25, Icon: neutral-500"
            />
            <Input
              label="Username"
              placeholder="Better contrast in idle state"
              helperText="✅ Subtle shadows and improved typography contrast"
            />
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "#475569",
              marginTop: "1rem",
              padding: "0.75rem",
              backgroundColor: "#e2e8f0",
              borderRadius: "4px",
              fontFamily: "monospace",
            }}
          >
            <strong>CHANGES:</strong>
            <br />
            • Border: neutral[200] → neutral[300] (more visible)
            <br />
            • Background: white → neutral[25] (subtle tint)
            <br />
            • Icons: neutral[400] → neutral[500] (better contrast)
            <br />• Labels: neutral[700] → neutral[800] (stronger hierarchy)
          </div>
        </div>

        {/* Demostración de Estados Interactivos */}
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#eff6ff",
            borderRadius: "8px",
            border: "1px solid #bfdbfe",
            color: "#0f172a",
          }}
        >
          <h4
            style={{ margin: "0 0 1rem 0", fontSize: "1rem", color: "#1e40af" }}
          >
            ⚡ Interactive States - "OFF" to "ON" Effect
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Input
              label="Try hovering and focusing these inputs"
              placeholder="Hover me to see intermediate state"
              icon={MailIcon}
              iconPosition="left"
              helperText="🎯 Hover: elevation + border darkens → Focus: dramatic glow + elevation"
            />
            <Input
              label="Focus State Demo"
              placeholder="Click/tab here for 'ON' effect"
              helperText="✨ Focus creates dramatic lighting effect with glow and shadow"
            />
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "#1e40af",
              marginTop: "1rem",
              padding: "0.75rem",
              backgroundColor: "#dbeafe",
              borderRadius: "4px",
              fontFamily: "monospace",
            }}
          >
            <strong>FOCUS EFFECTS:</strong>
            <br />
            • Border: primary[600] (more intense)
            <br />
            • Glow: 30px spread + multiple shadows
            <br />
            • Transform: translateY(-2px) elevation
            <br />• Icons: scale(1.1) + glow effect
          </div>
        </div>

        {/* Estados de Validación Mejorados */}
        <div
          style={{
            padding: "1.5rem",
            backgroundColor: "#fef2f2",
            borderRadius: "8px",
            border: "1px solid #fecaca",
            color: "#0f172a",
          }}
        >
          <h4
            style={{ margin: "0 0 1rem 0", fontSize: "1rem", color: "#b91c1c" }}
          >
            🎨 Validation States - Consistent "OFF/ON" Pattern
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Input
              label="Error State"
              placeholder="Error state with improved contrast"
              state="error"
              errorMessage="Better visual hierarchy in error state"
              icon={MailIcon}
              iconPosition="left"
            />
            <Input
              label="Success State"
              placeholder="Success state maintains pattern"
              state="success"
              successMessage="Same 'OFF/ON' effect for all states"
            />
            <Input
              label="Warning State"
              placeholder="Warning follows same principles"
              state="warning"
              warningMessage="Consistent interaction patterns"
            />
          </div>
        </div>

        {/* Comparación Antes/Después */}
        <div
          style={{
            fontSize: "0.875rem",
            color: "#059669",
            textAlign: "center",
            padding: "1.5rem",
            backgroundColor: "#d1fae5",
            borderRadius: "8px",
            border: "2px solid #a7f3d0",
            fontWeight: "600",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🎉</div>
          <strong>IDLE STATE PROBLEM SOLVED</strong>
          <div
            style={{
              fontSize: "0.75rem",
              marginTop: "1rem",
              fontWeight: "normal",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              textAlign: "left",
            }}
          >
            <div>
              <strong>❌ Before:</strong>
              <br />
              • Barely visible in idle state
              <br />
              • Poor visual hierarchy
              <br />• Hard to identify as interactive
            </div>
            <div>
              <strong>✅ After:</strong>
              <br />
              • Clear "OFF" state with contrast
              <br />
              • Smooth "OFF → ON" transitions
              <br />• Obvious interactive element
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "DRAMATIC IMPROVEMENT: Demonstrates the enhanced idle state that makes inputs clearly perceivable as interactive elements, with smooth transitions from 'OFF' to 'ON' states.",
      },
    },
  },
};

export const IconSpacingFixed: Story = {
  args: {
    label: "DEFINITIVELY FIXED - Icon Spacing",
  },
  render: () => {
    const UserIcon = (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );

    const MailIcon = (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          minWidth: "450px",
          padding: "2rem",
          backgroundColor: "#fafafa",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h3
            style={{
              margin: "0 0 0.5rem 0",
              color: "#059669",
              fontSize: "1.125rem",
            }}
          >
            ✅ PROBLEM DEFINITIVELY SOLVED
          </h3>
          <p style={{ margin: 0, color: "#475569", fontSize: "0.875rem" }}>
            CSS directo implementado: .has-left-icon → padding-left: 2.75rem
            (44px)
          </p>
        </div>

        <div
          style={{
            padding: "1rem",
            backgroundColor: "#ecfdf5",
            borderRadius: "6px",
            border: "1px solid #a7f3d0",
          }}
        >
          <h4
            style={{
              margin: "0 0 1rem 0",
              fontSize: "0.875rem",
              color: "#047857",
            }}
          >
            📧 Email con Ícono Izquierdo - SIN SOLAPAMIENTO
          </h4>
          <Input
            label="Email Address"
            type="email"
            placeholder="your.very.long.email@company.domain.com"
            icon={MailIcon}
            iconPosition="left"
            helperText="✅ Ícono a 16px del borde, placeholder inicia a 44px"
          />
          <div
            style={{
              fontSize: "0.75rem",
              color: "#047857",
              marginTop: "0.5rem",
              fontFamily: "monospace",
            }}
          >
            left: 1rem (16px) + width: 1rem (16px) + gap: 12px = 44px total
          </div>
        </div>

        <div
          style={{
            padding: "1rem",
            backgroundColor: "#eff6ff",
            borderRadius: "6px",
            border: "1px solid #bfdbfe",
          }}
        >
          <h4
            style={{
              margin: "0 0 1rem 0",
              fontSize: "0.875rem",
              color: "#1d4ed8",
            }}
          >
            👤 Username con Ícono Izquierdo - ESPACIADO PERFECTO
          </h4>
          <Input
            label="Username"
            placeholder="enter.your.very.long.username.here"
            icon={UserIcon}
            iconPosition="left"
            helperText="✅ 44px de padding-left evita completamente el solapamiento"
          />
        </div>

        <div>
          <h4
            style={{
              margin: "0 0 1rem 0",
              fontSize: "0.875rem",
              color: "#7c2d12",
            }}
          >
            📏 Todos los Tamaños - Responsive Spacing
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#a16207",
                  marginBottom: "0.25rem",
                }}
              >
                Small: padding-left: 2.5rem (40px)
              </div>
              <Input
                size="sm"
                placeholder="Small input with icon - no overlap"
                icon={MailIcon}
                iconPosition="left"
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#a16207",
                  marginBottom: "0.25rem",
                }}
              >
                Medium: padding-left: 2.75rem (44px)
              </div>
              <Input
                size="md"
                placeholder="Medium input with icon - perfect spacing"
                icon={MailIcon}
                iconPosition="left"
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#a16207",
                  marginBottom: "0.25rem",
                }}
              >
                Large: padding-left: 3rem (48px)
              </div>
              <Input
                size="lg"
                placeholder="Large input with icon - excellent spacing"
                icon={MailIcon}
                iconPosition="left"
              />
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: "0.875rem",
            color: "#059669",
            textAlign: "center",
            padding: "1rem",
            backgroundColor: "#d1fae5",
            borderRadius: "6px",
            border: "2px solid #a7f3d0",
            fontWeight: "600",
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🎉</div>
          <strong>SOLAPAMIENTO COMPLETAMENTE ELIMINADO</strong>
          <div
            style={{
              fontSize: "0.75rem",
              marginTop: "0.5rem",
              fontWeight: "normal",
            }}
          >
            Implementación CSS directa siguiendo especificaciones exactas del
            usuario
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "DEFINITIVE SOLUTION: Demonstrates the completely fixed icon and placeholder spacing using direct CSS classes that eliminate overlap issues entirely.",
      },
    },
  },
};

export const SearchInput: Story = {
  args: {
    variant: "search",
    placeholder: "Buscar en la librería...",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    iconPosition: "right",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Search input with icon matching the design from the provided image.",
      },
    },
  },
};

export const ValidationError: Story = {
  args: {
    label: "Campo con Validación Mejorada",
    placeholder: "Introduce un valor válido",
    state: "error",
    errorMessage:
      "Este campo es requerido y debe contener al menos 8 caracteres con una mayúscula",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Input with validation error matching the design from the provided image.",
      },
    },
  },
};

// Size variations
export const Sizes: Story = {
  args: {
    placeholder: "Size comparison",
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        minWidth: "300px",
      }}
    >
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different input sizes available in the design system.",
      },
    },
  },
};

// State variations
export const States: Story = {
  args: {
    label: "State Examples",
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        minWidth: "400px",
      }}
    >
      <Input
        label="Default State"
        placeholder="Normal input"
        helperText="This is a helpful message"
      />
      <Input
        label="Error State"
        placeholder="Enter valid data"
        state="error"
        errorMessage="This field is required"
      />
      <Input
        label="Success State"
        placeholder="All good!"
        state="success"
        successMessage="Valid input format"
      />
      <Input
        label="Warning State"
        placeholder="Check this carefully"
        state="warning"
        warningMessage="Please double-check this value"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available input states with corresponding visual feedback.",
      },
    },
  },
};

// Icon variations
export const WithIcons: Story = {
  args: {
    label: "Icon Examples",
  },
  render: () => {
    const SearchIcon = (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    );

    const UserIcon = (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );

    const MailIcon = (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          minWidth: "400px",
        }}
      >
        <Input
          label="Search"
          placeholder="Search for items..."
          icon={SearchIcon}
          iconPosition="right"
        />
        <Input
          label="Username"
          placeholder="Enter username"
          icon={UserIcon}
          iconPosition="left"
        />
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          icon={MailIcon}
          iconPosition="left"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Examples of inputs with icons in different positions.",
      },
    },
  },
};

// Loading state
export const Loading: Story = {
  args: {
    label: "Loading State",
    placeholder: "Processing...",
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Input in loading state with spinner animation.",
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot edit this",
    disabled: true,
    helperText: "This field is currently disabled",
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled input state.",
      },
    },
  },
};

// Different input types
export const InputTypes: Story = {
  args: {
    label: "Input Types",
  },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        minWidth: "400px",
      }}
    >
      <Input label="Text" type="text" placeholder="Enter text" />
      <Input label="Email" type="email" placeholder="user@example.com" />
      <Input label="Password" type="password" placeholder="Enter password" />
      <Input label="Search" type="search" placeholder="Search..." />
      <Input label="Telephone" type="tel" placeholder="+1 (555) 123-4567" />
      <Input label="URL" type="url" placeholder="https://example.com" />
      <Input
        label="Number"
        type="number"
        placeholder="Enter number"
        min="0"
        max="100"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different HTML input types supported by the component.",
      },
    },
  },
};

// Interactive form example
export const InteractiveForm: Story = {
  args: {
    label: "Interactive Form",
  },
  render: () => {
    const [formData, setFormData] = React.useState({
      name: "",
      email: "",
      message: "",
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleChange =
      (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: "" }));
        }
      };

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      const newErrors: Record<string, string> = {};

      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert("Form submitted successfully!");
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          minWidth: "400px",
          padding: "2rem",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          backgroundColor: "#fafafa",
        }}
      >
        <h3 style={{ margin: "0 0 1rem 0", color: "#334155" }}>
          📝 Contact Form
        </h3>

        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange("name")}
          state={errors.name ? "error" : "default"}
          errorMessage={errors.name}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange("email")}
          state={
            errors.email
              ? "error"
              : formData.email && validateEmail(formData.email)
                ? "success"
                : "default"
          }
          errorMessage={errors.email}
          successMessage={
            formData.email && validateEmail(formData.email)
              ? "Valid email format"
              : undefined
          }
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
          iconPosition="left"
          required
        />

        <button
          type="submit"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#0ea5e9",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "0.875rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 200ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#0284c7";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#0ea5e9";
          }}
        >
          Submit Form
        </button>

        <div
          style={{
            fontSize: "0.75rem",
            color: "#475569",
            textAlign: "center",
            marginTop: "0.5rem",
          }}
        >
          Interact with the form to see validation in action
        </div>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example showing real-time validation and form handling.",
      },
    },
  },
};

// Complex validation example
export const AdvancedValidation: Story = {
  args: {
    label: "Advanced Validation",
  },
  render: () => {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const validatePassword = (pwd: string) => {
      const hasLength = pwd.length >= 8;
      const hasUppercase = /[A-Z]/.test(pwd);
      const hasLowercase = /[a-z]/.test(pwd);
      const hasNumber = /\d/.test(pwd);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

      return {
        isValid:
          hasLength && hasUppercase && hasLowercase && hasNumber && hasSpecial,
        requirements: [
          { met: hasLength, text: "At least 8 characters" },
          { met: hasUppercase, text: "One uppercase letter" },
          { met: hasLowercase, text: "One lowercase letter" },
          { met: hasNumber, text: "One number" },
          { met: hasSpecial, text: "One special character" },
        ],
      };
    };

    const passwordValidation = validatePassword(password);
    const passwordsMatch =
      password && confirmPassword && password === confirmPassword;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          minWidth: "450px",
          padding: "2rem",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          backgroundColor: "#fafafa",
        }}
      >
        <h3 style={{ margin: "0 0 1rem 0", color: "#334155" }}>
          🔒 Password Validation
        </h3>

        <Input
          label="Password"
          type="password"
          placeholder="Enter a strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          state={
            !password
              ? "default"
              : passwordValidation.isValid
                ? "success"
                : "error"
          }
          errorMessage={
            password && !passwordValidation.isValid
              ? "Password does not meet requirements"
              : undefined
          }
          successMessage={
            passwordValidation.isValid ? "Strong password!" : undefined
          }
        />

        {password && (
          <div
            style={{
              padding: "1rem",
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              fontSize: "0.75rem",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#374151",
              }}
            >
              Password Requirements:
            </div>
            {passwordValidation.requirements.map((req, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: req.met ? "#059669" : "#dc2626",
                  marginBottom: "0.25rem",
                }}
              >
                <span>{req.met ? "✓" : "✗"}</span>
                <span>{req.text}</span>
              </div>
            ))}
          </div>
        )}

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          state={
            !confirmPassword ? "default" : passwordsMatch ? "success" : "error"
          }
          errorMessage={
            confirmPassword && !passwordsMatch
              ? "Passwords do not match"
              : undefined
          }
          successMessage={passwordsMatch ? "Passwords match!" : undefined}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Advanced validation example with real-time password strength checking.",
      },
    },
  },
};

// End of stories
