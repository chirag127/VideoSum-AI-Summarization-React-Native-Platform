import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

// --- Placeholder Theme Definitions (Normally imported from a @shared/theme or similar) ---
// These are minimal definitions to ensure the component is self-contained and syntactically correct.
const COLORS = {
  primary: '#0A84FF',        // Blue
  secondary: '#E0E0E0',      // Light Gray
  danger: '#FF3B30',         // Red
  background: '#FFFFFF',
  text: '#1C1C1E',
  onPrimary: '#FFFFFF',
  onSecondary: '#1C1C1E',
  onError: '#FFFFFF',
  border: '#C7C7CC',
  onDisabled: '#AEAEB2',
  icon: '#1C1C1E',
};

const TYPOGRAPHY = {
  fontSize: {
    sm: 14,
    md: 16,
    lg: 18,
  },
  fontFamily: {
    regular: 'System', // Placeholder for actual font names
    medium: 'System',
    bold: 'System',
  },
  button: {
    // Default button text style
    fontFamily: 'System',
    fontWeight: '600',
    fontSize: 16,
  },
};
// -----------------------------------------------------------------------------------

interface ButtonProps {
  /** Callback fired when the button is pressed. */
  onPress: () => void;
  /** The text displayed inside the button. */
  title: string;
  /** The visual variant of the button. Defaults to 'primary'. */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  /** The size of the button. Defaults to 'medium'. */
  size?: 'small' | 'medium' | 'large';
  /** If true, a loading spinner is shown and the button is disabled. */
  isLoading?: boolean;
  /** If true, the button is disabled and non-interactive. */
  disabled?: boolean;
  /** Custom style for the button's container. */
  style?: ViewStyle;
  /** Custom style for the button's text. */
  textStyle?: TextStyle;
  /** Optional icon component to display alongside the text. */
  icon?: React.ReactNode;
  /** A unique identifier for testing purposes. */
  testID?: string;
  /** Accessibility label for screen readers. */
  accessibilityLabel?: string;
}

/**
 * A highly reusable and customizable button component for React Native applications.
 * Supports various variants, sizes, loading states, and accessibility features.
 */
const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  testID,
  accessibilityLabel,
}) => {
  const isDisabled = disabled || isLoading;

  const buttonStyles: ViewStyle[] = [
    styles.baseButton,
    styles[`${variant}Variant`],
    styles[`${size}Size`],
    isDisabled && styles.disabledButton,
    style,
  ];

  const textStyles: TextStyle[] = [
    styles.baseText,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    isDisabled && styles.disabledText,
    textStyle,
  ];

  // Determine indicator color based on the button's background for visibility
  const indicatorColor = (variant === 'primary' || variant === 'danger')
    ? COLORS.onPrimary // Light color on dark background
    : COLORS.primary; // Dark color on light background or transparent

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={buttonStyles}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      accessibilityLabel={accessibilityLabel || title}
      testID={testID}
      activeOpacity={0.7} // Standard for press feedback
    >
      {isLoading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    minHeight: 48, // Default min height for medium
    gap: 8, // Space between icon and text (React Native 0.71+)
  },
  // Variants
  primaryVariant: {
    backgroundColor: COLORS.primary,
  },
  secondaryVariant: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.primary, // Often secondary has a primary border
    borderWidth: 1,
  },
  dangerVariant: {
    backgroundColor: COLORS.danger,
  },
  ghostVariant: {
    backgroundColor: 'transparent',
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  disabledButton: {
    opacity: 0.6,
    // backgroundColor: COLORS.secondary, // Could also change background for disabled
  },

  // Sizes
  smallSize: {
    paddingVertical: 8,
    minHeight: 36,
  },
  mediumSize: {
    paddingVertical: 12,
    minHeight: 48,
  },
  largeSize: {
    paddingVertical: 16,
    minHeight: 56,
  },

  baseText: {
    ...TYPOGRAPHY.button,
    textAlign: 'center',
    // lineHeight property is usually handled by the font itself, but can be explicit if needed.
  },
  // Text Colors for Variants
  primaryText: {
    color: COLORS.onPrimary,
  },
  secondaryText: {
    color: COLORS.primary, // Text color should be primary for secondary button
  },
  dangerText: {
    color: COLORS.onError,
  },
  ghostText: {
    color: COLORS.text,
  },
  disabledText: {
    color: COLORS.onDisabled,
  },

  // Text Sizes
  smallText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
  mediumText: {
    fontSize: TYPOGRAPHY.fontSize.md,
  },
  largeText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
  },
});

export default Button;
