import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';
import { typography, radius, spacing } from '../theme/typography';

// Botao principal: grande, area de toque confortavel, texto direto.
export default function PrimaryButton({ title, onPress, disabled, loading, icon }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator color={colors.textInverse} />
      ) : (
        <>
          {icon}
          <Text style={styles.label}>{title}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    gap: spacing.sm,
  },
  pressed: { backgroundColor: colors.primaryDark },
  disabled: { backgroundColor: colors.disabled },
  label: { ...typography.bodyBold, color: colors.textInverse },
});
