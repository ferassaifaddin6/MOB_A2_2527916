import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Body, Card, Chip, Screen } from '../ui';
import { useProfile } from '../profile';
import { STUDENT } from '../data';
import { C } from '../theme';

export default function Home() {
  const { profile } = useProfile();
  return (
    <Screen>
      <View style={st.hero}>
        {profile.imageUri ? (
          <Image source={{ uri: profile.imageUri }} style={st.avatar} accessibilityLabel="Profile photo of Feras" />
        ) : (
          <View style={st.avatar} accessibilityLabel="Avatar with initials MF"><Text style={st.initials}>MF</Text></View>
        )}
        <Text style={st.name}>My name is {STUDENT.fullName}.</Text>
        <Text style={st.headline}>{profile.headline}</Text>
        <Chip label={profile.availability} active />
      </View>
      <Card title="About me"><Body>{profile.bio}</Body></Card>
      <Card title="Main skill"><Body>{profile.primarySkill}</Body></Card>
      <Card title="Verification code"><Body>{STUDENT.code}</Body></Card>
    </Screen>
  );
}

const st = StyleSheet.create({
  hero: { backgroundColor: C.dark, borderRadius: 16, padding: 20, alignItems: 'center', gap: 10 },
  avatar: { width: 112, height: 112, borderRadius: 56, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#fff' },
  initials: { color: '#fff', fontSize: 38, fontWeight: '800' },
  name: { color: '#fff', fontSize: 22, fontWeight: '800', textAlign: 'center' },
  headline: { color: '#D6E2FF', fontSize: 15, lineHeight: 22, textAlign: 'center' },
});
