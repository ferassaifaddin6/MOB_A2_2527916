import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { C, S } from './theme';

export const Screen = ({ children }: { children: React.ReactNode }) => (
  <ScrollView style={{ backgroundColor: C.bg }} contentContainerStyle={{ padding: S.md, gap: S.md }}>{children}</ScrollView>
);

export const Card = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <View style={st.card}>
    {title ? <Text accessibilityRole="header" style={st.cardTitle}>{title}</Text> : null}
    {children}
  </View>
);

export const Button = ({ label, onPress, kind = 'primary', hint }: { label: string; onPress: () => void; kind?: 'primary' | 'ghost' | 'danger'; hint?: string }) => (
  <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityHint={hint} onPress={onPress}
    style={({ pressed }) => [st.btn, kind === 'ghost' && st.btnGhost, kind === 'danger' && st.btnDanger, pressed && { opacity: 0.8 }]}>
    <Text style={[st.btnText, kind !== 'primary' && { color: kind === 'danger' ? C.error : C.primary }]}>{label}</Text>
  </Pressable>
);

export const Field = ({ label, error, ...rest }: { label: string; error?: string } & TextInputProps) => (
  <View style={{ gap: 4 }}>
    <Text style={st.label}>{label}</Text>
    <TextInput accessibilityLabel={label} style={[st.input, !!error && { borderColor: C.error }]} placeholderTextColor="#64748B" {...rest} />
    {error ? <Text accessibilityLiveRegion="polite" style={st.error}>{error}</Text> : null}
  </View>
);

export const Row = ({ children }: { children: React.ReactNode }) => <View style={st.row}>{children}</View>;
export const Chip = ({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) => (
  <Pressable accessibilityRole="button" accessibilityState={{ selected: !!active }} onPress={onPress} style={[st.chip, active && st.chipOn]}>
    <Text style={[st.chipText, active && { color: '#fff' }]}>{label}</Text>
  </Pressable>
);
export const Body = ({ children, muted }: { children: React.ReactNode; muted?: boolean }) => (
  <Text style={[st.body, muted && { color: C.muted }]}>{children}</Text>
);

const st = StyleSheet.create({
  card: { backgroundColor: C.card, borderRadius: 14, borderWidth: 1, borderColor: C.border, padding: S.md, gap: S.sm },
  cardTitle: { fontSize: 18, fontWeight: '700', color: C.dark },
  btn: { backgroundColor: C.primary, borderRadius: 10, paddingVertical: 12, paddingHorizontal: S.md, alignItems: 'center', minHeight: 44, justifyContent: 'center', borderWidth: 1, borderColor: C.primary },
  btnGhost: { backgroundColor: '#fff' },
  btnDanger: { backgroundColor: '#fff', borderColor: C.error },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15, textAlign: 'center' },
  label: { fontWeight: '600', color: C.dark, fontSize: 14 },
  input: { borderWidth: 1.5, borderColor: C.border, borderRadius: 10, padding: 12, fontSize: 15, color: C.text, backgroundColor: '#fff', minHeight: 44 },
  error: { color: C.error, fontSize: 13 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: S.sm },
  chip: { borderWidth: 1, borderColor: C.primary, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 14, backgroundColor: C.soft },
  chipOn: { backgroundColor: C.primary },
  chipText: { color: C.dark, fontWeight: '600' },
  body: { fontSize: 15, lineHeight: 22, color: C.text },
});
