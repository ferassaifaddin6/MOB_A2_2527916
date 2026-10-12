import React, { useEffect, useState } from 'react';
import { Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { Body, Button, Card, Chip, Field, Row, Screen } from '../ui';
import { useProfile } from '../profile';
import { AVAILABILITY, Profile } from '../data';

type Errors = Partial<Record<'headline' | 'bio' | 'primarySkill', string>>;

export function validate(d: Profile): Errors {
  const e: Errors = {};
  const h = d.headline.trim(), b = d.bio.trim(), s = d.primarySkill.trim();
  if (!h) e.headline = 'Headline is required.';
  else if (h.length < 10 || h.length > 120) e.headline = 'Headline must be 10 to 120 characters.';
  if (b.length < 30) e.bio = 'Biography must be at least 30 characters.';
  else if (b.length > 300) e.bio = 'Biography must be 300 characters or fewer.';
  if (!s) e.primarySkill = 'Primary skill is required.';
  else if (!/^[A-Za-z0-9 &.#+\/-]{2,30}$/.test(s)) e.primarySkill = 'Use 2 to 30 letters or numbers, no emoji.';
  return e;
}

export default function Editor() {
  const { profile, save, reset } = useProfile();
  const [d, setD] = useState<Profile>(profile);
  const [errors, setErrors] = useState<Errors>({});
  const [msg, setMsg] = useState('');
  useEffect(() => { setD(profile); }, [profile]);

  const set = (k: keyof Profile) => (v: string) => { setMsg(''); setD((p) => ({ ...p, [k]: v })); };

  const onSave = async () => {
    const e = validate(d); setErrors(e);
    if (Object.keys(e).length) { setMsg('Fix the highlighted fields, then save again.'); return; }
    await save({ ...profile, ...d, headline: d.headline.trim(), bio: d.bio.trim(), primarySkill: d.primarySkill.trim() });
    setMsg('Profile saved on this device.');
  };

  const storeImage = async (uri: string) => {
    let final = uri;
    try {
      const dest = (FileSystem.documentDirectory ?? '') + `profile-${Date.now()}.jpg`;
      await FileSystem.copyAsync({ from: uri, to: dest }); final = dest;
    } catch { /* keep original uri */ }
    await save({ ...profile, imageUri: final });
  };

  const pick = async (source: 'camera' | 'gallery') => {
    try {
      const perm = source === 'camera' ? await ImagePicker.requestCameraPermissionsAsync() : await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) { Alert.alert('Permission needed', `Allow ${source} access in Settings to add a photo. You can keep using the initials avatar.`); return; }
      const opts: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.7 };
      const r = source === 'camera' ? await ImagePicker.launchCameraAsync(opts) : await ImagePicker.launchImageLibraryAsync(opts);
      if (r.canceled) { setMsg('No photo selected. Your current photo is unchanged.'); return; }
      await storeImage(r.assets[0].uri); setMsg('Photo updated.');
    } catch { Alert.alert('Something went wrong', 'The photo could not be loaded. Try again.'); }
  };

  const onReset = () => Alert.alert('Reset profile?', 'This restores the default profile and removes your photo.', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Reset', style: 'destructive', onPress: async () => { await reset(); setErrors({}); setMsg('Profile reset to defaults.'); } },
  ]);

  return (
    <Screen>
      <Card title="Profile photo">
        {profile.imageUri ? <Image source={{ uri: profile.imageUri }} accessibilityLabel="Profile photo preview" style={{ width: 140, height: 140, borderRadius: 70, alignSelf: 'center' }} /> : <Body muted>No photo yet. The initials avatar is shown.</Body>}
        <Button label={profile.imageUri ? 'Replace with camera' : 'Take photo'} onPress={() => pick('camera')} />
        <Button kind="ghost" label={profile.imageUri ? 'Replace from gallery' : 'Choose from gallery'} onPress={() => pick('gallery')} />
        {profile.imageUri ? <Button kind="danger" label="Remove photo" onPress={async () => { await save({ ...profile, imageUri: null }); setMsg('Photo removed.'); }} /> : null}
      </Card>
      <Card title="Edit profile">
        <Field label="Headline" value={d.headline} onChangeText={set('headline')} error={errors.headline} multiline />
        <Field label="Short biography" value={d.bio} onChangeText={set('bio')} error={errors.bio} multiline />
        <Field label="Primary skill" value={d.primarySkill} onChangeText={set('primarySkill')} error={errors.primarySkill} />
        <Body>Availability</Body>
        <Row>{AVAILABILITY.map((a) => <Chip key={a} label={a} active={d.availability === a} onPress={() => set('availability')(a)} />)}</Row>
        {msg ? <Body muted>{msg}</Body> : null}
        <Button label="Save changes" onPress={onSave} />
        <Button kind="danger" label="Reset profile" onPress={onReset} />
      </Card>
    </Screen>
  );
}
