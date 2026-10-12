import React from 'react';
import { Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Body, Button, Card, Screen } from '../ui';
import { PROJECTS } from '../data';
import { C } from '../theme';

export type ProjectsStack = { ProjectList: undefined; ProjectDetails: { id: string } };

export function ProjectList({ navigation }: NativeStackScreenProps<ProjectsStack, 'ProjectList'>) {
  return (
    <Screen>
      {PROJECTS.map((p) => (
        <Card key={p.id} title={p.title}>
          <Body muted>{p.tech}</Body>
          <Button label="View details" hint={`Opens ${p.title}`} onPress={() => navigation.navigate('ProjectDetails', { id: p.id })} />
        </Card>
      ))}
    </Screen>
  );
}

export function ProjectDetails({ route }: NativeStackScreenProps<ProjectsStack, 'ProjectDetails'>) {
  const p = PROJECTS.find((x) => x.id === route.params.id);
  if (!p) return <Screen><Body>Project not found.</Body></Screen>;
  const H = ({ t }: { t: string }) => <Text accessibilityRole="header" style={{ fontWeight: '700', color: C.primary }}>{t}</Text>;
  return (
    <Screen>
      <Card title={p.title}>
        <H t="Problem" /><Body>{p.problem}</Body>
        <H t="My contribution" /><Body>{p.contribution}</Body>
        <H t="Technologies used" /><Body>{p.tech}</Body>
        <H t="Key features" />{p.features.map((f) => <Body key={f}>• {f}</Body>)}
        <H t="Outcome" /><Body>{p.outcome}</Body>
      </Card>
    </Screen>
  );
}
