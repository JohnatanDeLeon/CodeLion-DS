# Card Component

A flexible card component with multiple variants and interactive states. Perfect for displaying content in an organized, visually appealing manner.

## Features

- ✅ **Multiple Variants**: Default, elevated, outlined, interactive, and gradient styles
- ✅ **Accessibility**: Full keyboard navigation and ARIA support
- ✅ **Interactive States**: Clickable, selected, and disabled states
- ✅ **Structured Layout**: Header, content, and footer sections
- ✅ **Typography Components**: Title, subtitle, description, and meta text
- ✅ **Media Support**: Icons and images in headers
- ✅ **Responsive Design**: Adapts to different screen sizes
- ✅ **Animations**: Smooth hover effects and shimmer animations

## Basic Usage

```tsx
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@johnatandeleon/design-system";

// Simple card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>This is a description of the card content.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here...</p>
  </CardContent>
</Card>
```

## Variants

### Default Card
```tsx
<Card variant="default">
  <CardContent>
    <p>Basic card with subtle shadow</p>
  </CardContent>
</Card>
```

### Elevated Card
```tsx
<Card variant="elevated">
  <CardContent>
    <p>Card with enhanced shadow that appears to float</p>
  </CardContent>
</Card>
```

### Outlined Card
```tsx
<Card variant="outlined">
  <CardContent>
    <p>Card with prominent border</p>
  </CardContent>
</Card>
```

### Interactive Card
```tsx
<Card variant="interactive" onClick={() => console.log("Card clicked!")}>
  <CardContent>
    <p>Card designed for interaction with hover effects</p>
  </CardContent>
</Card>
```

### Gradient Card
```tsx
<Card variant="gradient">
  <CardContent>
    <p>Card with subtle gradient background</p>
  </CardContent>
</Card>
```

## Sizes

```tsx
<Card size="sm">Small card</Card>
<Card size="md">Medium card (default)</Card>
<Card size="lg">Large card</Card>
```

## Interactive States

### Clickable Card
```tsx
<Card clickable onClick={handleClick}>
  <CardContent>
    <p>This card is clickable and responds to mouse and keyboard events</p>
  </CardContent>
</Card>
```

### Selected Card
```tsx
<Card selected>
  <CardContent>
    <p>This card is currently selected</p>
  </CardContent>
</Card>
```

### Disabled Card
```tsx
<Card disabled>
  <CardContent>
    <p>This card is disabled and cannot be interacted with</p>
  </CardContent>
</Card>
```

## Header with Media

### With Icon
```tsx
<Card>
  <CardHeader icon={<CheckIcon />}>
    <CardTitle>Success</CardTitle>
    <CardDescription>Your action was completed successfully</CardDescription>
  </CardHeader>
</Card>
```

### With Image
```tsx
<Card>
  <CardHeader image="/avatar.jpg" imageAlt="User avatar">
    <CardTitle>John Doe</CardTitle>
    <CardSubtitle>Software Engineer</CardSubtitle>
  </CardHeader>
</Card>
```

### With Actions
```tsx
<Card>
  <CardHeader actions={<Button variant="ghost" size="sm">Edit</Button>}>
    <CardTitle>Project Alpha</CardTitle>
    <CardDescription>Latest updates and progress</CardDescription>
  </CardHeader>
</Card>
```

## Complete Example

```tsx
<Card variant="default">
  <CardHeader 
    image="/chart.jpg"
    imageAlt="Analytics Chart"
    actions={<Button size="sm">Edit</Button>}
  >
    <CardTitle>Q4 Analytics Report</CardTitle>
    <CardSubtitle>Performance Dashboard</CardSubtitle>
    <CardDescription>
      Comprehensive analysis of key metrics and performance indicators
    </CardDescription>
  </CardHeader>
  
  <CardContent>
    <div>
      <h4>Key Highlights</h4>
      <ul>
        <li>Revenue increased by 23%</li>
        <li>User engagement up 15%</li>
        <li>New customer acquisition: 1,247</li>
      </ul>
    </div>
  </CardContent>
  
  <CardFooter divided>
    <CardMeta>
      <span>Generated: Dec 15, 2023</span>
      <span>•</span>
      <span>Next update: Jan 15, 2024</span>
    </CardMeta>
    <div>
      <Button variant="primary" size="sm">Download</Button>
      <Button variant="secondary" size="sm">Share</Button>
    </div>
  </CardFooter>
</Card>
```

## Component API

### Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "elevated" \| "outlined" \| "interactive" \| "gradient"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Padding size (ignored when using structured layout) |
| `clickable` | `boolean` | `false` | Makes the card clickable |
| `selected` | `boolean` | `false` | Shows selected state |
| `disabled` | `boolean` | `false` | Disables interaction |
| `onClick` | `(event: MouseEvent) => void` | - | Click handler |

### CardHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | - | Icon to display |
| `image` | `string` | - | Image URL to display |
| `imageAlt` | `string` | - | Alt text for image |
| `actions` | `ReactNode` | - | Actions to display on the right |

### CardFooter Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `divided` | `boolean` | `true` | Shows divider above footer |

## Accessibility

The Card component follows WCAG 2.1 AA guidelines:

- ✅ **Keyboard Navigation**: Interactive cards are focusable and respond to Enter/Space
- ✅ **Screen Reader Support**: Proper ARIA attributes and semantic HTML
- ✅ **Focus Management**: Visible focus indicators
- ✅ **Color Contrast**: Meets AA contrast requirements
- ✅ **Motion Preferences**: Respects `prefers-reduced-motion`

## Design Tokens

The Card component uses the following design tokens:

- **Colors**: `colors.neutral.*`, `colors.primary.*`, `colors.white`
- **Spacing**: `spacing.*` for padding and margins
- **Typography**: `typography.*` for text styles
- **Effects**: `effects.shadow.*` for elevation
- **Animation**: `animation.*` for transitions

## Best Practices

1. **Use structured layout** for complex cards with CardHeader, CardContent, and CardFooter
2. **Provide meaningful alt text** for images
3. **Use appropriate variants** based on the card's purpose
4. **Include keyboard navigation** for interactive cards
5. **Group related actions** in the header or footer
6. **Keep content concise** and scannable
7. **Use consistent spacing** with the provided size variants
