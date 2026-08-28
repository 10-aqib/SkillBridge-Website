---
name: Forest & Lime
colors:
  surface: '#ecfeed'
  surface-dim: '#cddfcf'
  surface-bright: '#ecfeed'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e6f8e8'
  surface-container: '#e1f3e2'
  surface-container-high: '#dbeddc'
  surface-container-highest: '#d5e7d7'
  on-surface: '#101f15'
  on-surface-variant: '#414942'
  inverse-surface: '#253429'
  inverse-on-surface: '#e4f5e5'
  outline: '#717971'
  outline-variant: '#c1c9bf'
  surface-tint: '#3c6849'
  primary: '#376244'
  on-primary: '#ffffff'
  primary-container: '#4f7b5b'
  on-primary-container: '#e1ffe4'
  inverse-primary: '#a2d2ac'
  secondary: '#406749'
  on-secondary: '#ffffff'
  secondary-container: '#bfeac5'
  on-secondary-container: '#446b4d'
  tertiary: '#505c53'
  on-tertiary: '#ffffff'
  tertiary-container: '#68746b'
  on-tertiary-container: '#edfaef'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#beeec7'
  primary-fixed-dim: '#a2d2ac'
  on-primary-fixed: '#00210e'
  on-primary-fixed-variant: '#244f33'
  secondary-fixed: '#c1edc8'
  secondary-fixed-dim: '#a6d1ad'
  on-secondary-fixed: '#00210c'
  on-secondary-fixed-variant: '#284f33'
  tertiary-fixed: '#d9e6db'
  tertiary-fixed-dim: '#bdcabf'
  on-tertiary-fixed: '#131e17'
  on-tertiary-fixed-variant: '#3e4942'
  background: '#ecfeed'
  on-background: '#101f15'
  surface-variant: '#d5e7d7'
  cream-bg: '#FFFDF8'
  surface-white: '#FFFFFF'
  text-secondary: '#6B756D'
  border-subtle: '#DAE6DC'
typography:
  hero:
    fontFamily: Geist
    fontSize: 60px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  hero-mobile:
    fontFamily: Geist
    fontSize: 42px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.015em
  h1-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  h2:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-x: 32px
  margin-x-mobile: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is centered on a **Professional-Natural** aesthetic, blending **Corporate Minimalism** with an organic warmth. It aims to evoke an emotional response of grounded reliability and quiet confidence. The target audience values precision and expertise but prefers a human, approachable interface over cold, sterile technology.

The style leverages high-quality whitespace and a sophisticated "soft-tactile" approach. It avoids aggressive tech-centric visuals in favor of a palette and structure inspired by nature. The result is a UI that feels like a premium workspace: organized, calm, and inherently trustworthy.

## Colors

The color strategy uses a "Living Monochrome" approach, where all tones are derived from or complementary to natural greens.

- **Primary Forest (#4F7B5B):** Used for essential brand touchpoints, primary actions, and active states. It provides the "anchor" of professional reliability.
- **Secondary Sage (#8FB996):** Acts as a softer companion for secondary actions, progress indicators, and decorative accents.
- **Surface & Background:** The base environment is a warm Cream (#FFFDF8), which reduces eye strain compared to pure white. Functional surfaces like cards and inputs use pure White (#FFFFFF) to pop forward.
- **Text Hierarchy:** Primary Text uses a deep evergreen charcoal (#26352A) for maximum legibility without the harshness of pure black. Secondary text (#6B756D) provides a softer contrast for metadata and descriptions.

## Typography

This design system utilizes **Geist** exclusively to maintain a technical, precise edge within the organic color scheme. The contrast between the "engineered" feel of the typeface and the "natural" feel of the colors creates a unique, modern professional identity.

- **Headlines:** Large, bold, and tightly tracked. This ensures the brand feels impactful and authoritative.
- **Body:** Generous line heights (1.6) are mandatory to maintain the airy, "breathable" nature of the design style.
- **Labels:** Always in Medium (500) weight to provide a clear functional distinction from reading text.

## Layout & Spacing

The layout follows a **Fixed Grid** system that prioritizes balance and symmetry.

- **Grid Model:** A 12-column grid on desktop (max 1280px) with 24px gutters ensures content density remains professional but not crowded.
- **Rhythm:** An 8px base unit drives all spatial decisions. Internal component padding should default to 16px (2 units) or 24px (3 units) for larger containers.
- **Responsive Behavior:** On mobile (<768px), the grid becomes fluid with 16px side margins. Tablet screens use an 8-column configuration to bridge the gap between compact and expansive views.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and soft, ambient shadows that feel like natural light.

- **Base Layer:** The Cream background (#FFFDF8) acts as the foundation.
- **Surface Layer:** White containers (#FFFFFF) are used to group related information. These surfaces should use a very subtle border (#DAE6DC) to define their edges against the cream background.
- **Shadow Profile:** When depth is required (e.g., hovering a card), use a long, diffused shadow with a hint of green: `0px 10px 30px rgba(38, 53, 42, 0.05)`. Avoid harsh, high-opacity black shadows.
- **Focus States:** Use a soft glow rather than a hard outline to maintain the "professional-natural" warmth.

## Shapes

The design uses a **Rounded** (ROUND_EIGHT) logic to reinforce the friendly and approachable brand personality.

- **Standard Radius:** 0.5rem (8px) for buttons and inputs.
- **Container Radius:** 1rem (16px) for cards and sections.
- **Interactive elements:** Maintain consistency across all inputs; no sharp corners are allowed in the primary UI flow.

## Components

- **Buttons:**
  - **Primary:** Forest Green (#4F7B5B) with white text.
  - **Secondary:** Light Sage fill (#E5F2E7) with Forest Green text.
  - **Ghost:** Transparent with Forest Green text; hover state adds a Cream (#FFFDF8) background.
- **Cards:** Pure White background, 16px corner radius, 1px subtle border (#DAE6DC). Use 24px internal padding.
- **Input Fields:** White background, 1px border (#DAE6DC), 8px radius. Active focus should use the Forest Green border.
- **Chips/Badges:** Pill-shaped with the Light Accent (#E5F2E7) background and Secondary Text (#6B756D) for a muted, professional appearance.
- **Selection Controls:** Checkboxes use the 4px soft radius; Radios are always circular. Use Forest Green for the checked/selected state.
- **Lists:** Separated by horizontal rules in `#DAE6DC` with 16px vertical spacing between items.