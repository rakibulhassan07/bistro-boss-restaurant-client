# Professional Dashboard Color Scheme Guide

## Color Palette Overview

This document outlines the new professional color scheme implemented for the Bistro Boss Restaurant dashboard and components.

### Primary Colors
- **Deep Navy**: `#0f172a` (Slate 900) - Main background
- **Medium Navy**: `#1e293b` (Slate 800) - Secondary background
- **Light Navy**: `#334155` (Slate 700) - Tertiary background

### Accent Colors
- **Professional Blue**: `#2563eb` (Blue 600) - Primary accent
- **Hover Blue**: `#1d4ed8` (Blue 700) - Hover states
- **Light Blue**: `#3b82f6` (Blue 500) - Secondary accent
- **Subtle Blue**: `#dbeafe` (Blue 100) - Light backgrounds

### Text Colors
- **Primary Text**: `#ffffff` - White text on dark backgrounds
- **Secondary Text**: `#e2e8f0` (Slate 200) - Muted text
- **Muted Text**: `#94a3b8` (Slate 400) - Very muted text
- **Dark Text**: `#1e293b` - Dark text on light backgrounds

### Background Colors
- **Light Background**: `#f8fafc` (Slate 50) - Main content area
- **Card Background**: `#ffffff` - White cards
- **Hover Background**: `rgba(255, 255, 255, 0.1)` - Subtle hover

### Status Colors
- **Success**: `#059669` (Emerald 600)
- **Success Light**: `#d1fae5` (Emerald 100)
- **Warning**: `#d97706` (Amber 600)
- **Warning Light**: `#fef3c7` (Amber 100)
- **Error**: `#dc2626` (Red 600)
- **Error Light**: `#fee2e2` (Red 100)

## Gradients
- **Primary Gradient**: `linear-gradient(135deg, #0f172a 0%, #1e293b 100%)`
- **Accent Gradient**: `linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)`

## Implementation

### Dashboard Components
- **Sidebar**: Uses primary gradient with professional blue accents
- **Navigation Links**: Hover effects with blue accent and smooth transitions
- **Active States**: Blue gradient background with enhanced shadow
- **Logo**: Gradient text effect with the accent colors

### Food Cards
- **Price Tags**: Blue gradient instead of red
- **Buttons**: Professional blue gradient with hover effects
- **Text**: Updated to use slate colors for better readability
- **Shadows**: Subtle navy shadows for depth

### Consistent Features
- **Border Radius**: 20px for cards, 0.75rem for nav links
- **Shadows**: Consistent navy-based shadows throughout
- **Transitions**: Smooth cubic-bezier animations
- **Typography**: Inter font family for modern look

## Usage Guidelines

1. **Always use CSS variables** defined in Dashboard.css for consistency
2. **Maintain contrast ratios** for accessibility
3. **Use gradients sparingly** - primarily for accents and highlights
4. **Keep animations smooth** with consistent timing functions
5. **Test in both light and dark modes** if applicable

## Files Updated

1. `src/Layout/Dashboard.jsx` - Structure and class names
2. `src/Layout/Dashboard.css` - Main color scheme and styling
3. `src/components/AnimatedFoodCard/AnimatedFoodCard.css` - Card styling
4. `src/Pages/Order/OrderTab/OrderTab.css` - Swiper pagination

This color scheme provides a professional, modern look that's suitable for a business dashboard while maintaining excellent readability and user experience.
