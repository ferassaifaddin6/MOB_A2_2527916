import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Body, Card, Chip, Row, Screen } from '../ui';
import { EDUCATION, SKILLS } from '../data';
import { C } from '../theme';

export default function Skills() {
  return (
    <Screen>
      <Card title="Skills"><Row>{SKILLS.map((s) => <Chip key={s} label={s} />)}</Row></Card>
      <Card title="Education">
        {EDUCATION.map((e) => (
          <View key={e.title} style={st.item}>
            <Text style={st.period}>{e.period}</Text>
            <Text style={st.title}>{e.title}</Text>
            <Body muted>{e.place}</Body>
            <Body>{e.detail}</Body>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

const st = StyleSheet.create({
  item: { borderLeftWidth: 3, borderLeftColor: C.primary, paddingLeft: 12, gap: 4 },
  period: { color: C.primary, fontWeight: '700' },
  title: { fontWeight: '700', fontSize: 16, color: C.dark },
});
